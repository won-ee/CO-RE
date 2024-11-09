package com.core.backend.service;

import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Roles;
import com.core.backend.data.entity.UserRoles;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.RoleRepository;
import com.core.backend.data.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RoleService {

    private final RoleRepository roleRepository;
    private final RestTemplate restTemplate;
    private final UserRoleRepository userRoleRepository;

    public void saveProjectRolesIfNotExists(String accessToken, String jiraBaseUrl, Projects project, Users user) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    jiraBaseUrl,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            Map<String, Object> roles = response.getBody();
            assert roles != null;

            // 각 역할을 반복하면서 DB에 저장되지 않은 경우 저장
            for (Map.Entry<String, Object> entry : roles.entrySet()) {
                String roleName = entry.getKey();
                String roleDetailUrl = (String) entry.getValue();
                Map<String, Object> roleDetails = findRoleDetail(accessToken, roleDetailUrl);

                String roleJiraId = String.valueOf(roleDetails.get("id"));
                // DB에 해당 역할이 존재하는지 확인
                Roles role = roleRepository.findByNameAndJiraIdAndProject(roleName, roleJiraId, project)
                        .orElseGet(() -> {
                            Roles newRole = Roles.builder()
                                    .name(roleName)
                                    .jiraId(roleJiraId)
                                    .project(project)
                                    .build();
                            return roleRepository.save(newRole);
                        });

                // Userrole 처리
                List<Map<String, Object>> actors = (List<Map<String, Object>>) roleDetails.get("actors");
                for (Map<String, Object> actor : actors) {

                    // actorUser가 존재하는 경우에만 accountId를 비교
                    if (actor.containsKey("actorUser")) {
                        Map<String, Object> actorUser = (Map<String, Object>) actor.get("actorUser");
                        String actorAccountId = (String) actorUser.get("accountId");

                        // actor의 accountId가 로그인한 사용자와 일치하는지 확인
                        if (user.getAccountId().equals(actorAccountId)) {
                            boolean exists = userRoleRepository.existsByRoleAndUser(role, user);

                            if (!exists) {
                                UserRoles userRole = UserRoles.builder()
                                        .role(role)
                                        .user(user)
                                        .build();

                                userRoleRepository.save(userRole);
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            log.info("saveProjectRolesIfNotExists Error : {}", ex.getMessage());
        }
    }

    public Map<String, Object> findRoleDetail(String accessToken, String roleDetailUrl) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>(headers);

            String url = String.format("%s", roleDetailUrl);

            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    }
            );

            return response.getBody();
        } catch (Exception ex) {
            log.info("findRoleDetail Error : {}", ex.getMessage());
        }
        return null;
    }

}
