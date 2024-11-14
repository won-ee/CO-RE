package com.core.backend.service;

import com.core.backend.data.dto.projects.InfoResponseProjectListDto;
import com.core.backend.data.dto.users.InfoResponseUserDto;
import com.core.backend.data.dto.users.UserInfoDto;
import com.core.backend.data.dto.users.UserLoginDto;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.ProjectRepository;
import com.core.backend.data.repository.ProjectUserRepository;
import com.core.backend.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final JiraService jiraService;
    private final UserRepository userRepository;
    private final ProjectUserRepository projectUserRepository;
    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private final GroupService groupService;

    public boolean findUserEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public UserLoginDto getUserInfo(Long id) {
        Users user = userRepository.findById(id).orElse(null);
        assert user != null;

        InfoResponseUserDto getUserDto = InfoResponseUserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .nickName(user.getNickname())
                .image(user.getProfile())
                .build();

        List<Projects> projectList = projectService.getProjectsByUserId(id);
        ArrayList<InfoResponseProjectListDto> getProListDto = new ArrayList<>();
        for (Projects project : projectList) {

            InfoResponseProjectListDto getProDto = InfoResponseProjectListDto.builder()
                    .id(project.getId())
                    .name(project.getName())
                    .image(project.getImage())
                    .ownerId(project.getOwnerId())
                    .ownerName(project.getOwnerName())
                    .groupId(project.getJiraGroup().getId())
                    .groupName(project.getJiraGroup().getGroupName())
                    .build();

            getProListDto.add(getProDto);
        }

        return UserLoginDto.builder()
                .userInfo(getUserDto)
                .projects(getProListDto)
                .build();
    }

    public Long saveUserIfNotExists(UserInfoDto userInfo) {

        return userRepository.findByAccountId(userInfo.accountId())
                .map(Users::getId)
                .orElseGet(() -> {
                    Users newUser = Users.builder()
                            .name(userInfo.name())
                            .nickname(userInfo.nickname())
                            .profile(userInfo.picture())
                            .accountId(userInfo.accountId())
                            .email(userInfo.email())
                            .build();

                    return userRepository.save(newUser).getId();
                });
    }

    public Long saveUser(UserInfoDto userInfo) {

        Users newUser = Users.builder()
                .name(userInfo.name())
                .nickname(userInfo.nickname())
                .profile(userInfo.picture())
                .accountId(userInfo.accountId())
                .email(userInfo.email())
                .build();

        return userRepository.save(newUser).getId();
    }

    public Users getUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
