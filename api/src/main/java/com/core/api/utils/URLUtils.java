package com.core.api.utils;

public class URLUtils {
    
    private URLUtils() {
        throw new AssertionError("Utility class should not be instantiated");
    }

    public static String parseFileName(String url) {
        int lastSlash = url.lastIndexOf('/');
        int questionMark = url.indexOf('?');
        return url.substring(lastSlash + 1, questionMark == -1 ? url.length() : questionMark);
    }

    public static String parseRefValue(String url) {
        int refIndex = url.indexOf("ref=");
        if (refIndex == -1) return "";

        return url.substring(refIndex + 4);
    }
}
