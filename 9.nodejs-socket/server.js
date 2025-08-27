const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
