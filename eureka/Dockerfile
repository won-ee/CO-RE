FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/eureka-server.jar eureka-server.jar

ENTRYPOINT ["java", "-jar", "/eureka-server.jar"]