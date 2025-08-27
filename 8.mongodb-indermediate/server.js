require("dotenv").config(); // .env dosyasını yükler
const express = require("express"); // Express framework'ünü içe aktarır
const productRoutes = require("./routes/product-routes"); // Ürün router'ını alır
const bookRoutes = require("./routes/book-routes"); // Kitap-yazar router'ını alır
const mongoose = require("mongoose"); // Mongoose'u içe aktarır
const app = express(); // Express uygulaması oluşturur
const port = process.env.PORT || 3000; // Sunucu portunu belirler

mongoose // MongoDB bağlantısını başlatır
  .connect(process.env.MONGO_URL) // .env içindeki MONGO_URL ile bağlanır
  .then(() => { // Başarılı bağlantı
    console.log("Connected to MongoDB"); // Konsola bilgi yazar
  })
  .catch((err) => { // Hata durumunda
    console.log(err); // Hata loglar
  });
app.use(express.json()); // JSON gövde parsing middleware'i
app.use("/products", productRoutes); // /products altına ürün rotalarını bağlar
app.use("/reference", bookRoutes); // /reference altına kitap-yazar rotalarını bağlar
app.listen(port, () => { // Sunucuyu dinlemeye alır
  console.log(`Server is running on port ${port}`); // Port bilgisini loglar
});

// Açıklama:
// Bu dosya Express uygulamasını başlatır, MongoDB'ye bağlanır ve iki router'ı mount eder:
// /products ve /reference. Ortam değişkenleri .env'den alınır.
