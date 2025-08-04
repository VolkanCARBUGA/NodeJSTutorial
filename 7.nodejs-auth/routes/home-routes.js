/*
==========================================================================
HOME ROUTES - ANA SAYFA YÖNLENDİRME MODÜLÜ
==========================================================================
Bu dosya kimlik doğrulaması gerektiren ana sayfa endpoint'lerini tanımlar.
Express Router kullanarak korumalı route'ları authMiddleware ile birlikte yapılandırır.
Sadece geçerli JWT token'a sahip kullanıcılar bu endpoint'lere erişebilir.
==========================================================================
*/

// Express framework'ünü import ediyoruz
const express = require('express');

// Express Router instance'ı oluşturuyoruz
const router = express.Router();

// Authentication middleware'i import ediyoruz
// Bu middleware JWT token doğrulama işlemlerini gerçekleştirir
const authMiddleware = require('../middleware/auth-middleware');

/*
==========================================================================
KORUNMUŞ HOME ROUTE TANIMLARI
==========================================================================
Tüm route'lar authentication gerektiren ana sayfa işlemleri ile ilgilidir
Base URL: /api/home (server.js'te tanımlandı)
*/

// HOŞ GELDİN SAYFASI - GET /api/home/welcome
// Bu endpoint kimlik doğrulaması gerektiren ana sayfa işlevselliği sağlar
// HTTP Method: GET, Path: /welcome, Middleware: authMiddleware, Handler: inline function
router.get('/welcome',authMiddleware,(req,res)=>{
    // authMiddleware tarafından req.userInfo'ya eklenen kullanıcı bilgilerini destructuring ile alıyoruz
    // Bu bilgiler JWT token'dan decode edilmiştir
    const {userName,userId,role} = req.userInfo;
    
    // Başarılı response - kullanıcı bilgileri ile hoş geldin mesajı
    res.json({
        message:'Welcome to the home page',        // Ana sayfa hoş geldin mesajı
        user:{                                     // Kullanıcı bilgileri objesi
            userName,                              // Kullanıcı adı
            userId,                                // Kullanıcı benzersiz ID'si
            role                                   // Kullanıcı rolü (user/admin)
        }
    });
});

// Router'ı dışa aktarıyoruz - server.js'te import edilecek
module.exports = router;

/*
==========================================================================
HOME PAGE ENDPOINT DETAYLARI
==========================================================================

Base URL: http://localhost:3000/api/home

ENDPOINT: GET /welcome
- URL: GET /api/home/welcome
- Authentication: Required (JWT Token)
- Authorization: User level (role: 'user' or 'admin')

REQUEST FORMAT:
GET /api/home/welcome
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SUCCESS RESPONSE (200):
{
  "message": "Welcome to the home page",
  "user": {
    "userName": "johndoe",
    "userId": "507f1f77bcf86cd799439011", 
    "role": "user"
  }
}

ERROR RESPONSES:

401 Unauthorized (No Token):
{
  "success": false,
  "message": "No token provided"
}

401 Unauthorized (Invalid Token):
{
  "success": false,
  "message": "Invalid token"
}

==========================================================================
MIDDLEWARE CHAIN AKIŞI
==========================================================================

Request Flow:
1. HTTP GET isteği gelir → /api/home/welcome
2. authMiddleware çalışır:
   - Authorization header kontrol edilir
   - JWT token çıkarılır
   - Token doğrulanır
   - req.userInfo'ya kullanıcı bilgileri eklenir
3. Route handler çalışır:
   - req.userInfo'dan kullanıcı bilgileri alınır
   - Response oluşturulur ve gönderilir

Middleware Sırası:
router.get('/welcome', authMiddleware, handlerFunction)
                      ↑              ↑
                      1. Auth check  2. Business logic

==========================================================================
AUTHENTICATION REQUİREMENTS
==========================================================================

TOKEN GEREKSİNİMLERİ:
- Geçerli JWT token
- Süresi dolmamış token
- Doğru secret key ile imzalanmış
- Bearer format'ında header'da gönderilmiş

USER İNFO PAYLOAD:
Token'dan çıkarılan ve req.userInfo'ya eklenen bilgiler:
- userId: MongoDB ObjectId
- userName: Kullanıcı adı
- role: Kullanıcı rolü ('user' veya 'admin')

==========================================================================
GÜVENLİK ÖZELLİKLERİ
==========================================================================

1. TOKEN BASED AUTHENTICATION:
   - Stateless authentication
   - JWT ile secure iletişim
   - Session storage gerektirmez

2. PROTECTED ROUTES:
   - Middleware ile route protection
   - Automatic token validation
   - User context injection

3. ROLE AGNOSTIC:
   - Bu route hem 'user' hem 'admin' kullanabilir
   - Role kontrolü yapılmaz
   - Basic authentication yeterli

==========================================================================
KULLANIM ÖRNEĞİ - CURL KOMUTU
==========================================================================

1. İlk önce login olup token alın:
   curl -X POST http://localhost:3000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"userName":"johndoe","password":"test123"}'

2. Dönen token'ı kullanarak home endpoint'ine erişin:
   curl -X GET http://localhost:3000/api/home/welcome \
   -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

==========================================================================
FRONTEND ENTEGRASYONu
==========================================================================

JavaScript örneği:
```javascript
// Token'ı localStorage'dan al
const token = localStorage.getItem('authToken');

// API çağrısı
fetch('/api/home/welcome', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Welcome message:', data.message);
  console.log('User info:', data.user);
});
```

Bu route modülü, korumalı ana sayfa işlevselliği sağlar.
==========================================================================
*/