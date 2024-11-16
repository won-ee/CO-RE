package com.core.backend.service;

import com.core.backend.data.dto.projectUsers.ProjectNameAndUserEmailDto;
import com.core.backend.data.dto.projectUsers.ProjectUserInfoDto;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.entity.Projects;
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

    private final ProjectService projectService;
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
                    projectUsers.getUser().getName(),
                    projectUsers.getUser().getNickname(),
                    projectUsers.getUser().getEmail(),
                    projectUsers.getUser().getGitToken()
            );
            projectUserInfoDtoList.add(infoDto);
        }
        return projectUserInfoDtoList;
    }

    public ProjectNameAndUserEmailDto getProjectNameAndUsersEmail(Projects project) {
        List<String> userEmailList = projectUserRepository.findAllByProjectId(project.getId()).stream()
                .map(projectUsers -> projectUsers.getUser().getEmail())
                .toList();
        return new ProjectNameAndUserEmailDto(project.getName(), userEmailList);
    }

    public ProjectUsers getProjectUser(Long projectUserId) {
        return projectUserRepository.findById(projectUserId).orElse(null);
    }
}
