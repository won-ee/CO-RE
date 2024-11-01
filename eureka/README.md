## 👻 CO:RE Eureka service

- 8761 포트 사용합니다.

### Eureka client setting
- `build.gradle`
```gradle
ext {
    set('springCloudVersion', "2023.0.3")
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}
```

- `application.yml`
  - 서비스 이름으로 등록되기 때문에 application name이 필요합니다.    
```
spring:
    application:
        name: {service name}

eureka:
  instance:
    instance-id: ${spring.application.name}:${spring.application.instance_id:${random.value}}
    lease-renewal-interval-in-seconds: 10
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

- `Application.java`
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

```