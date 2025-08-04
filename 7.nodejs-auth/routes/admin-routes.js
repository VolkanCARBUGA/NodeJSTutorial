/*
==========================================================================
ADMIN ROUTES - YÖNETİCİ YÖNLENDİRME MODÜLÜ
==========================================================================
Bu dosya admin yetkisi gerektiren endpoint'leri tanımlar.
Express Router kullanarak yüksek güvenlikli route'ları hem authMiddleware
hem de isAdminUser middleware'i ile korur. Sadece admin rolündeki
kullanıcılar bu endpoint'lere erişebilir.
==========================================================================
*/

// Express framework'ünü import ediyoruz
const express = require('express');

// Express Router instance'ı oluşturuyoruz
const router=express.Router();

// Authentication middleware'i import ediyoruz - JWT token doğrulama için
const authMiddleware=require('../middleware/auth-middleware');

// Admin authorization middleware'i import ediyoruz - admin rolü kontrolü için
const isAdminUser=require('../middleware/admin-middleware');

/*
==========================================================================
ADMIN ROUTE TANIMLARI
==========================================================================
Tüm route'lar admin yetkisi gerektiren işlemler ile ilgilidir
Base URL: /api/admin (server.js'te tanımlandı)
*/

// ADMIN PANEL HOŞ GELDİN SAYFASI - GET /api/admin/welcome
// Bu endpoint en yüksek güvenlik seviyesi gerektirir (Authentication + Admin Authorization)
// HTTP Method: GET, Path: /welcome
// Middleware Chain: authMiddleware → isAdminUser → handler function
router.get('/welcome',authMiddleware,isAdminUser,(req,res)=>{
   // Admin kullanıcısı için özel hoş geldin mesajı
   // Bu noktaya sadece geçerli token + admin rolü olan kullanıcılar ulaşabilir
   res.json({
        message:'Welcome to the admin page',       // Admin paneli hoş geldin mesajı
   });
});

// Router'ı dışa aktarıyoruz - server.js'te import edilecek
module.exports = router;

/*
==========================================================================
ADMIN ENDPOINT DETAYLARI
==========================================================================

Base URL: http://localhost:3000/api/admin

ENDPOINT: GET /welcome
- URL: GET /api/admin/welcome
- Authentication: Required (JWT Token)
- Authorization: Admin level (role: 'admin' ONLY)

REQUEST FORMAT:
GET /api/admin/welcome
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SUCCESS RESPONSE (200):
{
  "message": "Welcome to the admin page"
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

403 Forbidden (Non-Admin User):
{
  "success": false,
  "message": "Access denied for non-admin users"
}

==========================================================================
DOUBLE MIDDLEWARE PROTECTION
==========================================================================

Bu route iki aşamalı güvenlik kullanır:

MIDDLEWARE CHAIN:
router.get('/welcome', authMiddleware, isAdminUser, handlerFunction)
                       ↑              ↑             ↑
                       1. Auth check  2. Role check 3. Business logic

AŞAMA 1 - Authentication (authMiddleware):
- JWT token varlığı kontrol edilir
- Token geçerliliği doğrulanır  
- Token decode edilir
- req.userInfo'ya kullanıcı bilgileri eklenir
- BAŞARILI: next() ile devam eder
- BAŞARISIZ: 401 Unauthorized döner

AŞAMA 2 - Authorization (isAdminUser):
- req.userInfo.role kontrol edilir
- Role === 'admin' kontrolü yapılır
- BAŞARILI (admin): next() ile devam eder
- BAŞARISIZ (user): 403 Forbidden döner

AŞAMA 3 - Business Logic (handler):
- Sadece admin kullanıcılar bu noktaya ulaşır
- Admin'e özel işlemler gerçekleştirilir

==========================================================================
ACCESS CONTROL MATRIX
==========================================================================

ENDPOINT ACCESS PERMISSION:

/api/auth/register     → Herkese açık (No auth)
/api/auth/login        → Herkese açık (No auth)
/api/home/welcome      → Auth required (user OR admin)  
/api/admin/welcome     → Auth + Admin required (admin ONLY)

KULLANICI ROL BAZLI ERİŞİM:

| Endpoint           | No Auth | User Role | Admin Role |
|--------------------|---------|-----------|------------|
| /auth/register     |   ✅    |    ✅     |     ✅     |
| /auth/login        |   ✅    |    ✅     |     ✅     |
| /home/welcome      |   ❌    |    ✅     |     ✅     |
| /admin/welcome     |   ❌    |    ❌     |     ✅     |

==========================================================================
GÜVENLİK ÖZELLİKLERİ
==========================================================================

1. LAYERED SECURITY:
   - Authentication layer (JWT)
   - Authorization layer (Role)
   - Business logic layer

2. PRINCIPLE OF LEAST PRIVILEGE:
   - Admin işlemleri sadece admin'lere açık
   - Role-based access control (RBAC)
   - Granular permission system

3. SECURE ERROR HANDLING:
   - Spesifik hata mesajları
   - HTTP status code standards
   - Security audit trail

4. TOKEN SECURITY:
   - JWT with expiry (15m)
   - Secret key validation
   - Stateless authentication

==========================================================================
PRODUCTION CONSIDERATIONS
==========================================================================

1. AUDIT LOGGING:
   Admin işlemlerinin loglanması:
   ```javascript
   router.get('/welcome', authMiddleware, isAdminUser, (req, res) => {
     console.log(`Admin access: ${req.userInfo.userName} at ${new Date()}`);
     res.json({message: 'Welcome to the admin page'});
   });
   ```

2. RATE LIMITING:
   Admin endpoint'ler için rate limiting:
   ```javascript
   const rateLimit = require('express-rate-limit');
   const adminLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each admin to 100 requests per windowMs
   });
   router.use(adminLimiter);
   ```

3. IP WHITELISTING:
   Admin işlemleri için IP kısıtlaması

4. MULTI-FACTOR AUTHENTICATION:
   Admin hesapları için 2FA requirement

==========================================================================
KULLANIM ÖRNEĞİ - CURL KOMUTU
==========================================================================

1. Admin kullanıcı ile login olun:
   curl -X POST http://localhost:3000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"userName":"admin_user","password":"admin_pass"}'

2. Dönen token ile admin endpoint'ine erişin:
   curl -X GET http://localhost:3000/api/admin/welcome \
   -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"

Bu route modülü, en yüksek güvenlik seviyesinde admin işlemleri sağlar.
==========================================================================
*/