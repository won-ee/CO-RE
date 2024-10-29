package com.core.api.data.entity;


import jakarta.persistence.*;

@Entity
public class Comment extends Base {

    @Id
    @Column(name = "comment_id", nullable = false)
    private Long id;

    @Column(name = "comment_github_id", nullable = false)
    private Long commentId;

    @Column(name = "comment_start_line")
    private Integer startLine;

    @Column(name = "comment_end_line")
    private Integer endLine;

    @Column(name = "comment_content", length = 2000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "commit_id")
    private Commit commit;

}
