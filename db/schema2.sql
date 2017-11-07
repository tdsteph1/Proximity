DROP DATABASE IF EXISTS proximity_db;

CREATE DATABASE proximity_db;

USE proximity_db;

CREATE TABLE proximity
(

 id INT AUTO_INCREMENT NOT NULL,
 firstName VARCHAR(100) NULL,
 lastName VARCHAR(100) NULL,
 email VARCHAR(100) NULL,
 password VARCHAR(100) NULL,
 gender VARCHAR(100) NULL,
 
 PRIMARY KEY (id)




);

