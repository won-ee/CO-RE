package com.core.backend.service;

import com.core.backend.data.dto.Users.UserGroupsDto;
import com.core.backend.data.dto.Users.UserInfoDto;
import com.core.backend.data.entity.JiraOAuthToken;
import com.core.backend.data.entity.Users;
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
    private final JwtTokenService jwtTokenService;
    private final UserService userService;
    private final GroupService groupService;
    private final UserRepository userRepository;


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
            if (user == null) {
                List<UserGroupsDto> groupList = jiraService.getGroups(accessToken);
                log.info("Groups: {}", groupList);
                userId = userService.saveUser(userInfo);
                groupService.saveGroups(groupList);
            } else {
                userId = user.getId();
            }

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("userId", userId);
            responseMap.put("newJiraOAuthToken", newJiraOAuthToken);

            return responseMap;
        } catch (Exception e) {
            log.error("Error during login callback processing: {}", e.getMessage());
        }
        return null;
    }


}
