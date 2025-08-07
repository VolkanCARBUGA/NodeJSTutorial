/*
==========================================================================
AUTHENTICATION ROUTES - KİMLİK DOĞRULAMA YÖNLENDİRME MODÜLÜ
==========================================================================
Bu dosya kullanıcı authentication işlemleri için HTTP route'larını tanımlar.
Express Router kullanarak register ve login endpoint'lerini
auth-controller'daki ilgili fonksiyonlara bağlar.
==========================================================================
*/

// Express framework'ünü import ediyoruz
const express = require('express');

// Express Router instance'ı oluşturuyoruz
// Router, route'ları gruplamak ve modüler hale getirmek için kullanılır
const router = express.Router();

// Auth controller'dan authentication fonksiyonlarını destructuring ile alıyoruz
// Bu fonksiyonlar HTTP isteklerini işleyecek
const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');

/*
==========================================================================
AUTHENTICATION ROUTE TANIMLARI
==========================================================================
Tüm route'lar authentication işlemleri ile ilgilidir
Base URL: /api/auth (server.js'te tanımlandı)
*/

// KULLANICI KAYIT ROUTE'U - POST /api/auth/register
// HTTP Method: POST, Path: /register, Handler: registerUser
// Yeni kullanıcı hesabı oluşturmak için kullanılır
// Request body'de userName, email, password, role (opsiyonel) beklenir
router.post('/register', registerUser);

// KULLANICI GİRİŞ ROUTE'U - POST /api/auth/login  
// HTTP Method: POST, Path: /login, Handler: loginUser
// Mevcut kullanıcının sisteme girişi için kullanılır
// Request body'de userName, password beklenir
// Başarılı girişte JWT token döndürür
router.post('/login', loginUser);

// KULLANICI ŞİFRESİ DEĞİŞTİRME ROUTE'U - POST /api/auth/change-password
// HTTP Method: POST, Path: /change-password, Handler: changePassword
// Mevcut kullanıcının şifresini değiştirmek için kullanılır
// Request body'de oldPassword, newPassword beklenir
router.post('/change-password', authMiddleware, changePassword);

// Router'ı dışa aktarıyoruz - server.js'te import edilecek
module.exports = router;

/*
==========================================================================
AUTHENTICATION API ENDPOINT LİSTESİ  
==========================================================================

Base URL: http://localhost:3000/api/auth

1. POST /register             - Yeni kullanıcı kaydı
2. POST /login                - Kullanıcı girişi

==========================================================================
ENDPOINT DETAYLARI
==========================================================================

1. REGISTER ENDPOINT:
   URL: POST /api/auth/register
   
   Request Body:
   {
     "userName": "johndoe",
     "email": "john@example.com",
     "password": "securePassword123",
     "role": "user"                    // Opsiyonel (varsayılan: "user")
   }
   
   Success Response (201):
   {
     "message": "User registered successfully",
     "user": {
       "_id": "507f1f77bcf86cd799439011",
       "userName": "johndoe",
       "email": "john@example.com",
       "role": "user",
       "createdAt": "2024-01-15T10:30:00.000Z"
     }
   }
   
   Error Response (400):
   {
     "success": false,
     "message": "User already exists"
   }

2. LOGIN ENDPOINT:
   URL: POST /api/auth/login
   
   Request Body:
   {
     "userName": "johndoe",
     "password": "securePassword123"
   }
   
   Success Response (200):
   {
     "success": true,
     "message": "Login successful",
     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "_id": "507f1f77bcf86cd799439011",
       "userName": "johndoe",
       "email": "john@example.com",
       "role": "user"
     }
   }
   
   Error Response (401):
   {
     "success": false,
     "message": "Invalid credentials"
   }

==========================================================================
AUTHENTICATION FLOW
==========================================================================

1. KAYIT İŞLEMİ:
   - POST /api/auth/register
   - Kullanıcı bilgileri alınır
   - Şifre hash'lenir
   - Veritabanına kaydedilir
   - Başarı mesajı döndürülür

2. GİRİŞ İŞLEMİ:
   - POST /api/auth/login
   - Kullanıcı bilgileri doğrulanır
   - JWT token oluşturulur
   - Token ve kullanıcı bilgileri döndürülür

3. KORUNMUŞ ENDPOİNT ERİŞİMİ:
   - Authorization header'ında Bearer token gönderilir
   - Middleware token'ı doğrular
   - İşlem devam eder

==========================================================================
GÜVENLİK ÖNLEMLERİ
==========================================================================

1. PASSWORD SECURITY:
   - bcrypt ile hash'leme
   - Salt rounds: 10
   - Plain text şifre asla saklanmaz

2. JWT TOKEN:
   - 15 dakika geçerlilik süresi
   - Secret key ile imzalama
   - Secure payload (hassas bilgi yok)

3. VALIDATION:
   - Unique userName/email kontrolü
   - Required field validation
   - Mongoose schema validation

4. ERROR HANDLING:
   - Spesifik hata mesajları
   - HTTP status codes
   - Try-catch blokları

==========================================================================
KULLANIM ÖRNEĞİ - CURL KOMUTLARI
==========================================================================

1. Kullanıcı Kaydı:
   curl -X POST http://localhost:3000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"userName":"johndoe","email":"john@example.com","password":"test123"}'

2. Kullanıcı Girişi:
   curl -X POST http://localhost:3000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"userName":"johndoe","password":"test123"}'

Bu route modülü, güvenli authentication sistemi sağlar.
==========================================================================
*/