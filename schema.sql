CREATE DATABASE o_pensador;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS thoughts (
  id SERIAL PRIMARY KEY,
  id_quote INTEGER REFERENCES users(id) not null,
  quote TEXT NOT NULL,
  quote_date TIMESTAMP DEFAULT now(),
  likes integer
)
  