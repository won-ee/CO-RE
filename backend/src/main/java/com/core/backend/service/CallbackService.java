package com.core.backend.service;

import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.entity.JiraOAuthToken;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CallbackService {

    private final JiraOAuthTokenService JiraOAuthTokenService;
    private final JiraService jiraService;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;

    public CallbackService(JiraOAuthTokenService JiraOAuthTokenService, JiraService jiraService, JwtTokenService jwtTokenService, UserService userService) {
        this.JiraOAuthTokenService = JiraOAuthTokenService;
        this.jiraService = jiraService;
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    //    TODO: user정보, project정보 DB에 저장
    public JiraOAuthToken loginCallBack(String authorizationCode, HttpServletRequest request, HttpServletResponse response) {
        log.info("Authorization code received: {}", authorizationCode);

        try {
            JiraOAuthToken jiraOAuthToken = jiraService.exchangeAuthorizationCode(authorizationCode, request.getSession());
            log.info("OAuthToken : {}", jiraOAuthToken);

            String accessToken = jiraOAuthToken.getAccessToken();

            UserInfoDto userInfo = jiraService.getUserInfo(accessToken, request.getSession());
            log.info("User Info: {}", userInfo);

            JiraOAuthToken newJiraOAuthToken = new JiraOAuthToken(userInfo.email(), jiraOAuthToken.getAccessToken(), jiraOAuthToken.getRefreshToken());
//            tokenService.saveOAuthToken(newOAuthToken);

//            if (userService.findUserEmail(userInfo.email())) {
//                // 프로젝트 정보를 동기적으로 가져옴
//                List<UserProjectsDto> projectList = jiraService.getProjects(accessToken, request.getSession());
//                log.info("Projects: {}", projectList);
//
//                userService.saveUserAndProjects(userInfo, projectList);
//            }

//            List<UserProjectsDto> projectList = jiraService.getProjects(accessToken, request.getSession());
//            log.info("Projects: {}", projectList);

            return newJiraOAuthToken;

//            createRedirectResponseWithJWT(userInfo.email(), response);
        } catch (Exception e) {
            log.error("Error during login callback processing: {}", e.getMessage());
        }
        return null;
    }


}
