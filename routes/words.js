const express = require("express");
const connection = require("../database/crudrepository.js");
var router = express.Router();

router.use(express.json());

/**
 * Returns all the words from the database
 */
router.get("/", async (req, res) => {
  try {
    let result = await connection.findAll();
    res.statusCode = 200;
    res.send(result);
  } catch (err) {
    res.statusCode = 400;
    res.send(err);
  }
});

/**
 * Returns a word with a certain id from the database
 */
router.get("/:index([0-9]+)", async (req, res) => {
  try {
    let result = await connection.findById(req.params.index);
    res.statusCode = 200;
    res.send(result);
  } catch (err) {
    res.statusCode = 404;
    res.send(err);
  }
});

/**
 * Deletes a word with a certain id from the database
 */
router.delete("/:index([0-9]+)", async (req, res) => {
  try {
    let result = await connection.deleteById(req.params.index);
    res.statusCode = 200;
    res.send(result);
  } catch (err) {
    res.statusCode = 404;
    res.send(err);
  }
});

/**
 * Adds a word to the database
 */
router.post("/", async (req, res) => {
  try {
    let result = await connection.save(req.body);
    res.statusCode = 200;
    res.send(result);
  } catch (err) {
    res.statusCode = 400;
    res.send(err);
  }
});

/**
 * Edits a word in the database
 */
router.put("/:index([0-9]+)", async (req, res) => {
  try {
    let result = await connection.editById(req.params.index, req.body);
    res.statusCode = 200;
    res.send(result);
  } catch (err) {
    res.statusCode = 404;
    res.send(err);
  }
});

// Closes the database connection
exports.closeDB = async function () {
  let result = await connection.close();
  console.log(result);
};

exports.wordRouter = router;
