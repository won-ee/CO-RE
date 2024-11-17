package com.core.backend.service;

import com.core.backend.data.dto.carrot.CarrotListDto;
import com.core.backend.data.dto.carrot.ChangeAssigneeDto;
import com.core.backend.data.dto.isssue.IssueListDto;
import com.core.backend.data.entity.Carrots;
import com.core.backend.data.entity.Issues;
import com.core.backend.data.entity.JiraOAuthToken;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.repository.CarrotRepository;
import com.core.backend.data.repository.IssueRepository;
import com.core.backend.data.repository.ProjectRepository;
import com.core.backend.data.repository.ProjectUserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CarrotService {

    private final CarrotRepository carrotRepository;
    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;
    private final IssueRepository issueRepository;
    private final JiraOAuthTokenService jiraOAuthTokenService;
    private final RestTemplate restTemplate;

    public List<CarrotListDto> getCarrotList(Long projectUserId) {
        ProjectUsers projectUser = projectUserRepository.findById(projectUserId).orElse(null);
        if (projectUser == null)
            return null;

        return carrotRepository.findByProjectUserWriter_Project_Id(projectUser.getProject().getId()).stream()
                .filter(Carrots::isState)
                .map(CarrotListDto::fromEntity)
                .toList();
    }

    public List<IssueListDto> getCarrotChoiceList(Long projectUserId) {
        ProjectUsers projectUser = projectUserRepository.findById(projectUserId).orElse(null);
        if (projectUser == null)
            return null;

        return issueRepository.findByProjectUserId(projectUserId).stream()
                .filter(issue -> !carrotRepository.existsByIssue_IdAndStateTrue(issue.getId()))
                .map(IssueListDto::fromEntity)
                .toList();
    }

    public CarrotListDto createCarrot(Long projectUserId, Long issueId) {
        ProjectUsers projectUser = projectUserRepository.findById(projectUserId).orElse(null);
        Issues issue = issueRepository.findById(issueId).orElse(null);
        if (projectUser == null || issue == null)
            return null;

        Carrots newCarrot = null;
        try {
            newCarrot = carrotRepository.save(
                    Carrots.builder()
                            .issue(issue)
                            .projectUserWriter(projectUser)
                            .state(true)
                            .build());
            log.info("Carrot created with ID: {}", newCarrot.getId());
        } catch (Exception e) {
            log.error("Error creating carrot", e);
            return null;
        }

        return CarrotListDto.fromEntity(newCarrot);
    }

    public CarrotListDto acceptCarrotChangeAssignee(Long projectUserId, Long carrotId) throws JsonProcessingException {
        ProjectUsers projectUser = projectUserRepository.findById(projectUserId).orElse(null);
        Carrots carrot = carrotRepository.findById(carrotId).orElse(null);
        if (carrot == null || projectUser == null)
            return null;
        Issues issue = issueRepository.findById(carrot.getIssue().getId()).orElse(null);
        if (issue == null)
            return null;

        //이제 jira에서도 assignee 변경해줘야함
        JiraOAuthToken oAuthToken = jiraOAuthTokenService.getOAuthToken(projectUser.getUser().getEmail());
        String accessToken = oAuthToken.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper.writeValueAsString(
                ChangeAssigneeDto.builder()
                        .accountId(projectUser.getUser().getAccountId())
                        .build());

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                issue.getJiraUrl() + "/assignee",
                HttpMethod.PUT,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {
                }
        );

        try {
            if (!response.getStatusCode().is2xxSuccessful())
                return null;

        } catch (HttpClientErrorException.Unauthorized e) {
            accessToken = jiraOAuthTokenService.getNewAccessToken(projectUser.getUser().getEmail());
            headers.setBearerAuth(accessToken);

            entity = new HttpEntity<>(requestBody, headers);

            response = restTemplate.exchange(
                    issue.getJiraUrl() + "/assignee",
                    HttpMethod.PUT,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            if (!response.getStatusCode().is2xxSuccessful())
                return null;

        } catch (Exception ex) {
            log.error("Error occurred: {}", ex.getMessage());
        }

        Issues updateiIssue = issueRepository.save(Issues.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .content(issue.getContent())
                .issueNumber(issue.getIssueNumber())
                .issuePriority(issue.getIssuePriority())
                .deadLine(issue.getDeadLine())
                .status(issue.getStatus())
                .jiraId(issue.getJiraId())
                .jiraUrl(issue.getJiraUrl())
                .projectUser(projectUser)
                .epic(issue.getEpic())
                .build());


        Carrots newCarrot = carrotRepository.save(
                Carrots.builder()
                        .id(carrot.getId())
                        .state(false)
                        .issue(updateiIssue)
                        .projectUserWriter(carrot.getProjectUserWriter())
                        .projectUserApprover(projectUser)
                        .build());


        return CarrotListDto.fromEntity(newCarrot);
    }

}
