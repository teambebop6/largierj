CREATE TABLE if not exists user2 (
    id BIGINT primary key auto_increment,
    username VARCHAR2(64) NOT NULL unique,
    password VARCHAR2(128) NOT NULL,
    email VARCHAR2(128) NOT NULL unique,
    role INT NOT NULL,
    enabled INT DEFAULT 1,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists concert (
     id BIGINT primary key auto_increment,
     title VARCHAR2(128) NOT NULL,
     location VARCHAR2(64) NOT NULL,
     venue VARCHAR2(64) NOT NULL,
     date DATE DEFAULT CURRENT_DATE,
     link VARCHAR2(512),
     type VARCHAR2(12),
     visible INT DEFAULT 1,
     sort_order INT DEFAULT -1,
     creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists configuration (
    id BIGINT primary key auto_increment,
    group_name VARCHAR2(128) NOT NULL
);

CREATE TABLE if not exists configuration_item (
    id BIGINT primary key auto_increment,
    configuration_id BIGINT NOT NULL,
    name VARCHAR2(128) NOT NULL,
    title VARCHAR2(128) NOT NULL,
    config_value VARCHAR2(128) NOT NULL,
    CONSTRAINT FK_CONFIG_ID FOREIGN KEY (configuration_id) REFERENCES configuration(id)
);

----- updated 2022.09.28
ALTER TABLE concert ADD COLUMN avatar VARCHAR2(64);
ALTER TABLE concert ADD COLUMN avatar_width INT DEFAULT -1;
ALTER TABLE concert ADD COLUMN avatar_height INT DEFAULT -1;

----- updated 2022.10.17
ALTER TABLE concert ALTER COLUMN location VARCHAR2(64) NULL;
ALTER TABLE concert ALTER COLUMN venue VARCHAR2(64) NULL;
