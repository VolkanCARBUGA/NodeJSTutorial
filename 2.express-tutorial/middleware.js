// Express.js framework'ünü ES6 module syntax ile import ediyoruz
import express from "express";

// Express uygulaması örneğini oluşturuyoruz
const app = express();

//define middleware function - Middleware fonksiyonu tanımlama
// Middleware: İstek (request) ve yanıt (response) arasında çalışan ara fonksiyonlar
// Bu fonksiyon her HTTP isteğinde otomatik olarak çalışacaktır
const myFirstMiddleware = (req, res, next) => {
    // Konsola basit bir mesaj yazdırır - debugging ve izleme amacıyla
    console.log("Middleware function called");
    
    // next() fonksiyonu MUTLAKA çağrılmalıdır
    // Bu, işlemi bir sonraki middleware'e veya route handler'a aktarır
    // Eğer next() çağrılmazsa, istek askıda kalır ve yanıt gönderilmez
    next();
};

// Tanımladığımız middleware'i uygulamaya kaydediyoruz
// app.use() - Global middleware kaydı
// Bu middleware BÜTÜN route'larda (/, /about, /contact) çalışacaktır
app.use(myFirstMiddleware);

// ANA SAYFA ROUTE HANDLER'I
// "/" path'ine gelen GET isteklerini işler
// Middleware çalıştıktan SONRA bu fonksiyon çağrılır
app.get("/", (req, res) => {
    // Basit string yanıtı gönderir
    res.send("Home page");
});

// HAKKIMIZDA SAYFASI ROUTE HANDLER'I
// "/about" path'ine gelen GET isteklerini işler
app.get("/about", (req, res) => {
    res.send("About page");
});

// İLETİŞİM SAYFASI ROUTE HANDLER'I
// "/contact" path'ine gelen GET isteklerini işler
app.get("/contact", (req, res) => {
    res.send("Contact page");
});

// Port numarasını tanımlıyoruz
const PORT = 3000;

// Sunucuyu belirtilen port'ta başlatıyoruz
app.listen(PORT, () => {
    // Sunucu başarıyla başladığında konsola bilgi mesajı yazdırır
    console.log(`Server is running on port ${PORT}`);
});

/*
MİDDLEWARE TEMEL KAVRAMLARI:

1. MİDDLEWARE NEDİR?
   - HTTP istek-yanıt döngüsünde ara katman
   - İstek gelir → Middleware çalışır → Route handler çalışır → Yanıt gönderilir
   - Birden fazla middleware zincirleme şekilde çalışabilir

2. MİDDLEWARE FONKSİYON YAPISI:
   - 3 parametre: (req, res, next)
   - req: HTTP isteği bilgileri (headers, body, params vb.)
   - res: HTTP yanıtı gönderme metodları (send, json, status vb.)
   - next: Sonraki middleware/handler'a geçiş fonksiyonu

3. ÇALIŞMA SIRASI:
   - Middleware'ler tanımlandıkları sırayla çalışır
   - Önce middleware → Sonra route handler
   - next() çağrılmazsa zincirleme durur

4. KULLANIM ALANLARI:
   - Logging (günlük tutma)
   - Authentication (kimlik doğrulama) 
   - Authorization (yetkilendirme)
   - Body parsing (veri ayrıştırma)
   - Error handling (hata yönetimi)
   - Security (güvenlik kontrolü)

5. MİDDLEWARE TÜRLERİ:
   - Application-level middleware (uygulama seviyesi)
   - Router-level middleware (route seviyesi)
   - Error-handling middleware (hata yakalama)
   - Built-in middleware (yerleşik)
   - Third-party middleware (üçüncü parti)

Bu basit örnek, middleware'in temel çalışma prensibini gösterir.
Her istek geldiğinde konsola mesaj yazdırır, sonra normal route işlemine devam eder.
*/
