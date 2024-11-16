package com.core.backend.controller;

import com.core.backend.service.CarrotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/carrot")
public class CarrotController {

    private final CarrotService carrotService;

//    @GetMapping("/search/list/{projectUserId}")
//    public ResponseEntity<List<CarrotListDto>> searchCarrotList(@PathVariable Long projectUserId) {
//        return new ResponseEntity<>(carrotService)
//    }

}
