package com.core.backend.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Groups")
@AllArgsConstructor
@Builder
public class Groups {

    @Id
    @Column(name = "group_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_key", nullable = false)
    private String groupKey;

    @Column(name = "group_name", nullable = false)
    private String groupName;

    @Column(name = "group_image", nullable = false)
    private String groupImage;

    @Column(name = "group_url", nullable = false)
    private String groupUrl;

    @OneToMany(mappedBy = "group")
    private List<Projects> groupProjectsList = new ArrayList<>();

}
