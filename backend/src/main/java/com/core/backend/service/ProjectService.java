package com.core.backend.service;

import com.core.backend.data.dto.projects.ProjectGitSetDto;
import com.core.backend.data.dto.projects.ProjectSetDto;
import com.core.backend.data.dto.projects.UpdateGitHubRequestDto;
import com.core.backend.data.dto.users.UserGroupsDto;
import com.core.backend.data.entity.JiraGroups;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.ProjectRepository;
import com.core.backend.data.repository.ProjectUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RestTemplate restTemplate;
    private final GroupService groupService;
    private final RoleService roleService;
    private final ProjectUserRepository projectUserRepository;
    private final IssueService issueService;

    public List<Map<String, Object>> getAllProjects(String accessToken, String cloudId) {
        try {
            List<Map<String, Object>> allProjects = new ArrayList<>();
            int startAt = 0;
            int maxResult = 50;

            boolean isLastPage = false;

            while (!isLastPage) {
                HttpHeaders headers = new HttpHeaders();
                headers.setBearerAuth(accessToken);
                headers.setAccept(List.of(MediaType.APPLICATION_JSON));
                HttpEntity<String> entity = new HttpEntity<>(headers);

                String url = String.format("https://api.atlassian.com/ex/jira/%s/rest/api/3/project/search?startAt=%d&maxResults=%d", cloudId, startAt, maxResult);

                Map<String, Object> projectResponse = null;
                ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        new ParameterizedTypeReference<Map<String, Object>>() {
                        }
                );

                projectResponse = response.getBody();

                assert projectResponse != null;

                List<Map<String, Object>> projects = (List<Map<String, Object>>) projectResponse.get("values");
                allProjects.addAll(projects);

                isLastPage = (boolean) projectResponse.get("isLast");
                startAt += maxResult;
            }
            return allProjects;
        } catch (Exception ex) {
            log.info("getAllProjects error: {}", ex.getMessage());
        }
        return null;
    }

    public Map<String, String> getProjectOwner(String accessToken, String projectUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    projectUrl,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            Map<String, Object> projectData = response.getBody();
            assert projectData != null;

            Map<String, Object> leadMap = (Map<String, Object>) projectData.get("lead");
            String accountId = leadMap != null ? (String) leadMap.get("accountId") : null;
            String accountName = leadMap != null ? (String) leadMap.get("displayName") : null;

            Map<String, String> ownerInfo = new HashMap<>();
            ownerInfo.put("accountId", accountId);
            ownerInfo.put("accountName", accountName);
            return ownerInfo;
        } catch (Exception ex) {
            log.info("getProjectOwner error: {}", ex.getMessage());
        }
        return null;
    }

    public void saveProjects(List<UserGroupsDto> groupList, Users user, String accessToken) {

        try {
            for (UserGroupsDto getGroupDto : groupList) {
                JiraGroups group = groupService.findGroup(getGroupDto.groupUrl());

                List<Map<String, Object>> projects = getAllProjects(accessToken, group.getGroupKey());
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


                    Map<String, String> projectOwner = getProjectOwner(accessToken, selfUrl);
                    String ownerAccountId = projectOwner.get("accountId");
                    String ownerName = projectOwner.get("accountName");

                    Projects newProject = Projects.builder()
                            .jiraGroup(group)
                            .jiraId(jiraId)
                            .name(name)
                            .key(key)
                            .selfUrl(selfUrl)
                            .image(image)
                            .categoryName(categoryName)
                            .categoryId(categoryId)
                            .ownerId(ownerAccountId)
                            .ownerName(ownerName)
                            .build();

                    if (!projectRepository.existsByGroupUrlAndJiraId(group.getGroupUrl(), jiraId)) {
                        projectRepository.save(newProject);
                    }

                    ProjectUsers projectUser = projectUserRepository.findByUserAndProjectJiraId(user, newProject.getJiraId());
                    if (projectUser == null) {
                        projectUser = ProjectUsers.builder()
                                .user(user)
                                .project(newProject)
                                .build();

                        projectUser = projectUserRepository.save(projectUser);
                    }

                    roleService.saveProjectRolesIfNotExists(accessToken, selfUrl, newProject, user);

                    issueService.getIssueListToJira(accessToken, selfUrl, newProject, projectUser);

                }
            }
        } catch (Exception ex) {
            log.info("saveProjects error: {}", ex.getMessage());
        }
    }

    public List<Projects> getProjectsByUserId(Long userId) {
        return projectUserRepository.findProjectsByUserId(userId);
    }

    public boolean updateGitHubToProject(Long userId, UpdateGitHubRequestDto updateGitHubRequestDto) {
        try {
            if (projectUserRepository.existsByUserIdAndProjectId(userId, updateGitHubRequestDto.projectId())) {
                // 업데이트 작업 진행할것
                Optional<Projects> getProjects = projectRepository.findById(updateGitHubRequestDto.projectId());

                if (getProjects.isPresent()) {
                    Projects project = getProjects.get().updateGitHub(updateGitHubRequestDto);
                    projectRepository.save(project);
                    return true;
                }
            }
        } catch (Exception ex) {
            log.info("updateGitHubToProject error: {}", ex.getMessage());
        }
        return false;
    }

    public ProjectSetDto findSetToProject(Long projectId) {

        Projects project = projectRepository.findById(projectId).orElse(null);

        if (project != null) {
            return ProjectSetDto.builder()
                    .targetScore(project.getTargetScore())
                    .reviewerCount(project.getReviewerCount())
                    .template(project.getReviewTemplate())
                    .build();
        }
        return null;
    }

    public ProjectSetDto updateSetToProject(Long projectId, ProjectSetDto projectSetDto) {
        Projects project = projectRepository.findById(projectId).orElse(null);

        if (project != null) {
            Projects newProject = project.updateSet(projectSetDto);
            projectRepository.save(newProject);

            return ProjectSetDto.builder()
                    .targetScore(project.getTargetScore())
                    .reviewerCount(project.getReviewerCount())
                    .template(project.getReviewTemplate())
                    .build();
        }

        return null;
    }

    public ProjectGitSetDto findGitSetToProject(String repo, String owner) {
        Projects project = getProjectGit(repo, owner);
        assert project != null;

        return ProjectGitSetDto.builder()
                .template(project.getReviewTemplate())
                .score(project.getTargetScore())
                .build();
    }

    public Projects getProjectGit(String repo, String owner) {
        return projectRepository.findByGithubOwnerAndGithubRepository(owner, repo).orElse(null);
    }

}
