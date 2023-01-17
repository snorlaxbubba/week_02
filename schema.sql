--Create Database
DROP DATABASE IF EXISTS pokemon_app;
CREATE DATABASE pokemon_app;
USE pokemon_app;

--Create a user that can access the database
DROP USER IF EXISTS 'pokemon_app_user'@'localhost';
CREATE USER 'pokemon_app_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyPassword1!';
GRANT ALL PRIVILEGES ON pokemon_app.* TO 'pokemon_app_user'@'localhost';

--Create All Tables
DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    pokemon VARCHAR(255) NOT NULL,
    numDefeated INTEGER NOT NULL
);