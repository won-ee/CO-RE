package com.core.backend.service;

import com.core.backend.data.dto.projects.InfoResponseProjectListDto;
import com.core.backend.data.dto.users.*;
import com.core.backend.data.entity.ProjectUsers;
import com.core.backend.data.entity.Projects;
import com.core.backend.data.entity.Users;
import com.core.backend.data.repository.ProjectRepository;
import com.core.backend.data.repository.ProjectUserRepository;
import com.core.backend.data.repository.UserRepository;
import com.core.backend.exception.UserNotFoundException;
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
    private final APIService apiService;

    public boolean findUserEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public UserLoginDto getFirstUserInfo(Long id) {
        Users user = userRepository.findById(id).orElse(null);
        assert user != null;

        InfoResponseUserDto getUserDto = InfoResponseUserDto.builder()
                .id(user.getId())
                .accountId(user.getAccountId())
                .email(user.getEmail())
                .name(user.getName())
                .nickName(user.getNickname())
                .image(user.getProfile())
                .gitToken(user.getGitToken())
                .build();

        List<Projects> projectList = projectService.getProjectsByUserId(id);
        ArrayList<InfoResponseProjectListDto> getProListDto = new ArrayList<>();
        for (Projects project : projectList) {

            ProjectUsers projectUsers = projectUserRepository.findByUserIdAndProjectId(user.getId(), project.getId());
            assert projectUsers != null;

            InfoResponseProjectListDto getProDto = InfoResponseProjectListDto.builder()
                    .id(project.getId())
                    .projectUserId(projectUsers.getId())
                    .name(project.getName())
                    .image(project.getImage())
                    .ownerId(project.getOwnerId())
                    .ownerName(project.getOwnerName())
                    .groupId(project.getJiraGroup().getId())
                    .groupName(project.getJiraGroup().getGroupName())
                    .githubOwner(project.getGithubOwner())
                    .githubRepo(project.getGithubRepository())
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

    public UserAllInfoDto getUserInfo(Long id) {
        Users user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return UserAllInfoDto.toUserAllInfoDto(user);
    }

    public UserAllInfoDto updateUserInfo(Long id, UserUpdateInfoDto userInfo) {
        Users user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        user.createUserInfo(userInfo);
        user = userRepository.save(user);

        // 여기서 깃허브 연결시 깃 아이디반환하는 부분 추가할것.
        if (userInfo.gitToken() != null && !userInfo.gitToken().isEmpty()) {
            log.info("API - Git Name 요청");
            apiService.getGitHubName(user);
        }

        return UserAllInfoDto.toUserAllInfoDto(user);
    }

    public UserTokenDto getGitTokenToUser(Long id) {
        Users user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return UserTokenDto.builder()
                .token(user.getGitToken())
                .build();
    }
}
