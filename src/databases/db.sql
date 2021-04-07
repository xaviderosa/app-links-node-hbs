CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users  (
    id INT(10) auto_increment NOT NULL,
    username VARCHAR(30) not null,
    password varchar(30) not null,
    fullname varchar(45) not null,
    PRIMARY KEY(id)
);

CREATE TABLE links (
    id INT(10) NOT NULL,
    title varchar(150) not null,
    url VARCHAR(150) not null,
    descripcion TEXT,
    user_id INT(20),
    created_at TIMESTAMP not null default CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);