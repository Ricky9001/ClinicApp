USE Agency;

CREATE TABLE IF NOT EXISTS `Interview` (
	`autoid` INT NOT NULL AUTO_INCREMENT,   
	`userid` INT NOT NULL,
	`company` NVARCHAR(100) NOT NULL,
	`interviewer` NVARCHAR(100) NOT NULL,
	`interviewee` NVARCHAR(200) NOT NULL,	
	`job_title` NVARCHAR(200) NOT NULL,	
	`expected_salary` INT NOT NULL,
	`interview_date` DATETIME NOT NULL,
	`create_time` DATETIME NOT NULL,
    PRIMARY KEY (`autoid`)
);