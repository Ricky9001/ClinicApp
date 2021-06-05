DROP DATABASE IF EXISTS Agency;
CREATE DATABASE IF NOT EXISTS Agency;

CREATE USER 'app_sa'@'localhost' identified by 'master';
ALTER USER 'app_sa'@'localhost' IDENTIFIED WITH mysql_native_password BY 'master'
GRANT ALL PRIVILEGES ON Agency.* TO 'app_sa'@'localhost';
FLUSH PRIVILEGES;


