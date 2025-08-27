// Gerekli modülleri import ediyoruz
const express = require("express");        // Web framework'ü
const http = require("http");              // HTTP server oluşturmak için
const socketio = require("socket.io");     // Real-time iletişim için Socket.io

// Express uygulamasını oluşturuyoruz
const app = express();
// HTTP server'ı Express app'i ile oluşturuyoruz
const server = http.createServer(app);

// Socket.io'yu HTTP server'a bağlıyoruz
const io = socketio(server);

// Static dosyaları serve etmek için public klasörünü kullanıyoruz
app.use(express.static("public"));

// Online kullanıcıları takip etmek için Set veri yapısı kullanıyoruz
const users=new Set();

// Socket.io bağlantı olayını dinliyoruz
io.on("connection", (socket) => {
  // Yeni bir kullanıcı bağlandığında konsola log yazdırıyoruz
  console.log("a user connected", socket.id);
 
  // Kullanıcının chat'e katılma olayını dinliyoruz
  socket.on("join", (userName) => {
    // Kullanıcı adını Set'e ekliyoruz
    users.add(userName);
    // Socket nesnesine kullanıcı adını kaydediyoruz
    socket.userName = userName;
    // Tüm kullanıcılara yeni kullanıcının katıldığını bildiriyoruz
    io.emit("user-joined", userName);
    // Güncel kullanıcı listesini tüm kullanıcılara gönderiyoruz
    io.emit("user-list", Array.from(users));
  });
  
  // Chat mesajı gönderme olayını dinliyoruz
  socket.on("chat-message", (message) => {
   // Gelen mesajı tüm kullanıcılara iletiliyoruz
   io.emit("chat-message", message);
  });
  
  // Kullanıcının bağlantısı kesildiğinde
  socket.on("disconnect", () => {
    // Kullanıcının ayrıldığını konsola yazdırıyoruz
    console.log("a user disconnected", socket.id);
    // Kullanıcı listesini kontrol ediyoruz
    users.forEach((user) => {
      // Eğer ayrılan kullanıcı listede varsa
      if (user.id === socket.userName) {
        // Kullanıcıyı listeden çıkarıyoruz
        users.delete(user);
        // Tüm kullanıcılara kullanıcının ayrıldığını bildiriyoruz
        io.emit("user-left", user);
        // Güncel kullanıcı listesini gönderiyoruz
        io.emit("user-list", Array.from(users));
      }
    });
    
  });
  
});

// Server'ın çalışacağı port
const PORT = 3000;
// Server'ı belirtilen portta başlatıyoruz
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
