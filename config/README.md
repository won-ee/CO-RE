## 👻 CO:RE config service 

- config service는 8888 포트 사용합니다.
- [github repository](https://github.com/ks00919/core-config)에 환경변수를 설정하여 config service를 통해 받도록 합니다.

### YAML file name

- 공통 파일: application.yml
- 애플리케이션별 파일: <application-name>.yml
- 환경별 파일: <application-name>-<profile>.yml
- 클라이언트 초기 설정 파일 (옵션): bootstrap.yml

### Config service health check

- `{url}/actuator/health`에 요청을 보내 다음과 같은 응답이 오면 정상 동작입니다.

```json
{
  "status": "UP"
}
```

### Local 환경변수 설정

> 로컬에서 테스트시 IntelliJ 환경변수 설정을 안내합니다.

1. [RUN] - [Edit Configurations...] - [Modify options] - Environment variables 체크
2. [Environment variables: ]에서 우측 리스트 버튼 클릭으로 환경변수 추가

```md
GIHUB_PASSWORD : ${github personal access token}
GITHUB_REPO : https://github.com/ks00919/core-config.git
GITHUB_USERNAME : ${github id}
```

### Postman 테스트

- 추가한 설정 파일의 이름으로 엔드포인트 접근이 가능합니다.

```md
<!-- host:port/{service name}/{profile} -->

- github에 추가한 파일명 예시: core-env.yml
- URL 예시 : http://localhost:8888/core/env
```
