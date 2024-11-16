package com.core.backend.data.dto.isssue;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class IssueCreateDtoNoAssignee {
    @JsonProperty("fields")
    private Fields fields;

    @Builder
    @Getter
    @Setter
    public static class Fields {
        @JsonProperty("project")
        private Project project;

        @JsonProperty("summary")
        private String summary;

        @JsonProperty("issuetype")
        private IssueType issuetype;

        @JsonProperty("priority")
        private Priority priority;
    }

    @Builder
    @Getter
    @Setter
    public static class Project {
        @JsonProperty
        private String key;
    }

    @Builder
    @Getter
    @Setter
    public static class IssueType {
        @JsonProperty("name")
        private String name;
    }

    @Builder
    @Getter
    @Setter
    public static class Priority {
        @JsonProperty("name")
        private String name;
    }
}
