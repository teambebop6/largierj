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

## Run built pkg in local for Florian

```
cd {REAL_LOCATION_OF_PROJECT_PARENT}
mvn clean install
cd largier-server/target
/usr/bin/java -Dspring.config.additional-location={REAL_LOCATION_OF_PROJECT_PARENT}/largierj/Dev/application-dev-f.yml -Dspring.profiles.active=dev-f -jar largier-run.jar
```
