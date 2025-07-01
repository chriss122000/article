CREATE TABLE
    IF NOT EXISTS user (
        id_user INT(11) AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS article (
        id_article INT(11) AUTO_INCREMENT PRIMARY KEY,
        nom_article VARCHAR(255) NOT NULL,
        quantity INT(11) NOT NULL,
        isDeleted 	tinyint(4) DEFAULT 0
    );
