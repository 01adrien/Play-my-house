DROP TABLE IF EXISTS users; 
      CREATE TABLE users (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `name` VARCHAR(20),
        `email` VARCHAR(50),
        `telephone` VARCHAR(15),
        `password` VARCHAR(30)
        );
      INSERT INTO users (`name`, `email`, `telephone`) VALUES
      ('Bob', 'bob@email.com', '0562458987'), ('Jim', 'Jim@email.com', '0662458987'), ('Henry', 'Henry@email.com', '0762458987');


DROP TABLE IF EXISTS colors; 
      CREATE TABLE colors (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `name` VARCHAR(20),
        `hex_code` VARCHAR(10)
        );
      INSERT INTO colors (`name`, `hex_code`) VALUES 
      ('blue', '#186fef'), ('red', '#d60000'), ('green', '#1fb805');


DROP TABLE IF EXISTS instruments_family;
      CREATE TABLE instruments_family (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `family` VARCHAR(100)
      );


DROP TABLE IF EXISTS days;
      CREATE TABLE days (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `day` DATE
      );


DROP TABLE IF EXISTS instruments_type;
      CREATE TABLE instruments_type (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `type` VARCHAR(100),
        `family_id` INT NOT NULL
      );


DROP TABLE IF EXISTS instruments_brand;
      CREATE TABLE instruments_brand (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `brand` VARCHAR(100)
      );


DROP TABLE IF EXISTS city;
      CREATE TABLE city (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `name` VARCHAR(255),
        `CP` VARCHAR(10)
      );


DROP TABLE IF EXISTS owners;
      CREATE TABLE owners (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `name` VARCHAR(255),
        `address` VARCHAR(20),
        `city_id` INT NOT NULL,
        `email` VARCHAR(50),
        `telephone` VARCHAR(15),
        FOREIGN KEY (city_id) REFERENCES city(id)
      );


DROP TABLE IF EXISTS instruments;
      CREATE TABLE instruments (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `name` VARCHAR(255),
        `family_id` INT NOT NULL,
        `type_id` INT NOT NULL,
        `owner_id` INT NOT NULL,
        `brand_id` INT NOT NULL,
        FOREIGN KEY (family_id) REFERENCES instruments_family(id),
        FOREIGN KEY (type_id) REFERENCES instruments_type(id),
        FOREIGN KEY (owner_id) REFERENCES owners(id),
        FOREIGN KEY (brand_id) REFERENCES instruments_brand(id)
      );


DROP TABLE IF EXISTS reservations;
      CREATE TABLE reservations (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `number` VARCHAR(255),
        `instrument_id` INT NOT NULL,
        `color_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        `day_id`INT NOT NULL,
        FOREIGN KEY (instrument_id) REFERENCES instruments(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (day_id) REFERENCES days(id),
        FOREIGN KEY (color_id) REFERENCES colors(id)
      );


DROP TABLE IF EXISTS pictures;
      CREATE TABLE pictures (
        `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
        `URI` VARCHAR(255),
        `instrument_id`INT NOT NULL,
        FOREIGN KEY (instrument_id) REFERENCES instruments(id)
      );


/// GESTION JOURS ET HEURES