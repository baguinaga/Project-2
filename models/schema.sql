DROP DATABASE IF EXISTS game_db;
CREATE DATABASE game_db;

USE game_db;

CREATE TABLE players
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);