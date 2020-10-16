-- schema.sql
-- Drop database if exists

DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

-- Use 'sdc' databse
\c sdc;

-- Drop tables if exist;
DROP TABLE IF EXISTS relatedItems;
DROP TABLE IF EXISTS items;

-- Create 'item' table
CREATE TABLE items (
  product_id INTEGER PRIMARY KEY
);

CREATE TABLE relatedItems (
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL REFERENCES items(product_id),
  manufacturer VARCHAR(60),
  item_name VARCHAR(30),
  rating FLOAT,
  number_of_ratings INTEGER,
  price FLOAT,
  product_url VARCHAR(100),
  onSale BOOLEAN,
  onSalePrice VARCHAR(30)
);