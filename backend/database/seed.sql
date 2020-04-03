DROP DATABASE IF EXISTS pantry_party;
CREATE DATABASE pantry_party;
\c pantry_party;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR, 
    lastname VARCHAR, 
    email VARCHAR, 
    password VARCHAR

);

CREATE TABLE pantry (
    id SERIAL PRIMARY KEY, 
    name VARCHAR, 
    category VARCHAR, 
    expiration_date DATE
);

CREATE TABLE shoppinglist (
    id SERIAL PRIMARY KEY, 
    food_item INT REFERENCES pantry(id), 
    food_name VARCHAR REFERENCES pantry(name)
); 

CREATE TABLE calendar (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id), 
    event VARCHAR, 
    event_date DATE, 
    event_description VARCHAR
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    name VARCHAR, 
    ingredients TEXT [], 
    directions VARCHAR
);
 
-- CREATE TABLE pantry_party (

-- );


INSERT INTO users (firstname, lastname, email, password)
    VALUES ('Suzette', 'Islam', 'suzette@gmail.com', '123ok'), 
            ('Maliq', 'Taylor', 'maliq@gmail.com', 'ok123'),
            ('Douglas', 'MacKrell', 'douglas@gmail.com', 'ok123');

INSERT INTO pantry (name, category, expiration_date)
    VALUES ('rice', 'grain', '2021-01-01'),
            ('quinoa', 'grain', '2021-01-01'),
            ('tuna', 'seafood', '2021-01-01');

INSERT INTO recipes(name, ingredients, direction)
    VALUES ('Nachos', ARRAY['tortilla chips', 'sourcream', 'jalapeños', 'pico'], 'lay the tortilla chips down first and place all of the ingredients on top but keep in mind to distribute thorougly' );
