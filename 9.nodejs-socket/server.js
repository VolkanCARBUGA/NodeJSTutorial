const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.static("public"));

const users=new Set();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
 
  socket.on("join", (userName) => {
    users.add(userName);
    socket.userName = userName;
    io.emit("user-joined", userName);
    io.emit("user-list", Array.from(users));
  });
  socket.on("chat-message", (message) => {
   io.emit("chat-message", message);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    users.forEach((user) => {
      if (user.id === socket.userName) {
        users.delete(user);
        io.emit("user-left", user);
        io.emit("user-list", Array.from(users));
      }
    });
    
  });
  
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
