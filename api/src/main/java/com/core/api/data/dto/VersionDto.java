package com.core.api.data.dto;

import com.core.api.data.entity.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VersionDto {
    private String name;
    private String content;
    private Boolean hotfix;
    private Boolean mixingKneading;
    private Boolean assembly;
    private Boolean modulePack;
    private Boolean chemicalProcessing;
    private Boolean ess;
    private Boolean ulsan;
    private Boolean hungary1;
    private Boolean hungary2;
    private Boolean xian;
    private Boolean spe;
    private Boolean cheonan;

    public static VersionDto from(Version version) {
        return VersionDto.builder()
                .hotfix(version.getHotfix())
                .name(version.getName())
                .content(version.getContent())
                .mixingKneading(version.getMixingKneading())
                .assembly(version.getAssembly())
                .chemicalProcessing(version.getChemicalProcessing())
                .modulePack(version.getModulePack())
                .ess(version.getEss())
                .ulsan(version.getUlsan())
                .hungary1(version.getHungary1())
                .hungary2(version.getHungary2())
                .xian(version.getXian())
                .spe(version.getSpe())
                .cheonan(version.getCheonan())
                .build();
    }
}
