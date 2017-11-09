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

CREATE TABLE logIn
(

id INT AUTO_INCREMENT NOT NULL,
firstName VARCHAR(100) NULL,
email VARCHAR(100) NULL,
password VARCHAR(100) NULL,




 PRIMARY KEY (id)

);

/*var userLocation = sequelize.define("userLocation", {*/
CREATE TABLE userLocation 
(
    id INT AUTO_INCREMENT NOT NULL,
    date VARCHAR(100) NULL,
    time VARCHAR(100) NULL,
    coordinates VARCHAR(100) NULL,
    latitude VARCHAR(100) NULL,
    longitude VARCHAR(100) NULL,
    accuracy VARCHAR(100) NULL,
    
    PRIMARY KEY (id)
);



