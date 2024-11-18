package com.core.api.client;

import com.core.api.data.dto.EmailDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "email", url = "http://email:8083")
public interface EmailClient {

    @PostMapping(value = "/email/release", consumes = "application/json")
    void sendEmail(@RequestHeader("Content-Type") String contentType, @RequestBody EmailDto email);

}
