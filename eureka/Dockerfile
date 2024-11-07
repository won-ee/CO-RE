FROM openjdk:17-slim

#ARG JAR_FILE=/home/ubuntu/eureka/eureka-0.0.1-SNAPSHOT.jar
COPY eureka-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "/app.jar"]