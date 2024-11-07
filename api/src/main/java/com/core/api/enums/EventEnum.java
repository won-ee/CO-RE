package com.core.api.enums;

public enum EventEnum {
    CREATED,
    SUBMITTED,
    EDITED,
    DELETED,
    CLOSED;

    public static EventEnum fromString(String action) {
        for (EventEnum eventEnum : EventEnum.values()) {
            if (eventEnum.name()
                    .equalsIgnoreCase(action)) {
                return eventEnum;
            }
        }
        return null;
    }
}