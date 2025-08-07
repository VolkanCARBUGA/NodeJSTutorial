/*
==========================================================================
NODE.JS AUTHENTİCATİON API - ANA SUNUCU DOSYASI
==========================================================================
Bu dosya kullanıcı kimlik doğrulama API'sinin ana sunucu yapılandırmasını içerir.
JWT (JSON Web Token) tabanlı authentication sistemi sağlar.
Kullanıcı kaydı, girişi ve yetkilendirme işlemlerini yönetir.
==========================================================================
*/

// Çevre değişkenlerini .env dosyasından yüklemek için dotenv konfigürasyonu
// JWT_SECRET, MONGO_URL, PORT gibi hassas bilgiler .env'de saklanır
require('dotenv').config();

// Express.js web framework'ünü CommonJS ile import ediyoruz
const express=require('express');

// Veritabanı bağlantı fonksiyonunu import ediyoruz
const connectDB=require('./database/db');

// Route modüllerini import ediyoruz - her biri farklı endpoint grubu
const authRoutes=require('./routes/auth-routes');         // Kimlik doğrulama route'ları (login, register)
const homeRoutes=require('./routes/home-routes');         // Ana sayfa route'ları (korumalı)
const adminRoutes=require('./routes/admin-routes');       // Admin route'ları (yüksek yetki gerektiren)
const imageRoutes=require('./routes/image-routes');       // Image route'ları (resim yükleme)

// Veritabanına bağlantı kuruyoruz - uygulama başlatılmadan önce
connectDB();

// Express uygulaması oluşturuyoruz - ana uygulama objesi
const app=express();

// Port numarasını çevre değişkeninden alıyoruz, yoksa 3000 kullanıyoruz
// Production ortamında platform (Heroku, Vercel vb.) port belirler
const port=process.env.PORT || 3000;

/*
==========================================================================
MİDDLEWARE YAPILANDIRMASI
==========================================================================
*/

// JSON middleware - gelen POST/PUT isteklerindeki JSON verileri parse eder
// req.body'de JSON verilere erişmemizi sağlar (kullanıcı kaydı, girişi için gerekli)
app.use(express.json());

/*
==========================================================================
ROUTE YAPILANDIRMASI
==========================================================================
*/

// Authentication route'larını /api/auth prefix'i ile bağlıyoruz
// /api/auth/register, /api/auth/login endpoint'leri buradan gelir
app.use('/api/auth',authRoutes);

// Ana sayfa route'larını /api/home prefix'i ile bağlıyoruz  
// Kimlik doğrulaması gerektiren genel kullanıcı endpoint'leri
app.use('/api/home',homeRoutes);

// Admin route'larını /api/admin prefix'i ile bağlıyoruz
// Sadece admin yetkisine sahip kullanıcılar erişebilir
app.use('/api/admin',adminRoutes);

// Image route'larını /api/image prefix'i ile bağlıyoruz
// Sadece admin yetkisine sahip kullanıcılar erişebilir
app.use('/api/image',imageRoutes);

// Sunucuyu belirtilen port'ta dinlemeye başlatıyoruz
// Callback fonksiyonu sunucu başarıyla başladığında çalışır
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

/*
==========================================================================
API ENDPOİNT YAPISI
==========================================================================

AUTHENTICATION ENDPOİNTLERİ:
- POST /api/auth/register  - Yeni kullanıcı kaydı
- POST /api/auth/login     - Kullanıcı girişi (JWT token alımı)

HOME ENDPOİNTLERİ (Auth Required):
- GET /api/home/welcome    - Hoş geldin sayfası (kimlik doğrulama gerekli)

ADMIN ENDPOİNTLERİ (Auth + Admin Role Required):
- GET /api/admin/welcome   - Admin paneli (admin yetkisi gerekli)

==========================================================================
GÜVENLİK ÖZELLİKLERİ
==========================================================================

1. JWT TOKEN AUTHENTICATION:
   - Bearer token ile kimlik doğrulama
   - Token'lar 15 dakika geçerli
   - Stateless authentication

2. ROLE-BASED ACCESS CONTROL:
   - User: Genel kullanıcı yetkisi
   - Admin: Yönetici yetkisi

3. PASSWORD SECURITY:
   - bcrypt ile şifre hash'leme
   - Salt rounds: 10

4. ENVIRONMENT VARIABLES:
   - Hassas bilgiler .env dosyasında
   - JWT secret güvenli şekilde saklanır

==========================================================================
KULLANILAN TEKNOLOJİLER
==========================================================================
- Express.js: Web framework
- MongoDB: NoSQL veritabanı  
- Mongoose: MongoDB ODM
- JWT: Token tabanlı authentication
- bcrypt: Şifre hash'leme
- dotenv: Çevre değişkeni yönetimi

Bu sunucu, güvenli bir kullanıcı kimlik doğrulama sistemi sağlar.
==========================================================================
*/