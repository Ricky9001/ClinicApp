USE Clinic

CREATE TABLE IF NOT EXISTS `ConRecord` (
	`autoid` INT NOT NULL AUTO_INCREMENT,   
	`userid` INT NOT NULL,
	`doctor` NVARCHAR(100) NOT NULL,
	`patient` NVARCHAR(100) NOT NULL,
	`diagnosis` NVARCHAR(200) NOT NULL,	
	`medication` NVARCHAR(200) NOT NULL,	
	`fee` INT NOT NULL,
	`con_datetime` DATETIME NOT NULL,
	`follow_up` VARCHAR(5) NOT NULL,
	`create_time` DATETIME NOT NULL,
    PRIMARY KEY (`autoid`)
);