-- MySQL Script generated by MySQL Workbench
-- sáb 25 sep 2021 10:50:03
-- Author: FS 
-- Embedded Systems Laboratory - UBA - SOFSE
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema MIoT
-- Development of the database to storage real-time  temperature reading.
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS MIoT;

--USE "MIoT" 

-- -----------------------------------------------------
-- Table `MIoT`.`Sensors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MIoT.Sensors(
  idSensors VARCHAR(45) NOT NULL,
  Sensors VARCHAR(45) NULL,
  PRIMARY KEY (idSensors)
  --CONSTRAINT "fk_id_temperature"
  --FOREIGN KEY ("idSensors")
    --REFERENCES MIoT.Temperature ("id")
    --ON DELETE NO ACTION
    --ON UPDATE NO ACTION
    )
;

-- -----------------------------------------------------
-- Table `MIoT`.`Temperature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MIoT.Temperatures(
  idTemperature SERIAL NOT NULL,
  idSensors VARCHAR(45) NOT NULL,
  Temperature REAL NOT NULL,
  datesTime timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (idTemperature), 
  CONSTRAINT fk_sensors_id
  FOREIGN KEY (idSensors)
    REFERENCES MIoT.Sensors (idSensors)
  )     
;


-- -----------------------------------------------------
-- Table `MIoT`.`Nodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MIoT.Nodes(
  id SERIAL NOT NULL,
  idNodes VARCHAR(45) NOT NULL,
  nameNodes VARCHAR(45) NOT NULL,
  PRIMARY KEY(id)
  --CONSTRAINT fk_sensors_id
    --FOREIGN KEY (idNodes)
    --REFERENCES MIoT.Sensors (idSensors)
    --ON DELETE NO ACTION
    --ON UPDATE NO ACTION)
  )  
;


-- -----------------------------------------------------
-- Table `MIoT`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MIoT.Users(
  idUsers SERIAL NOT NULL,
  usersName VARCHAR(45) NOT NULL,
  usersSurname VARCHAR(45) NOT NULL,
  userPosition VARCHAR(45) NOT NULL,
  usersEmail VARCHAR(45) NOT NULL UNIQUE, 
  usersPasswords VARCHAR(128) NOT NULL, 
  usersConfirmPasswords VARCHAR(128) NOT NULL,
  datesTime timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(idUsers)
  --CONSTRAINT "fk_id_temperature"
    --FOREIGN KEY ("idSensors")
    --REFERENCES MIoT.Temperature ("id")
    --ON DELETE NO ACTION
    --ON UPDATE NO ACTION
    )
    ;
