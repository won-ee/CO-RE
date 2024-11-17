FROM openjdk:17-slim

RUN apt-get update && apt-get install -y tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime \
    && echo "Asia/Seoul" > /etc/timezone \
    && apt-get clean

#ARG JAR_FILE=/home/ubuntu/eureka/eureka-0.0.1-SNAPSHOT.jar
COPY eureka-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "/app.jar"]