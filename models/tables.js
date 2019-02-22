import pool from './db';


const tablesCreate = () => {
  const users = `CREATE TABLE IF NOT EXISTS
     users(
       id SERIAL PRIMARY KEY,"firstName" VARCHAR(24) NOT NULL,"lastName" VARCHAR(10) NOT NULL,
       "otherName" VARCHAR(10) NULL,
       "email" VARCHAR(50) NOT NULL,
       "phoneNumber" VARCHAR(10) NOT NULL,
       password TEXT NOT NULL,
       "passportUrl" VARCHAR(20) NOT NULL,
       "isAdmin" BOOLEAN NOT NULL DEFAULT false
     )`;

  const party = `CREATE TABLE IF NOT EXISTS
    party(
     id SERIAL PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     hqaddress VARCHAR(50) NOT NULL,
     logourl VARCHAR(50) NOT NULL
    )`;


  const candidate = `CREATE TABLE IF NOT EXISTS
   candidate(
     id SERIAL,
     office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE ON UPDATE CASCADE,
     party INT NOT NULL REFERENCES party(id) ON DELETE CASCADE ON UPDATE CASCADE,
     candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     votes INT NOT NULL DEFAULT 0,
     PRIMARY KEY (id, office, candidate)
   )`;

  const vote = `CREATE TABLE IF NOT EXISTS
  vote(
     id SERIAL PRIMARY KEY,
     createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     createdby INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE ON UPDATE CASCADE,
     candidate INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`;

  const petition = `CREATE TABLE IF NOT EXISTS
  petition(
     id SERIAL PRIMARY KEY,
     createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     createdby INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
     office INT NOT NULL REFERENCES office(id) ON DELETE CASCADE ON UPDATE CASCADE,
     body TEXT NOT NULL
  )`;
  const office = `CREATE TABLE IF NOT EXISTS
  office(
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   type VARCHAR(50) NOT NULL
  )`;
  const newUserTable = `INSERT INTO 
  users(
    "firstName",
    "lastName",
    "otherName",
    "email",
    "phoneNumber",
    "password",
    "passportUrl",
    "isAdmin"
    ) VALUES (
    'ngirababyeyi',
    'eric',
    'erico',
    'ngireric123@gmail.com',
    '0788716711',
    '123',
    'my_pic.jpg',
    true
    )`;

  const queries = `${users};${party}; ${candidate}; ${vote}; ${petition};${office}; ${newUserTable}`;

  pool.query(queries);
};

const tablesDelete = () => {
  const users = 'DROP TABLE IF EXISTS users CASCADE';
  const petition = 'DROP TABLE IF EXISTS petition';
  const candidate = 'DROP TABLE IF EXISTS candidate';
  const office = 'DROP TABLE IF EXISTS office CASCADE';
  const vote = 'DROP TABLE IF EXISTS vote';
  const party = 'DROP TABLE IF EXISTS party CASCADE';
  const deleteQueries = `${users};${petition}; ${candidate}; ${office}; ${vote}; ${party}`;
  pool.query(deleteQueries);
};

module.exports = {
  tablesCreate,
  tablesDelete,
};

require('make-runnable');
