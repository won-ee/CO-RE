package com.core.email.data.dto;

import java.util.ArrayList;

public record EmailRequestDto(ArrayList<String> to, ArrayList<String> contents) {

}
