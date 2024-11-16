package com.core.api.client;


import com.core.api.config.ChatGptFeignConfig;
import com.core.api.data.dto.chatgpt.ChatGptDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "chatgpt", url = "https://api.openai.com/v1/chat/completions", configuration = ChatGptFeignConfig.class)
public interface ChatGptClient {

    @PostMapping
    Map<String, Object> makePullRequestTemplate(@RequestBody ChatGptDto prompt);
}
