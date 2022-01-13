const mysql = require("mysql");
require("dotenv").config();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

// Creates a connection pool to the database with max 10 connections at the same time
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

const wordSchema = {
  type: "object",
  properties: {
    tag: {
      type: "string",
    },
    english: {
      type: "string",
    },
    finnish: {
      type: "string",
    },
  },
};

let connectionFunctions = {
  // Closes the database pool connection
  close: () => {
    function func(resolve, reject) {
      pool.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Connections closed");
        }
      });
    }

    return new Promise(func);
  },
  // Saves a word to the database
  save: (word) => {
    const saveQuery = `INSERT INTO words (type, word, solution) VALUES (${word.tag},${word.english},${word.finnish})`;

    const validation = validator.validate(word, wordSchema);

    function func(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          if (validation.errors.length < 1) {
            connection.query(saveQuery, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve("Word saved successfully!");
              }
            });
          } else {
            reject(validation.errors);
          }
        }
        connection.release();
      });
    }

    return new Promise(func);
  },
  editById: (id, word) => {
    const editByIdQuery = `UPDATE words SET tag = "${word.tag}", english = "${word.english}", finnish = "${word.finnish}" WHERE id = ${id}`;
    const validation = validator.validate(word, wordSchema);

    function func(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          if (validation.errors.length < 1) {
            connection.query(editByIdQuery, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve("Word edited successfully!");
              }
            });
          } else {
            reject(validation.errors);
          }
        }
        connection.release();
      });
    }
    return new Promise(func);
  },
  // Searches the database for all words
  findAll: () => {
    const findAllQuery = "SELECT * FROM words";
    function func(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(findAllQuery, (err, words) => {
            if (err) {
              reject(err);
            } else {
              resolve(words);
            }
            connection.release();
          });
        }
      });
    }

    return new Promise(func);
  },
  // Deletes a word from the database with a certain id
  deleteById: (id) => {
    const deleteByIdQuery = `DELETE FROM words WHERE id=${id}`;
    function func(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(deleteByIdQuery, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve("Deleted successfully");
            }
            connection.release();
          });
        }
      });
    }
    return new Promise(func);
  },
  // Searches the database for a word with a certain id
  findById: (id) => {
    const findByIdQuery = `SELECT * FROM words WHERE id=${id}`;
    function func(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(findByIdQuery, (err, words) => {
            if (err) {
              reject(err);
            } else {
              if (words.length <= 0) {
                reject({ msg: `could not find resource with id = ${id}` });
              }
              resolve(words);
            }
            connection.release();
          });
        }
      });
    }
    return new Promise(func);
  },
  // Searches the database for words with a certain type
  findByType: (tag) => {
    const findByTypeQuery = `SELECT * FROM words WHERE tag="${tag}"`;
    function func(resolve, reject) {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(findByTypeQuery, (err, words) => {
            if (err) {
              reject(err);
            } else {
              if (words.length <= 0) {
                reject({ msg: `could not find words with type = ${tag}` });
              }
              resolve(words);
            }
            connection.release();
          });
        }
      });
    }
    return new Promise(func);
  },
};

module.exports = connectionFunctions;
