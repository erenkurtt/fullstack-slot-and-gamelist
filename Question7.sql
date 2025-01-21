-- Create the database
CREATE DATABASE online_casino;

-- Use the database
USE online_casino;

-- Create the Casino table
CREATE TABLE Casino (
    casino_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Game table
CREATE TABLE Game (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    casino_id INT NOT NULL,
    game_type VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (casino_id) REFERENCES Casino(casino_id)
);

-- Create the Country table
CREATE TABLE Country (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code CHAR(2) UNIQUE NOT NULL
);

-- Create the GameCountry table (many-to-many relationship between Game and Country)
CREATE TABLE GameCountry (
    game_id INT NOT NULL,
    country_id INT NOT NULL,
    PRIMARY KEY (game_id, country_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (country_id) REFERENCES Country(country_id)
);

-- Create the Player table
CREATE TABLE Player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    favorite_game_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (favorite_game_id) REFERENCES Game(game_id)
);

-- Create the Spin table
CREATE TABLE Spin (
    spin_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    game_id INT NOT NULL,
    amount_won DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES Player(player_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)
);