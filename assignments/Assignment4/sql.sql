
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `testAsssignment` ;
USE `testAsssignment` ;

CREATE TABLE IF NOT EXISTS `testAsssignment`.`banks` (
  `cvr` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `cvr` (`cvr` ASC))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `testAsssignment`.`customers` (
  `cpr` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `bank_cvr` VARCHAR(255) NULL DEFAULT NULL,
  UNIQUE INDEX `cpr` (`cpr` ASC),
  INDEX `bank_cvr` (`bank_cvr` ASC),
  CONSTRAINT `customers_ibfk_1`
    FOREIGN KEY (`bank_cvr`)
    REFERENCES `testAsssignment`.`banks` (`cvr`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `testAsssignment`.`accounts` (
  `number` INT NOT NULL AUTO_INCREMENT,
  `balance` DOUBLE(255,3) NOT NULL DEFAULT '0.000',
  `customer_cpr` VARCHAR(255) NOT NULL,
  `bank_cvr` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `number` (`number` ASC),
  INDEX `customer_cpr` (`customer_cpr` ASC),
  INDEX `bank_cvr` (`bank_cvr` ASC),
  CONSTRAINT `accounts_ibfk_1`
    FOREIGN KEY (`customer_cpr`)
    REFERENCES `testAsssignment`.`customers` (`cpr`),
  CONSTRAINT `accounts_ibfk_2`
    FOREIGN KEY (`bank_cvr`)
    REFERENCES `testAsssignment`.`banks` (`cvr`))
ENGINE = InnoDB
AUTO_INCREMENT = 3;


CREATE TABLE IF NOT EXISTS `testAsssignment`.`movements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DOUBLE(255,3) NOT NULL,
  `accountTo` INT NOT NULL,
  `accountFrom` INT NOT NULL,
  `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `movements_ibfk_1` (`accountTo` ASC),
  CONSTRAINT `movements_ibfk_1`
    FOREIGN KEY (`accountTo`)
    REFERENCES `testAsssignment`.`accounts` (`number`))
ENGINE = InnoDB
AUTO_INCREMENT = 14;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
