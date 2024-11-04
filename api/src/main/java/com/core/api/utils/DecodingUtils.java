package com.core.api.utils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class DecodingUtils {

    private DecodingUtils() {
        throw new AssertionError("Utility class should not be instantiated");
    }

    public static String decodeBase64(String encodedString) {
        String cleanedString = encodedString.replaceAll("\\s", "");
        byte[] decodedBytes = Base64.getDecoder()
                .decode(cleanedString);
        return new String(decodedBytes, StandardCharsets.UTF_8);
    }

}
