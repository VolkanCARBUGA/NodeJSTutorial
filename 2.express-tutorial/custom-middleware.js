// Express.js framework'ünü import ediyoruz
import express from "express";

// Express uygulaması örneğini oluşturuyoruz
const app = express();

// Port numarasını sabit olarak tanımlıyoruz
const PORT = 3000;

// ÖZEL MİDDLEWARE FONKSİYONU TANIMI
// Middleware - her HTTP isteğinde çalışan ara fonksiyonlardır
// İstek geldiğinde otomatik olarak çalışır ve işlemi bir sonraki middleware'e aktarır
const requestTimestampLogger = (req, res, next) => {
    // Mevcut zamanı ISO string formatında alıyoruz
    // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ (2024-01-15T10:30:45.123Z)
    const timestamp = new Date().toISOString();
    
    // Konsola timestamp, HTTP metodu ve URL'i yazdırıyoruz
    // req.method - HTTP metodu (GET, POST, PUT, DELETE vb.)
    // req.url - İstek yapılan URL path'i
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    
    // next() - işlemi bir sonraki middleware'e veya route handler'a aktarır
    // Bu fonksiyon çağrılmazsa istek askıda kalır ve yanıt gönderilmez
    next();
}

// Özel middleware'imizi uygulamaya kaydediyoruz
// app.use() - middleware'i global olarak tüm route'lara uygular
// Bu middleware BÜTÜN isteklerde çalışacaktır
app.use(requestTimestampLogger);

// ANA SAYFA ROUTE'U
// "/" path'ine gelen GET isteklerini işler
app.get("/", (req, res) => {
    // Basit metin yanıtı gönderir
    res.send("Home page");
});

// HAKKIMIZDA SAYFASI ROUTE'U
// "/about" path'ine gelen GET isteklerini işler
app.get("/about", (req, res) => {
    res.send("About page");
});

// İLETİŞİM SAYFASI ROUTE'U
// "/contact" path'ine gelen GET isteklerini işler
app.get("/contact", (req, res) => {
    res.send("Contact page");
});

// SERVERİ BAŞLATMA
// Belirlenen port'ta sunucuyu dinlemeye başlar
app.listen(PORT, () => {
    // Sunucu başarıyla başladığında konsola mesaj yazdırır
    console.log(`Server is running on port ${PORT}`);
});

/*
ÖZEL MİDDLEWARE (CUSTOM MIDDLEWARE) KAVRAMI:

1. MİDDLEWARE NEDİR?
   - İstek-yanıt döngüsünde ara katman görevi gören fonksiyonlar
   - Her HTTP isteğinde otomatik olarak çalışır
   - İsteği işleyip sonraki aşamaya aktarır

2. ÖZEL MİDDLEWARE YAZIMI:
   - 3 parametre alır: (req, res, next)
   - req: HTTP isteği bilgileri
   - res: HTTP yanıtı gönderme araçları
   - next: Bir sonraki middleware'e geçme fonksiyonu

3. MİDDLEWARE KULLANIM ALANLARI:
   - Loglama (bu örnekteki gibi)
   - Kimlik doğrulama (authentication)
   - Yetkilendirme (authorization)
   - Veri validasyonu
   - Hata yakalama
   - CORS ayarları
   - Body parsing

4. SIRALAMAYA DİKKAT:
   - Middleware'ler tanımlandıkları sırayla çalışır
   - app.use() route'lardan ÖNCE tanımlanmalı
   - next() çağrılmazsa istek askıda kalır

Bu örnek, her gelen isteğin tarih/saat damgası ile loglanmasını sağlar.
*/
