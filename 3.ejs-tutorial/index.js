// Express web framework'ünü require ile dahil ediyoruz (CommonJS syntax)
const express = require("express");
// Path modülünü dahil ediyoruz - dosya yolları ile çalışmak için
const path = require("path");

// Express uygulaması oluşturuyoruz
const app=express();
// Sunucunun çalışacağı port numarasını belirliyoruz
const PORT=3000;

// View engine'i EJS olarak ayarlıyoruz - HTML template'leri için
app.set("view engine", "ejs");
// Views klasörünün yolunu belirtiyoruz - EJS dosyalarının bulunduğu yer
app.set("views", path.join(__dirname, "views"));

// Örnek ürün verileri - gerçek uygulamada bu veriler veritabanından gelir
const products = [
    {id: 1, name: "Product 1", price: 100},
    {id: 2, name: "Product 2", price: 200},
    {id: 3, name: "Product 3", price: 300},
];

// Ana sayfa route'u - GET "/" isteği geldiğinde çalışır
app.get("/", (req, res) => {
    // home.ejs template'ini render eder ve verileri gönderir
    res.render("home", {title: "Home Page", products:products});
});

// Hakkımızda sayfası route'u - GET "/about" isteği geldiğinde çalışır
app.get("/about", (req, res) => {
    // about.ejs template'ini render eder ve title verisini gönderir
    res.render("about", {title: "About Page"});
});

// Sunucuyu başlatır ve belirtilen portta dinlemeye başlar
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
EJS (Embedded JavaScript) Tutorial Konusu:

Bu proje EJS template engine'nin kullanımını gösterir:
- EJS, HTML içerisinde JavaScript kodu yazmamızı sağlar
- Server-side rendering yapar (SSR)
- Template'lere veri gönderebiliriz (res.render ile)
- Component sistemi ile tekrar kullanılabilir parçalar oluşturabiliriz
- Dynamic content oluşturmak için ideal bir çözümdür
- Express.js ile kolayca entegre olur
*/
