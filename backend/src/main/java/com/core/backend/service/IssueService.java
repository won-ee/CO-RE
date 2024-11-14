package com.core.backend.service;

import com.core.backend.data.dto.isssue.IssueListDto;
import com.core.backend.data.entity.Issues;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.enums.StatusEnum;
import com.core.backend.data.repository.IssueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class IssueService {

    private final IssueRepository issueRepository;
    private final RestTemplate restTemplate;

    public List<IssueListDto> getIssueListToProject(Long projectUserId) {
        List<Issues> getIssueList = issueRepository.findByProjectUserId(projectUserId);

        List<IssueListDto> issueList = new ArrayList<>();

        for (Issues issue : getIssueList) {

            IssueListDto newIssueDto = new IssueListDto(
                    issue.getId(),
                    issue.getTitle(),
                    issue.getContent(),
                    issue.getIssueNumber(),
                    issue.getIssuePriority(),
                    issue.getDeadLine(),
                    issue.getStatus(),
                    issue.getProjectUser().getId(),
                    issue.getProjectUser().getUser().getProfile(),
                    issue.getProjectUser().getUser().getName()
            );
            issueList.add(newIssueDto);

        }
        return issueList;
    }


    public void getIssueListToJira(String accessToken, String jiraBaseUrl, Projects project, ProjectUsers user) {

        List<Map<String, Object>> allEpicIssues = getEpicListToJira(accessToken, jiraBaseUrl, project);

        if (!allEpicIssues.isEmpty()) {

            try {

                for (Map<String, Object> epic : allEpicIssues) {
                    jiraBaseUrl = jiraBaseUrl.replaceAll("/project/\\d+", "/search");

                    HttpHeaders headers = new HttpHeaders();
                    headers.setBearerAuth(accessToken);
                    headers.setAccept(List.of(MediaType.APPLICATION_JSON));
                    headers.setContentType(MediaType.APPLICATION_JSON);

                    HttpEntity<String> entity = new HttpEntity<>(headers);

                    // JQL 쿼리 작성
                    String jqlQuery = String.format(
                            "\"Epic Link\" = %s AND issuetype in (Story, Task)",
                            epic.get("key")
                    );

                    int maxResults = 50;
                    int startAt = 0;

                    List<Map<String, Object>> allIssues = new ArrayList<>();

                    List<Map<String, Object>> issues = null;
                    while (true) {

                        URI apiUrl = UriComponentsBuilder.fromHttpUrl(jiraBaseUrl)
                                .queryParam("jql", jqlQuery)
                                .queryParam("startAt", startAt)
                                .queryParam("maxResults", maxResults)
                                .build()
                                .toUri();

                        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                                apiUrl,
                                HttpMethod.GET,
                                entity,
                                new ParameterizedTypeReference<Map<String, Object>>() {
                                }
                        );

                        Map<String, Object> responseBody = response.getBody();

                        if (responseBody != null) {
                            issues = (List<Map<String, Object>>) responseBody.get("issues");

                            log.info("issues: " + issues.toString());

                            allIssues.addAll(issues);

                            int issueCount = issues.size();
                            if (issueCount < maxResults) {
                                break;
                            }
                            startAt += maxResults;
                        } else {
                            break;
                        }
                    }

                    saveIssueListToJira(extractIssueDetails(issues), user, accessToken);
                }

            } catch (Exception ex) {
                log.info("getIssueListToJira: {}", ex.getMessage());
            }

        }

    }

    public String getSubtaskAssigneeAccountId(String selfUrl, String accessToken) {
        try {

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    selfUrl,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                Map<String, Object> fields = (Map<String, Object>) responseBody.get("fields");
                if (fields != null) {
                    Map<String, Object> assignee = (Map<String, Object>) fields.get("assignee");
                    if (assignee != null) {
                        return (String) assignee.get("accountId");
                    } else {
                        log.info("getSubtaskAssigneeAccountId Assignee 정보가 없습니다.");
                    }
                } else {
                    log.info("getSubtaskAssigneeAccountId Fields 정보가 없습니다.");
                }
            } else {
                log.info("getSubtaskAssigneeAccountId Response body가 null입니다.");
            }
        } catch (Exception ex) {
            log.info("getSubtaskAssigneeAccountId: {}", ex.getMessage());
        }
        return null;
    }

    public String getAssigneeAccountId(Map<String, Object> issueData) {
        Map<String, Object> fields = (Map<String, Object>) issueData.get("fields");
        if (fields != null) {
            // assignee 객체 가져오기
            Map<String, Object> assignee = (Map<String, Object>) fields.get("assignee");
            if (assignee != null) {
                // accountId 반환
                return (String) assignee.get("accountId");
            }
        }
        return null;
    }

    public void saveIssueListToJira(List<Map<String, Object>> extractedIssues, ProjectUsers user, String accessToken) {

        for (Map<String, Object> extractedIssue : extractedIssues) {

            if (extractedIssue.get("key").equals("S11P31S106-40")) {
                boolean isinin = true;
            }

            //subtask먼저 작업하기
            if (extractedIssue.get("subtasks") != null) {
                List<Map<String, Object>> subtasks = (List<Map<String, Object>>) extractedIssue.get("subtasks");
                if (!subtasks.isEmpty()) {
                    for (Map<String, Object> subtask : subtasks) {

                        String subtaskSelfUrl = (String) subtask.get("self");
                        if (subtaskSelfUrl != null) {
                            String assigneeAccountId = getSubtaskAssigneeAccountId(subtaskSelfUrl, accessToken);

                            if (user.getUser().getAccountId().equals(assigneeAccountId)) {
                                String keyNumber = (String) subtask.get("key");

                                if (!issueRepository.existsByIssueNumber(keyNumber)) {
                                    String statusName = (String) subtask.get("status");
                                    StatusEnum status = mapToStatusEnum(statusName);

                                    if (Objects.equals((String) subtask.get("summary"), "이슈 리스트 조회 API 개발")) {
                                        boolean isin = true;
                                    }

                                    Issues issue = Issues.builder()
                                            .title((String) subtask.get("summary"))
                                            .content((String) subtask.get("summary"))
                                            .issueNumber(keyNumber)
                                            .issuePriority(1)
                                            .status(status)
                                            .projectUser(user)
                                            .build();

                                    issueRepository.save(issue);
                                }
                            }
                        }
                    }
                }
            }


            if ((extractedIssue.get("assigneeAccountId") == null) ||
                    (!extractedIssue.get("assigneeAccountId").equals(user.getUser().getAccountId())) ||
                    (!extractedIssue.get("issuetypeName").equals("작업"))) {
                return;
            }


            String keyNumber = (String) extractedIssue.get("key");

            if (!issueRepository.existsByIssueNumber(keyNumber)) {
                String statusName = (String) extractedIssue.get("statusName");
                StatusEnum status = mapToStatusEnum(statusName);

                Issues issue = Issues.builder()
                        .title((String) extractedIssue.get("summary"))
                        .content((String) extractedIssue.get("summary"))
                        .issueNumber(keyNumber)
                        .issuePriority(1)
                        .status(status)
                        .projectUser(user)
                        .build();

                issueRepository.save(issue);
            }
        }
    }

    public StatusEnum mapToStatusEnum(String statusName) {
        if (statusName == null)
            return null;

        return switch (statusName) {
            case "해야 할 일" -> StatusEnum.TODO;
            case "진행 중" -> StatusEnum.IN_PROGRESS;
            case "완료" -> StatusEnum.DONE;
            default -> {
                log.info("mapToStatusEnum IllegalArgumentException: " + statusName);
                yield StatusEnum.TODO;
            }
        };
    }

    public List<Map<String, Object>> extractIssueDetails(List<Map<String, Object>> issues) {
        try {
            List<Map<String, Object>> extractedIssues = new ArrayList<>();

            for (Map<String, Object> issue : issues) {
                Map<String, Object> extractedIssue = new HashMap<>();

                // 이슈의 기본 정보
                extractedIssue.put("key", issue.get("key"));
                extractedIssue.put("id", issue.get("id"));
                extractedIssue.put("self", issue.get("self"));

                // fields 추출
                Map<String, Object> fields = (Map<String, Object>) issue.get("fields");

                if (fields != null) {
                    // summary
                    extractedIssue.put("summary", fields.get("summary"));

                    // subtasks
                    List<Map<String, Object>> subtasks = (List<Map<String, Object>>) fields.get("subtasks");
                    if (subtasks != null) {
                        List<Map<String, Object>> extractedSubtasks = new ArrayList<>();
                        for (Map<String, Object> subtask : subtasks) {
                            Map<String, Object> extractedSubtask = new HashMap<>();
                            extractedSubtask.put("id", subtask.get("id"));
                            extractedSubtask.put("summary", ((Map<String, Object>) subtask.get("fields")).get("summary"));
                            extractedSubtask.put("status", ((Map<String, Object>) ((Map<String, Object>) subtask.get("fields")).get("status")).get("name"));
                            extractedSubtask.put("key", subtask.get("key"));
                            extractedSubtask.put("self", subtask.get("self"));
                            extractedSubtasks.add(extractedSubtask);
                        }
                        extractedIssue.put("subtasks", extractedSubtasks);
                    }

                    // assignee -> accountId
                    Map<String, Object> assignee = (Map<String, Object>) fields.get("assignee");
                    if (assignee != null) {
                        extractedIssue.put("assigneeAccountId", assignee.get("accountId"));
                    }

                    // issuetype -> name
                    Map<String, Object> issuetype = (Map<String, Object>) fields.get("issuetype");
                    if (issuetype != null) {
                        extractedIssue.put("issuetypeName", issuetype.get("name"));
                    }

                    // status -> name
                    Map<String, Object> status = (Map<String, Object>) fields.get("status");
                    if (status != null) {
                        extractedIssue.put("statusName", status.get("name"));
                    }
                }

                extractedIssues.add(extractedIssue);
            }

            return extractedIssues;
        } catch (Exception ex) {
            log.info("extractIssueDetails: {}", ex.getMessage());
        }
        return null;
    }

    public List<Map<String, Object>> getEpicListToJira(String accessToken, String jiraBaseUrl, Projects project) {
        try {
            jiraBaseUrl = jiraBaseUrl.replaceAll("/project/\\d+", "/search");

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // JQL 쿼리 작성
            String jqlQuery = String.format(
                    "project=%s AND issuetype=Epic",
                    project.getJiraId()
            );

            int maxResults = 50;
            int startAt = 0;

            List<Map<String, Object>> allIssues = new ArrayList<>();

            while (true) {

                URI apiUrl = UriComponentsBuilder.fromHttpUrl(jiraBaseUrl)
                        .queryParam("jql", jqlQuery)
                        .queryParam("startAt", startAt)
                        .queryParam("maxResults", maxResults)
                        .build()
                        .toUri();

                ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                        apiUrl,
                        HttpMethod.GET,
                        entity,
                        new ParameterizedTypeReference<Map<String, Object>>() {
                        }
                );

                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null) {
                    List<Map<String, Object>> issues = (List<Map<String, Object>>) responseBody.get("issues");

                    allIssues.addAll(issues);

                    int issueCount = issues.size();
                    if (issueCount < maxResults) {
                        break;
                    }

                    startAt += maxResults;
                } else {
                    break;
                }
            }

            return allIssues;

        } catch (Exception ex) {
            log.info(ex.getMessage());
        }

        return null;
    }

}
