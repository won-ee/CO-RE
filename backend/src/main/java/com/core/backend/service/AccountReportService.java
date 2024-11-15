package com.core.backend.service;

import com.core.backend.data.repository.UserRepository;
import com.core.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AccountReportService {

    private final RestTemplate restTemplate;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    //    @Scheduled(fixedRate = 86400000)
    public void reportAccountsToAtlassian() {
        // 사용자 계정 목록 가져오기
        List<String> accountIds = getUserAccountIds();

        // Atlassian으로 요청 데이터 준비
        List<Map<String, String>> accounts = accountIds.stream()
                .map(accountId -> Map.of("accountId", accountId, "accountType", "user"))
                .toList();
        Map<String, Object> requestBody = Map.of("accounts", accounts);

        // JWT 토큰 생성
        String jwtToken = jwtUtil.createJwtToken();

        // Atlassian API 요청
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "JWT " + jwtToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        String url = "https://api.atlassian.com/app/report-accounts/";

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

            // 응답 처리
            if (response.getStatusCode().is2xxSuccessful()) {
                handleAtlassianResponse((List<Map<String, String>>) response.getBody().get("accounts"));
            } else {
                throw new RuntimeException("Unexpected response: " + response.getStatusCode());
            }
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Error: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private List<String> getUserAccountIds() {
        List<String> accountIds = userRepository.findAllAccountIdsBy();

        if (accountIds.isEmpty()) {
            return List.of("5b10ac8d82e05b22cc7d4ef5", "5b10ac8d82e05b22cc7d4ef6");
        }

        return userRepository.findAllAccountIdsBy();
    }

    private void handleAtlassianResponse(List<Map<String, String>> accountsResponse) {
        for (Map<String, String> account : accountsResponse) {
            String accountId = account.get("accountId");
            String action = account.get("action");

            if ("update".equals(action)) {
                updateUserFromAtlassian(accountId); // 사용자 정보 업데이트
            } else if ("delete".equals(action)) {
                deleteUser(accountId); // 사용자 정보 삭제
            }
        }
    }

    private void updateUserFromAtlassian(String accountId) {
        String url = "https://api.atlassian.com/rest/api/3/user?accountId=" + accountId;

        String jwtToken = jwtUtil.createJwtToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "JWT " + jwtToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> userInfo = response.getBody();

            if (userInfo != null) {
                String email = (String) userInfo.get("emailAddress");
                String name = (String) userInfo.get("displayName");
                String profile = (String) ((Map<?, ?>) userInfo.get("avatarUrls")).get("48x48");

                userRepository.findByAccountId(accountId).ifPresent(user -> {
                    user.updateInfo(name, email, profile);
                    userRepository.save(user);
                });
            }
        } else {
            throw new RuntimeException("Failed to fetch user info from Atlassian API. Status: " + response.getStatusCode());
        }
    }

    private void deleteUser(String accountId) {
        // 데이터베이스에서 사용자 삭제
    }
}
