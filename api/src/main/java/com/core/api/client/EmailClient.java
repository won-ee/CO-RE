package com.core.api.client;

import com.core.api.data.dto.EmailDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "email", url = "http://email:8083")
public interface EmailClient {

    @PostMapping("/email/release")
    void sendEmail(@RequestBody EmailDto email);

}
