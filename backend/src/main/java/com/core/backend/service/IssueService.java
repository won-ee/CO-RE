package com.core.backend.service;

import com.core.backend.data.dto.isssue.IssueListDto;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class IssueService {

    private final IssueRepository issueRepository;
    private final RestTemplate restTemplate;

    public List<IssueListDto> getIssueListToProject(Long projectUserId) {

        List<IssueListDto> issueList = new ArrayList<>();


        return issueList;
    }


    public void saveIssueListToJira(String accessToken, String jiraBaseUrl, Projects project, Users user) {

        List<Map<String, Object>> allEpicIssues = getEpicListToJira(accessToken, jiraBaseUrl, project, user);

        if (!allEpicIssues.isEmpty()) {

            try{

                for (Map<String, Object> epic : allEpicIssues) {

                    // 뽑아낸 이슈에서 task, story, subtask뽑아내기
                    //들어온 이슈에 링크써서 jql문으로 "Epic Link" = S11P11C203-6 AND issuetype in (Story, Task) 해당형식으로 구성할것

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

                        log.info("apiUrl: " + apiUrl.toString());

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

                    //여기서 생성된 이슈의 값들 정리해서 issue 생성하기
                    extractIssueDetails(issues)

                }

            } catch (Exception ex){
                log.info(ex.getMessage());
            }

        }

    }

    public List<Map<String, Object>> extractIssueDetails(List<Map<String, Object>> issues) {
        try{
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
        }catch (Exception ex){
            log.info("extractIssueDetails: {}",ex.getMessage());
        }
    }

    public List<Map<String, Object>> getEpicListToJira(String accessToken, String jiraBaseUrl, Projects project, Users user){
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

                log.info("apiUrl: " + apiUrl.toString());

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
