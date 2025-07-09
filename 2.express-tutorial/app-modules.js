// Express.js framework'ünü ES6 module syntax ile import ediyoruz
import express from "express";

// Express uygulaması örneğini oluşturuyoruz
const app = express();

// View engine'i EJS olarak ayarlıyoruz
// EJS (Embedded JavaScript) - HTML içinde JavaScript kodları yazmamızı sağlayan template engine
// Bu sayede dinamik HTML sayfaları oluşturabiliriz
app.set("view engine", "ejs");

//routing - Farklı HTTP route'ları tanımlıyoruz

// GET isteği - Ana sayfa route'u
// "/" path'ine gelen GET isteklerinde "index" template'ini render eder
// EJS dosyası views/index.ejs konumunda olmalıdır
app.get("/", (req, res) => {
    res.render("index");
});

// POST isteği - API endpoint'i
// "/api/data" path'ine gelen POST isteklerini işler
// Gelen veriyi JSON formatında geri döner
app.post("/api/data", (req, res) => {
    // req.body - POST ile gönderilen verileri içerir
    // Yanıt olarak başarı mesajı ve alınan veriyi döner
    res.json({ message: "Data received", data: req.body });
});

// Error handling middleware - Hata yakalama middleware'i
// Tüm route'lardan sonra tanımlanır ve hataları yakalar
// 4 parametre alır: (err, req, res, next)
app.use((err, req, res, next) => {
    // Hata detaylarını konsola yazdır
    console.error(err.stack);
    
    // Kullanıcıya 500 (Internal Server Error) status kodu ile hata mesajı gönder
    res.status(500).send("Something broke!");
    
    // Bir sonraki middleware'e geç (zincirleme işlem)
    next();
});

/*
Bu dosya Express.js'in temel özelliklerini gösterir:

1. VIEW ENGINE (EJS):
   - Template engine kullanımı
   - Dinamik HTML oluşturma
   - Server-side rendering

2. ROUTING:
   - GET ve POST isteklerini işleme
   - Farklı path'ler için farklı handler'lar
   - RESTful API yapısı

3. ERROR HANDLING:
   - Merkezi hata yönetimi
   - Hata yakalama middleware'i
   - Kullanıcı dostu hata mesajları

4. MIDDLEWARE KAVRAMI:
   - İstek-yanıt döngüsünde ara katman
   - Sıralı çalışma yapısı
   - next() fonksiyonu ile zincirleme

Bu yapı, modern web uygulamalarının temelini oluşturur.
*/



