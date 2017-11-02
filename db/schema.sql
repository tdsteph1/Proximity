drop database if exists location_db;
create database location_db;

use location_db;

create table userLocation (
	ID int not null auto_increment primary key,
    UserId varchar(50),
    Date datetime not null,
    Time datetime not null,
    Coordinates varchar(100) not null,
    Latitude float8 not null,
    Longitude float8 not null,
    Country varchar(50),
    Municipality varchar(50),
    City varchar(50),
    Accuracy int not null
);