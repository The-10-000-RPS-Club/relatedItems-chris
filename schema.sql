-- schema.sql
-- Drop database if exists

DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

-- Use 'sdc' databse
\c sdc;

-- Create 'item' table
CREATE TABLE item (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name VARCHAR(30),

)