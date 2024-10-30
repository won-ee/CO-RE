package com.core.backend.data.entity;

import com.core.backend.data.userinfo.JiraOAuth2UserInfo;
import com.core.backend.data.userinfo.OAuth2UserInfo;
import com.core.backend.util.SocialType;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private String nameAttributeKey;
    private OAuth2UserInfo oauth2UserInfo;

    @Builder
    private OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    public static OAuthAttributes of(SocialType socialType,
                                     String userNameAttributeName, Map<String, Object> attributes) {
        // socialType에 맞게 돌릴것.
        return ofJira(userNameAttributeName, attributes);
    }

    public static OAuthAttributes ofJira(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new JiraOAuth2UserInfo(attributes))
                .build();
    }


}
