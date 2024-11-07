package com.core.backend.service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class ProjectUserService {

    public void saveProjectuser() {
//        TODO: 여기서부터 팀원 목록 권한 체크해서 넣어주기, 첫 회원가입시에 권한체크해서 넣는데 만약, 프로젝트 만들어져있어도 처음이면 팀원추가는 해줘야함.

    }
}
