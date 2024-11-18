package com.core.backend.service;

import com.core.backend.data.dto.users.UserGroupsDto;
import com.core.backend.data.dto.users.UserInfoDto;
import com.core.backend.data.entity.*;
import com.core.backend.data.enums.StatusEnum;
import com.core.backend.data.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    private final ProjectUserRepository projectUserRepository;
    private final IssueRepository issueRepository;

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

        Long userid = 26L;
        Long epicl = 109L;
        ProjectUsers projectUsers = projectUserRepository.findById(userid).orElse(null);
        Epics epic = epicRepository.findById(epicl).orElse(null);

        List<Issues> issuesList = List.of(
                Issues.builder()
                        .title("DTO 및 엔티티 설계")
                        .content("DTO 및 엔티티 설계")
                        .issueNumber("COREBE-29")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10101")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10101")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("외부 API 서버 환경설정")
                        .content("외부 API 서버 환경설정")
                        .issueNumber("COREBE-27")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10097")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10097")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("테스트 코드 작성")
                        .content("테스트 코드 작성")
                        .issueNumber("COREBE-22")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10091")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10091")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("이벤트 처리 로직 작성")
                        .content("이벤트 처리 로직 작성")
                        .issueNumber("COREBE-21")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10090")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10090")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("Webhook 엔드포인트 구현")
                        .content("Webhook 엔드포인트 구현")
                        .issueNumber("COREBE-19")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10088")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10088")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("외부 API 예외처리 및 로깅")
                        .content("외부 API 예외처리 및 로깅")
                        .issueNumber("COREBE-11")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10061")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10061")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("Github 동기화 기능 추가")
                        .content("Github 동기화 기능 추가")
                        .issueNumber("COREBE-8")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10051")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10051")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build(),
                Issues.builder()
                        .title("Github 이벤트 훅 연결")
                        .content("Github 이벤트 훅 연결")
                        .issueNumber("COREBE-7")
                        .issuePriority(3)
                        .deadLine(LocalDateTime.parse("2024-11-22T00:00:00"))
                        .status(StatusEnum.TODO)
                        .jiraId("10050")
                        .jiraUrl("https://api.atlassian.com/ex/jira/89310ad6-58d0-4c8d-939c-0b53d61c0223/rest/api/3/issue/10050")
                        .projectUser(projectUsers)
                        .epic(epic)
                        .build()
        );

        issuesList.forEach(issueRepository::save);


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
