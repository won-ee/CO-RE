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
//            jqlQuery = jqlQuery.replaceAll(" ", "%20");

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
        } catch (Exception ex) {
            log.info(ex.getMessage());
        }
    }

}
