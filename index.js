const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
var shutting_down = false;

const words = require("./routes/words.js");

app.use(cors());
//app.use(express.static("frontend/build"));

app.use("/words", words.wordRouter);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

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
