const express = require("express");
const cors = require("cors");
const app = express();

/**
 * The port that the server runs on
 */
const port = process.env.PORT || 8080;

/**
 * Indicates if the server is shutting off
 */
var shutting_down = false;

/**
 * Contains wordRouter and closeDB function
 */
const words = require("./routes/words.js");

app.use(cors());
app.use(express.static("frontend/build"));

app.use("/words", words.wordRouter);

/**
 * The express server
 */
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/**
 * Allows windows operating systems to use the SIGINT and SIGTERM cleanup functions
 */
if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });

  rl.on("SIGTERM", function () {
    process.emit("SIGTERM");
  });
}

/**
 * Shutsdown the server and rest of the connections
 */
function cleanup() {
  shutting_down = true;
  server.close(function () {
    words.closeDB();
    console.log("Closed out remaining connections.");
    process.exit();
  });

  setTimeout(function () {
    console.error("Could not close connections in time, forcing shut down");
    words.closeDB();
    process.exit(1);
  }, 30 * 1000);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
