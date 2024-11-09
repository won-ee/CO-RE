package com.core.backend.service;

import com.core.backend.data.dto.users.UserGroupsDto;
import com.core.backend.data.entity.JiraGroups;
import com.core.backend.data.repository.GroupRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class GroupService {

    private final GroupRepository groupRepository;

    public void saveGroups(List<UserGroupsDto> groupList) {
        for (UserGroupsDto group : groupList) {

            Optional<JiraGroups> existingGroup = groupRepository.findByGroupKey(group.groupKey());

            if (existingGroup.isEmpty()) {
                JiraGroups newGroup = JiraGroups.builder()
                        .groupKey(group.groupKey())
                        .groupName(group.groupName())
                        .groupUrl(group.groupUrl())
                        .groupImage(group.groupAvatarUrl())
                        .build();

                groupRepository.save(newGroup);
            }
        }

    }

    public JiraGroups findGroupByGroupId(Long groupId) {
        return groupRepository.findById(groupId).orElse(null);
    }


    public JiraGroups findGroup(String groupUrl) {
        return groupRepository.findByGroupUrl(groupUrl);
    }
}
