package com.core.backend.service;

import com.core.backend.data.dto.users.UserGroupsDto;
import com.core.backend.data.dto.users.UserInfoDto;
import com.core.backend.data.entity.Epics;
import com.core.backend.data.entity.JiraOAuthToken;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.EpicRepository;
import com.core.backend.data.repository.ProjectRepository;
import com.core.backend.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CallbackService {

    private final JiraOAuthTokenService jiraOAuthTokenService;
    private final JiraService jiraService;
    private final UserService userService;
    private final GroupService groupService;
    private final UserRepository userRepository;
    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private final EpicRepository epicRepository;

    public Map<String, Object> loginAccessCallBack(String authorizationCode) {
        log.info("Authorization code received: {}", authorizationCode);

        try {
            JiraOAuthToken jiraOAuthToken = jiraService.exchangeAuthorizationCode(authorizationCode);
            log.info("OAuthToken : {}", jiraOAuthToken);

            String accessToken = jiraOAuthToken.getAccessToken();

            UserInfoDto userInfo = jiraService.getUserInfo(accessToken);
            log.info("User Info: {}", userInfo);

            Users user = userRepository.findByEmail(userInfo.email()).orElse(null);
            JiraOAuthToken newJiraOAuthToken = new JiraOAuthToken(userInfo.email(), jiraOAuthToken.getAccessToken(), jiraOAuthToken.getRefreshToken());
            jiraOAuthTokenService.saveOAuthToken(newJiraOAuthToken);
            Long userId;
            String userEmail;
            if (user == null) {

                List<UserGroupsDto> groupList = jiraService.getGroups(accessToken);
                log.info("Groups: {}", groupList);
                userId = userService.saveUser(userInfo);

                Users newUser = userService.getUser(userId);
                userId = newUser.getId();
                userEmail = newUser.getEmail();
                log.info("New user created with ID: {}", userId);

                groupService.saveGroups(groupList);
                log.info("Groups saved.");

                projectService.saveProjects(groupList, newUser, accessToken);
                log.info("Projects saved for the new user.");

            } else {
                userId = user.getId();
                userEmail = user.getEmail();
                log.info("Returning existing user with ID: {}", userId);
            }

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("userId", userId);
            responseMap.put("userEmail", userEmail);

            return responseMap;
        } catch (Exception e) {
            log.error("loginAccessCallBack Error: {}", e.getMessage());
        }
        return null;
    }

    public void updateJiraMySql(Long userId) {

        Projects newProject = projectRepository.findById(userId).orElse(null);

        Epics newEpic = Epics.builder()
                .key("COREBE-3")
                .name("외부 API 개발")
                .url("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10046")
                .jiraId("10046")
                .project(newProject)
                .build();

        epicRepository.save(newEpic);


//        Users newUser = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with id: "));
//
//
//        String accessToken = jiraOAuthTokenService.getNewAccessToken(newUser.getEmail());
//        List<UserGroupsDto> groupList = jiraService.getGroups(accessToken);
//
//        groupService.saveGroups(groupList);
//        log.info("Groups saved.");
//
//        projectService.saveProjects(groupList, newUser, accessToken);
//        log.info("Projects saved for the new user.");
    }


}
