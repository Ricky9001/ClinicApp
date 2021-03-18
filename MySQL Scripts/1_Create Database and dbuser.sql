DROP DATABASE IF EXISTS Clinic;
CREATE DATABASE IF NOT EXISTS Clinic;

CREATE USER 'app_sa'@'localhost' identified by 'master';
ALTER USER 'app_sa'@'localhost' IDENTIFIED WITH mysql_native_password BY 'master'
GRANT ALL PRIVILEGES ON Clinic.* TO 'app_sa'@'localhost';
FLUSH PRIVILEGES;


