package com.core.backend.data.dto.isssue;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
public class IssueCreateDto {

    @JsonProperty("fields")
    private Fields fields;

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

        @JsonProperty("assignee")
        private Assignee assignee;
    }

    @Getter
    @Setter
    public static class Project {
        @JsonProperty
        private String key;
    }

    @Getter
    @Setter
    public static class IssueType {
        @JsonProperty("name")
        private String name;
    }

    @Getter
    @Setter
    public static class Priority {
        @JsonProperty("name")
        private String name;
    }

    @Getter
    @Setter
    public static class Assignee {
        @JsonProperty("accountId")
        private String accountId;  // Assignee의 accountId
    }
}
