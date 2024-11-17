package com.core.backend.data.dto.isssue;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class IssueCreateEpicNoAssigneeDto {
    @JsonProperty("fields")
    public Fields fields;

    @Builder
    @Getter
    @Setter
    public static class Fields {
        @JsonProperty("project")
        public Project project;

        @JsonProperty("summary")
        public String summary;

        @JsonProperty("issuetype")
        public IssueType issuetype;

        @JsonProperty("parent")
        public Parent parent;

        @JsonProperty("priority")
        public Priority priority;
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
    public static class Parent {
        @JsonProperty("key")
        private String key;
    }

    @Builder
    @Getter
    @Setter
    public static class Priority {
        @JsonProperty("name")
        private String name;
    }
}
