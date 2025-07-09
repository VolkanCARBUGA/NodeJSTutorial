// 6. HTTP MODÜLÜ İLE WEB SUNUCUSU
// Node.js ile basit web server oluşturma ve HTTP protokolü

/*
=== HTTP MODÜLÜ NEDİR? ===
Node.js'in yerleşik HTTP modülü web sunucusu oluşturmak için kullanılır.
- HTTP protokolü desteği
- Request (istek) ve Response (yanıt) yönetimi
- Web server ve client işlemleri
- TCP socket üzerinde çalışır

=== WEB SUNUCUSU KAVRAMLARI ===
Server: İstekleri dinleyen ve yanıt veren program
Client: İstek gönderen taraf (browser, mobile app)
Port: Sunucunun dinlediği sayısal adres (3000, 8080, 443)
HTTP: HyperText Transfer Protocol (web iletişim protokolü)

=== REQUEST-RESPONSE CYCLE ===
1. Client istek gönderir (HTTP Request)
2. Server isteği işler
3. Server yanıt döndürür (HTTP Response)
4. Connection kapanabilir veya açık kalabilir

=== HTTP STATUS CODES ===
- 200: OK (Başarılı)
- 404: Not Found (Bulunamadı)
- 500: Internal Server Error (Sunucu hatası)
- 301/302: Redirect (Yönlendirme)
*/

// Node.js'in yerleşik HTTP modülünü içe aktarır
import http from "http"; // ES6 import syntax ile built-in HTTP modülü

// HTTP sunucusu oluşturur - her gelen istek için callback fonksiyonu çalışır
// req: Gelen istek (request) nesnesi - kullanıcının gönderdiği veriler
// res: Yanıt (response) nesnesi - sunucunun göndereceği cevap
const server = http.createServer((req, res) => {
    // İstek bilgilerini konsola yazdırır (debugging için)
    console.log("Yeni istek geldi!");
    console.log("URL:", req.url);
    console.log("Method:", req.method);
    console.log("Headers:", req.headers);
    
    // HTTP yanıt başlığını ayarlar:
    // 200: Başarılı durum kodu (OK)
    // Content-Type: Gönderilecek içeriğin tipini belirtir
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8" // UTF-8 Türkçe karakter desteği
    });
    
    // Yanıtı bitirir ve kullanıcıya HTML içerik gönderir
    res.end(`
        <html>
            <head>
                <title>Node.js Web Server</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Merhaba Dünya!</h1>
                <p>Bu Node.js HTTP modülü ile oluşturulmuş basit bir web sunucusudur.</p>
                <p>İstek URL'i: ${req.url}</p>
                <p>İstek Method: ${req.method}</p>
                <p>Zaman: ${new Date().toLocaleString('tr-TR')}</p>
            </body>
        </html>
    `);
});

// Sunucunun dinleyeceği port numarası
const port = 3000;
const hostname = 'localhost';

// Sunucuyu belirtilen portta başlatır
// Callback fonksiyonu sunucu başladığında çalışır
server.listen(port, hostname, () => {
    console.log(`🚀 Server çalışıyor: http://${hostname}:${port}`);
    console.log("Durdurmak için Ctrl+C yapın");
});

// Hata yönetimi - sunucu hataları için
server.on('error', (err) => {
    console.error('Sunucu hatası:', err);
});

/*
=== REQUEST OBJECT (req) ÖZELLİKLERİ ===
- req.url: İstenen URL (/home, /about)
- req.method: HTTP method (GET, POST, PUT, DELETE)
- req.headers: HTTP başlıkları
- req.query: URL query parametreleri (?name=value)

=== RESPONSE OBJECT (res) METODLARI ===
- res.writeHead(): HTTP status ve headers ayarlar
- res.write(): Partial içerik gönderir
- res.end(): Yanıtı bitirir ve gönderir
- res.setHeader(): Tek header ayarlar

=== CONTENT-TYPE ÖRNEKLERİ ===
- text/html: HTML sayfaları
- application/json: JSON veriler
- text/plain: Düz metin
- image/jpeg: JPEG görseller

=== PORT YÖNETİMİ ===
📌 Port 1-1023 arasında admin yetkisi gerekir
📌 Port 3000-8000 arası development için uygundur
📌 Production'da 80 (HTTP) veya 443 (HTTPS) kullanılır

=== GELİŞTİRME İPUÇLARI ===
✨ Nodemon ile otomatik restart: npm install -g nodemon
✨ Browser'da http://localhost:3000 adresini ziyaret edin
✨ Network tab'ından request/response detaylarını inceleyin
✨ Different endpoints için routing implementasyonu gerekir

=== PRODUCTION HAZIRLIĞI ===
🔧 Express.js framework kullanın (routing, middleware)
🔧 HTTPS sertifikası ekleyin
🔧 Rate limiting implementasyonu
🔧 Error handling middleware
🔧 Logging sistemi ekleyin
*/