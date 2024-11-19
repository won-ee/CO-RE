package com.core.backend.service;

import com.core.backend.data.dto.epics.EpicListDto;
import com.core.backend.data.dto.projects.ProjectGitSetDto;
import com.core.backend.data.dto.projects.ProjectSetDto;
import com.core.backend.data.dto.projects.UpdateGitHubRequestDto;
import com.core.backend.data.dto.users.UserGroupsDto;
import com.core.backend.data.entity.JiraGroups;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private final EpicRepository epicRepository;
    private final IssueRepository issueRepository;
    private final APIService apiService;
    private final UserRepository userRepository;

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
                            .ownerId(ownerAccountId)
                            .ownerName(ownerName)
                            .build();

                    Projects getProject = projectRepository.findByGroupKeyAndJiraId(group.getGroupKey(), jiraId);
                    if (getProject == null) {
                        newProject = projectRepository.save(newProject);
                    } else {
                        newProject = getProject;
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

    public boolean updateGitHubToProject(Long userId, Long projectId, UpdateGitHubRequestDto updateGitHubRequestDto) {
        try {
            log.info("1");
            Users user = userRepository.findById(userId).orElse(null);
            log.info("2");
            Projects project = projectRepository.findById(projectId).orElse(null);
            log.info("3");

            if (project == null || user == null) {
                log.info("4");
                return false;
            }
            log.info("5");

            log.info("6");

            if (!updateGitHubRequestDto.githubOwner().isEmpty() && !updateGitHubRequestDto.githubRepository().isEmpty()) {
                log.info("6.5");
                if (projectRepository.existsByGithubOwnerAndGithubRepository(updateGitHubRequestDto.githubOwner(), updateGitHubRequestDto.githubRepository())) {
                    log.info("7");
                    return false;
                }
            }

            log.info("8");
            project = project.updateGitHub(updateGitHubRequestDto);
            project = projectRepository.save(project);
            if (project.getGithubOwner() != null && !project.getGithubOwner().isEmpty()
                    && project.getGithubRepository() != null && !project.getGithubRepository().isEmpty()
                    && user.getGitToken() != null && !user.getGitToken().isEmpty()) {
                log.info("git hook event 전송 시작");
                apiService.addGitHubHookEvents(project.getGithubOwner(), project.getGithubRepository(), user.getGitToken());
            }
            return true;

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

        // 여기서 dlqfur

        return null;
    }

    public ProjectGitSetDto findGitSetToProject(String repo, String owner) {
        log.info("init 2");
        List<Projects> projectsList = projectRepository.findByGithubOwnerAndGithubRepository(owner, repo);
        if (projectsList.size() > 1) {
            return null;
        }
        Projects project = projectsList.get(0);

        log.info("findGitSetToProject init get project : {}", project.toString());

        return ProjectGitSetDto.builder()
                .template(project.getReviewTemplate())
                .score(project.getTargetScore())
                .build();
    }

    public Projects getProjectGit(String repo, String owner) {
        List<Projects> projectsList = projectRepository.findByGithubOwnerAndGithubRepository(owner, repo);
        if (projectsList.size() > 1) {
            return null;
        }
        return projectsList.get(0);
    }

    public List<EpicListDto> getAllEpicToProject(Long projectId) {
        return epicRepository.findByProjectId(projectId).stream()
                .map(epic -> EpicListDto.builder()
                        .id(epic.getId())
                        .key(epic.getKey())
                        .name(epic.getName())
                        .build())
                .collect(Collectors.toList());
    }

}
