const mysql = require("mysql");
require("dotenv").config();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

/**
 * Creates a connection pool to the database with max 10 connections at the same time
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

/**
 * The json schema that checks that all the given properties are strings
 */
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

/**
 * Contains all the connection functions
 */
const connectionFunctions = {
  /**
   * Closes the database pool connection
   */
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
  /**
   * Saves a word to the database
   */
  save: (word) => {
    const saveQuery = `INSERT INTO words (tag, english, finnish) VALUES ("${word.tag}","${word.english}","${word.finnish}")`;

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
  /**
   * Updates a already existing word in the database
   */
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
  /**
   * Searches the database for all words
   */
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
  /**
   * Deletes a word from the database with a certain id
   */
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
  /**
   * Searches the database for a word with a certain id
   */
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
  /**
   * Searches the database for words with a certain tag
   */
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
