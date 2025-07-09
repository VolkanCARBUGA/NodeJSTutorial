// ES6 import syntax - Bu CommonJS projesinde çalışmaz
// const express = require('express'); şeklinde olmalı
// DİKKAT: Bu dosyada ES6 import kullanılıyor ama yorumda CommonJS yazıyor
// package.json'da "type": "module" olduğu için ES6 import çalışır
import express from "express";

// Express uygulaması oluşturuluyor
// express() fonksiyonu yeni bir Express aplikasyonu döndürür
// Bu app objesi tüm HTTP işlemlerini yönetir
const app = express();

// Ana route tanımlanıyor - GET isteği "/" path'ine geldiğinde çalışır
// Route Handler: HTTP isteklerini karşılayan fonksiyonlar
// req (request): Gelen HTTP isteği bilgileri
// res (response): HTTP yanıtı gönderme araçları
app.get("/", (req, res) => {
    // res.send() - Basit metin yanıtı gönderir
    // Otomatik olarak Content-Type header'ını ayarlar
    res.send("Hello World");
   
    
});

// Port numarası tanımlanıyor
// PORT: Sunucunun dinleyeceği port numarası
// 3000 - geliştirme ortamında yaygın kullanılan port
const PORT = 3000;

// Sunucu belirtilen port'ta dinlemeye başlıyor
// app.listen() - HTTP sunucusunu başlatır
// Callback fonksiyonu sunucu başladığında çalışır
app.listen(PORT, () => {
    // Sunucu başarıyla başladığında konsola bilgi mesajı
    console.log(`Server is running on port ${PORT}`);

});

/* 
SORUNLAR VE ÇÖZÜMLER:

1. DOSYA ADI SORUNU:
   - Mevcut dosya adı: 1.index.js
   - Çalıştırma komutu: node index.js (YANLIŞ)
   - Doğru komut: node 1.index.js
   VEYA
   - Dosya adını index.js olarak değiştirin

2. MODULE SİSTEMİ SORUNU:
   - package.json'da "type": "commonjs" var
   - Ama ES6 import syntax kullanılıyor
   - ÇÖZÜMLERİ:
     a) package.json'da "type": "module" yapın
     b) VEYA import yerine require kullanın:
        const express = require('express');

3. ÇALIŞMA KOMUTLARI:
   - Eğer dosya adı 1.index.js kalacaksa: node 1.index.js
   - Eğer index.js yaparsanız: node index.js
   - VEYA package.json'da scripts bölümüne ekleyin:
     "start": "node 1.index.js"
     ve npm start ile çalıştırın
*/

/*
EXPRESS.JS TEMEL KAVRAMLARI:

1. EXPRESS.JS NEDİR?
   - Node.js için minimal ve esnek web framework'ü
   - HTTP sunucu oluşturmayı kolaylaştırır
   - Routing, middleware, template engine desteği
   - RESTful API ve web aplikasyonları için ideal

2. TEMEL BİLEŞENLER:
   - Application (app): Ana uygulama objesi
   - Routes: URL path'leri ve HTTP metodları
   - Middleware: İstek-yanıt döngüsünde ara katmanlar
   - Request (req): Gelen HTTP isteği bilgileri
   - Response (res): HTTP yanıtı gönderme araçları

3. HTTP METODLARI:
   - GET: Veri alma (app.get)
   - POST: Veri gönderme (app.post)
   - PUT: Veri güncelleme (app.put)
   - DELETE: Veri silme (app.delete)

4. YAYGIN RESPONSE METODLARI:
   - res.send(): Basit metin/HTML gönder
   - res.json(): JSON veri gönder
   - res.render(): Template engine ile sayfa render et
   - res.status(): HTTP status kodu ayarla
   - res.redirect(): Yönlendirme yap

5. SUNUCU YAŞAM DÖNGÜSÜ:
   - Express app oluştur
   - Route'ları tanımla
   - Middleware'leri ekle
   - app.listen() ile sunucuyu başlat
   - İstekleri dinle ve yanıtla

Bu dosya Express.js'in en temel kullanımını gösterir: 
Basit bir "Hello World" sunucusu.
*/

