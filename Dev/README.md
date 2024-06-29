# Local

## DB

- download h2 https://www.h2database.com/html/download.html

  > Version 2.1.214

- Run h2 in local, use jdbc url:

    ```
    jdbc:h2:{REAL_LOCATION}/largierj/db
    ```

- use username sa and password password

- Run schema.sql and data.sql
- Disconnect H2 console

## Spring

- Set environment parameter in run configuration

  ```
  SPRING_PROFILES_ACTIVE=dev
  ```

- Run LargierJApplication with param:

  ```
  -Dspring.config.additional-location={REAL_LOCATION}/largierj/largier-server/src/main/resources/application-dev.yml -Dspring.profiles.active=dev
  ```