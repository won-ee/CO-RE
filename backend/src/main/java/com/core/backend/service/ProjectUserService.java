package com.core.backend.service;

import com.core.backend.data.dto.projectUsers.ProjectUserInfoDto;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.repository.ProjectUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProjectUserService {

    private final ProjectUserRepository projectUserRepository;

    public List<ProjectUserInfoDto> findProjectUserList(Long projectId) {
        List<ProjectUserInfoDto> projectUserInfoDtoList = new ArrayList<>();

        List<ProjectUsers> projectUsersList = projectUserRepository.findAllByProjectId(projectId);

        for (ProjectUsers projectUsers : projectUsersList) {
            ProjectUserInfoDto infoDto = new ProjectUserInfoDto(
                    projectUsers.getUser().getId(),
                    projectUsers.getId(),
                    projectUsers.getProject().getId(),
                    projectUsers.getUser().getProfile(),
                    projectUsers.getUser().getName()
            );
            projectUserInfoDtoList.add(infoDto);
        }
        return projectUserInfoDtoList;
    }
}
