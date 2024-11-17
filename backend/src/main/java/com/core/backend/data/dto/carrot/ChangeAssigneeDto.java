package com.core.backend.data.dto.carrot;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChangeAssigneeDto {

    @JsonProperty("accountId")
    private String accountId;
}
