package com.core.backend.service;

import com.core.backend.data.entity.OAuthAttributes;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.UserRepository;
import com.core.backend.data.userinfo.CustomOAuth2User;
import com.core.backend.util.SocialType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private static final String JIRA = "jira";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() - OAuth2 로그인 요청 진입");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        SocialType socialType = getSocialType(registrationId);
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributes extraAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);

        Users createdUser = getUsers(extraAttributes);

        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                extraAttributes.getNameAttributeKey(),
                createdUser.getEmail()
        );
    }

    private SocialType getSocialType(String registrationId) {
        return SocialType.JIRA;
    }

    private Users getUsers(OAuthAttributes attributes) {
        // 원래는 여기서 Social Type 체크할것.
        Users findUser = userRepository.findByEmail(attributes.getOauth2UserInfo().getEmail()).orElse(null);

        if (findUser == null)
            return saveUsers(attributes);

        return findUser;
    }

    private Users saveUsers(OAuthAttributes attributes) {
        Users createUser = attributes.toEntity(attributes.getOauth2UserInfo());
        return userRepository.save(createUser);
    }
}
