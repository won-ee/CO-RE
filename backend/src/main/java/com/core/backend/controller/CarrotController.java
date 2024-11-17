package com.core.backend.controller;

import com.core.backend.data.dto.carrot.CarrotListDto;
import com.core.backend.data.dto.isssue.IssueListDto;
import com.core.backend.service.CarrotService;
import com.core.backend.service.JiraOAuthTokenService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/carrot")
public class CarrotController {

    private final CarrotService carrotService;
    private final JiraOAuthTokenService jiraOAuthTokenService;

    @GetMapping("/search/list/{projectUserId}")
    public ResponseEntity<List<CarrotListDto>> searchCarrotList(@PathVariable Long projectUserId) {
        List<CarrotListDto> carrotListDto = carrotService.getCarrotList(projectUserId);

        if (carrotListDto == null || carrotListDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(carrotListDto, HttpStatus.OK);
    }

    @GetMapping("/search/choice-list/{projectUserId}")
    public ResponseEntity<List<IssueListDto>> searchCarrotChoiceList(@PathVariable Long projectUserId) {
        List<IssueListDto> issueListDto = carrotService.getCarrotChoiceList(projectUserId);
        if (issueListDto == null || issueListDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(issueListDto, HttpStatus.OK);
    }

    @GetMapping("/create/{projectUserId}")
    public ResponseEntity<CarrotListDto> createCarrot(@PathVariable Long projectUserId,
                                                      @RequestParam("issueId") Long issueId) {
        CarrotListDto carrotDto = carrotService.createCarrot(projectUserId, issueId);
        if (carrotDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(carrotDto, HttpStatus.OK);
    }

    @GetMapping("/accept/{projectUserId}")
    public ResponseEntity<CarrotListDto> acceptCarrot(@PathVariable Long projectUserId,
                                                      @RequestParam("carrotId") Long carrotId) throws JsonProcessingException {
        CarrotListDto carrotDto = carrotService.acceptCarrotChangeAssignee(projectUserId, carrotId);
        if (carrotDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(carrotDto, HttpStatus.OK);
    }


}
