const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Handle connection event
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnected", function () {
    io.emit("user-disconnected", socket.id);
    delete marker[id];
  });
});

// Serve the main page
app.get("/", function (req, res) {
  return res.render("index");
});

// Start the server
server.listen(8080, () => {
  console.log("Server started on port 8080");
});
