package com.core.api.data.entity;

import com.core.api.data.dto.VersionDto;
import com.core.api.data.dto.github.PullRequestServerDto;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "version")
@Getter
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "version_name")
    private String name;

    @Column(name = "version_owner", nullable = false)
    private String owner;

    @Column(name = "version_repo", nullable = false)
    private String repo;

    @Column(name = "version_content")
    private String content;

    @Column(name = "version_commit_count")
    private Integer commitCount;

    @Column(name = "version_review_count")
    private Integer reviewCount;

    @Column(name = "version_pull_request_count")
    private Integer pullRequestCount;

    @Column(name = "version_hotfix_count")
    private Integer hotfixCount;

    @Column(name = "version_mixing_kneading")
    @ColumnDefault("false")
    private Boolean mixingKneading = false;

    @Column(name = "version_assembly")
    @ColumnDefault("false")
    private Boolean assembly = false;

    @Column(name = "version_chemical_processing")
    @ColumnDefault("false")
    private Boolean chemicalProcessing = false;

    @Column(name = "version_module_pack")
    @ColumnDefault("false")
    private Boolean modulePack = false;

    @Column(name = "version_ess")
    @ColumnDefault("false")
    private Boolean ess = false;

    @Column(name = "version_ulsan")
    @ColumnDefault("false")
    private Boolean ulsan = false;

    @Column(name = "version_hungary_1")
    @ColumnDefault("false")
    private Boolean hungary1 = false;

    @Column(name = "version_hungary_2")
    @ColumnDefault("false")
    private Boolean hungary2 = false;

    @Column(name = "version_xian")
    @ColumnDefault("false")
    private Boolean xian = false;

    @Column(name = "version_spe")
    @ColumnDefault("false")
    private Boolean spe = false;

    @Column(name = "version_cheonan")
    @ColumnDefault("false")
    private Boolean cheonan = false;

    @OneToMany(mappedBy = "version")
    private List<PullRequest> pullRequests = new ArrayList<>();

    public static Version createVersion(PullRequestServerDto pullRequest) {
        Version version = new Version();
        version.owner = pullRequest.getOwner();
        version.repo = pullRequest.getRepo();
        version.content = pullRequest.getDescription();
        return version;
    }

    public void updateVersion(VersionDto versionDto) {
        this.name = versionDto.getName();
        this.content = versionDto.getContent();
        this.mixingKneading = versionDto.getMixingKneading();
        this.assembly = versionDto.getAssembly();
        this.chemicalProcessing = versionDto.getChemicalProcessing();
        this.modulePack = versionDto.getModulePack();
        this.ess = versionDto.getEss();
        this.ulsan = versionDto.getUlsan();
        this.hungary1 = versionDto.getHungary1();
        this.hungary2 = versionDto.getHungary2();
        this.xian = versionDto.getXian();
        this.spe = versionDto.getSpe();
        this.cheonan = versionDto.getCheonan();
    }
}
