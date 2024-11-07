package com.core.backend.service;

import com.core.backend.data.entity.Groups;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final JiraOAuthTokenService jiraOAuthTokenService;
    private final RestTemplate restTemplate;

    public List<Map<String, Object>> getAllProjects(String accessToken, String groupDomain) {
        List<Map<String, Object>> allProjects = new ArrayList<>();
        int startAt = 0;
        int maxResult = 50;

        boolean isLastPage = false;

        while (!isLastPage) {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>(headers);

            String url = String.format("%s/rest/api/2/project/search?startAt=%d&maxResults=%d", groupDomain, startAt, maxResult);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            Map<String, Object> projectResponse = response.getBody();
            assert projectResponse != null;

            List<Map<String, Object>> projects = (List<Map<String, Object>>) projectResponse.get("values");
            allProjects.addAll(projects);

            isLastPage = (boolean) projectResponse.get("isLast");
            startAt += maxResult;
        }
        return allProjects;
    }

    public void saveProjects(List<Groups> groupList, String email) {
        String accessToken = jiraOAuthTokenService.getNewAccessToken(email);

        for (Groups getGroup : groupList) {
            String groupDomain = getGroup.getGroupUrl();

            List<Map<String, Object>> projects = getAllProjects(accessToken, groupDomain);
            for (Map<String, Object> projectData : projects) {
                String jiraId = (String) projectData.get("id");
                String name = (String) projectData.get("name");
                String key = (String) projectData.get("key");
                String selfUrl = (String) projectData.get("self");

                Map<String, Object> avatarUrlsMap = (Map<String, Object>) projectData.get("avatarUrls");
                String image = avatarUrlsMap != null ? (String) avatarUrlsMap.get("48x48") : null;

                Map<String, Object> projectCategoryMap = (Map<String, Object>) projectData.get("projectCategory");
                String categoryName = projectCategoryMap != null ? (String) projectCategoryMap.get("name") : null;
                String categoryId = projectCategoryMap != null ? (String) projectCategoryMap.get("id") : null;

                if (!projectRepository.existsByGroupAndJiraId(getGroup, jiraId)) {
                    Projects newProject = Projects.builder()
                            .group(getGroup)
                            .jiraId(jiraId)
                            .name(name)
                            .key(key)
                            .selfUrl(selfUrl)
                            .image(image)
                            .categoryName(categoryName)
                            .categoryId(categoryId)
                            .build();
                    projectRepository.save(newProject);
                }
            }
        }
    }


}
