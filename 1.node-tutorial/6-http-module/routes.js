// 6. HTTP ROUTING (YÖNLENDİRME) SİSTEMİ
// Farklı URL'lere göre farklı sayfalar sunma - basit routing implementasyonu

/*
=== ROUTING NEDİR? ===
Routing, farklı URL'lere gelen istekleri farklı fonksiyonlara yönlendirme işlemidir.
- URL pattern matching
- HTTP method handling (GET, POST, PUT, DELETE)
- Parameter extraction
- Response generation

=== TEMEL ROUTING YAPISI ===
1. URL'i kontrol et
2. Uygun handler'ı bul
3. Response oluştur
4. Status code ayarla

=== HTTP STATUS CODES ===
- 200: OK - İstek başarılı
- 404: Not Found - Sayfa bulunamadı
- 500: Internal Server Error - Sunucu hatası
- 301: Moved Permanently - Kalıcı yönlendirme
- 302: Found - Geçici yönlendirme

=== URL PATTERN MATCHING ===
Exact match: url === "/home"
Wildcard: url.startsWith("/api/")
RegExp: /^\/user\/\d+$/.test(url)
*/

// Node.js'in yerleşik HTTP modülünü içe aktarır
import http from "http";

// HTTP sunucusu oluşturur ve routing (yönlendirme) işlemlerini yapar
const server = http.createServer((req, res) => {
    // Gelen isteğin URL'ini alır (örn: "/", "/projects", "/api/users")
    const url = req.url;
    const method = req.method;
    
    // İstek bilgilerini loglama (development için yararlı)
    console.log(`${method} ${url} - ${new Date().toISOString()}`);
    
    // Ana sayfa için ("/") routing
    if (url === "/") {
        // 200: Başarılı yanıt, HTML formatında content
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`
            <html>
                <head>
                    <title>Ana Sayfa</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Hoş Geldiniz!</h1>
                    <p>Bu basit Node.js web server routing örneğidir.</p>
                    <nav>
                        <ul>
                            <li><a href="/">Ana Sayfa</a></li>
                            <li><a href="/projects">Projeler</a></li>
                            <li><a href="/about">Hakkımızda</a></li>
                        </ul>
                    </nav>
                </body>
            </html>
        `);
        
    // Projeler sayfası için ("/projects") routing
    } else if (url === "/projects") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`
            <html>
                <head>
                    <title>Projeler</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Projelerimiz</h1>
                    <ul>
                        <li>Node.js Web Server</li>
                        <li>REST API Development</li>
                        <li>Database Integration</li>
                    </ul>
                    <a href="/">Ana Sayfaya Dön</a>
                </body>
            </html>
        `);
        
    // Hakkımızda sayfası için ("/about") routing
    } else if (url === "/about") {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`
            <html>
                <head>
                    <title>Hakkımızda</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Hakkımızda</h1>
                    <p>Node.js öğrenim projesi kapsamında oluşturulmuştur.</p>
                    <a href="/">Ana Sayfaya Dön</a>
                </body>
            </html>
        `);
        
    // API endpoint örneği ("/api/status")
    } else if (url === "/api/status") {
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        res.end(JSON.stringify({
            status: "OK",
            message: "Server çalışıyor",
            timestamp: new Date().toISOString(),
            method: method
        }));
        
    // Diğer tüm URL'ler için 404 (Sayfa bulunamadı) hatası
    } else {
        // 404: Sayfa bulunamadı hatası
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`
            <html>
                <head>
                    <title>404 - Sayfa Bulunamadı</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>404 - Sayfa Bulunamadı</h1>
                    <p>Aradığınız sayfa mevcut değil: <strong>${url}</strong></p>
                    <a href="/">Ana Sayfaya Dön</a>
                </body>
            </html>
        `);
    }
});

// Sunucunun dinleyeceği port numarası
const port = 3000;
const hostname = 'localhost';

// Sunucuyu belirtilen portta başlatır
server.listen(port, hostname, () => {
    console.log(`🌐 Server çalışıyor: http://${hostname}:${port}`);
    console.log("Mevcut routes:");
    console.log("- GET /        (Ana sayfa)");
    console.log("- GET /projects (Projeler)");
    console.log("- GET /about   (Hakkımızda)");
    console.log("- GET /api/status (API endpoint)");
});

/*
=== ROUTING GELİŞTİRME İPUÇLARI ===

1. Route Separation:
   Büyük projelerde routes'ları ayrı dosyalarda tutun

2. Middleware Pattern:
   Authentication, logging için middleware kullanın

3. Parameter Extraction:
   URL'den parametre çıkarma: /user/:id

4. Query Parameters:
   URL query string'leri: ?page=1&limit=10

=== EXPRESS.JS ALTERNATİFİ ===
Bu basit routing yerine Express.js framework'ü kullanabilirsiniz:

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Ana sayfa');
});

app.get('/projects', (req, res) => {
    res.send('Projeler');
});

=== MODERN ROUTING ÖZELLİKLERİ ===
✨ Dynamic routing: /user/:id
✨ Middleware support: authentication, validation
✨ HTTP method handling: GET, POST, PUT, DELETE
✨ Route parameters ve query strings
✨ Error handling middleware

=== GÜVENLİK VE PERFORMANS ===
🔒 Input validation yapın
🔒 Rate limiting implementasyonu
🔒 CORS policy ayarları
🔒 XSS protection
📈 Response caching
📈 Gzip compression

=== TEST ETME ===
- Browser'da farklı URL'leri deneyin
- Postman/Insomnia ile API endpoint'leri test edin
- curl komutları: curl http://localhost:3000/api/status
*/ 