package com.core.backend.data.userinfo;

import java.util.Map;

public class JiraOAuth2UserInfo extends OAuth2UserInfo {

    public JiraOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getNickName() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getprofile() {
        return (String) attributes.get("picture");
    }


}
