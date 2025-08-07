/*
==========================================================================
IMAGE ROUTES - RESİM YÖNLENDİRME MODÜLÜ
==========================================================================
Bu dosya resim yönetimi için gerekli HTTP endpoint'lerini tanımlar.
Resim yükleme, listeleme ve silme işlemlerini yöneten route'ları içerir.
Authentication ve authorization middleware'leri ile güvenlik sağlar.
==========================================================================
*/

// Express framework'ünü import ediyoruz
const express = require('express');

// Authentication middleware'i import ediyoruz - JWT token doğrulama için
const authMiddleware = require('../middleware/auth-middleware');

// Admin yetkilendirme middleware'i import ediyoruz - admin kontrolü için
const isAdminUser = require('../middleware/admin-middleware');

// Dosya yükleme middleware'i import ediyoruz - multer konfigürasyonu için
const uploadMiddleware = require('../middleware/upload-middleware');

// Image controller fonksiyonlarını import ediyoruz - business logic için
const {uploadImage, fetchImages, deleteImage} = require('../controllers/image-controller');

// Express Router instance'ı oluşturuyoruz
const router = express.Router();

/*
==========================================================================
RESİM YÖNETİM ROUTE TANIMLARI
==========================================================================
Base URL: /api/images (server.js'te tanımlandı)
Tüm route'lar authentication ve/veya authorization gerektiren resim işlemleri ile ilgilidir
*/

// RESİM YÜKLEME ROUTE'U - POST /api/images/upload
// HTTP Method: POST, Path: /upload
// Middleware Chain: authMiddleware → isAdminUser → uploadMiddleware.single('image') → uploadImage
// Sadece admin kullanıcılar resim yükleyebilir
router.post('/upload', authMiddleware, isAdminUser, uploadMiddleware.single('image'), uploadImage);

// RESİMLERİ LİSTELEME ROUTE'U - GET /api/images/fetch  
// HTTP Method: GET, Path: /fetch
// Middleware Chain: authMiddleware → fetchImages
// Tüm authenticated kullanıcılar resimleri görüntüleyebilir (user + admin)
router.get('/fetch', authMiddleware, fetchImages);

// RESİM SİLME ROUTE'U - DELETE /api/images/delete/:imageId
// HTTP Method: DELETE, Path: /delete/:imageId
// Middleware Chain: authMiddleware → isAdminUser → deleteImage  
// Sadece admin kullanıcılar resim silebilir (kendi yükledikleri resimleri)
router.delete('/delete/:imageId', authMiddleware,isAdminUser, deleteImage);

// Router'ı dışa aktarıyoruz - server.js'te import edilecek
module.exports = router;

/*
==========================================================================
RESİM API ENDPOINT DETAYLARI
==========================================================================

Base URL: http://localhost:3000/api/images

1. RESİM YÜKLEME ENDPOINT:
   URL: POST /api/images/upload
   Authentication: Required (JWT Token)
   Authorization: Admin level (role: 'admin' ONLY)
   Content-Type: multipart/form-data
   
   REQUEST FORMAT:
   POST /api/images/upload
   Headers:
     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     Content-Type: multipart/form-data
   Body:
     image: [resim dosyası] (form field name: 'image')
   
   SUCCESS RESPONSE (201):
   {
     "success": true,
     "message": "Image uploaded successfully",
     "image": {
       "_id": "507f1f77bcf86cd799439011",
       "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
       "publicId": "sample_image_123",
       "uploadedBy": "507f1f77bcf86cd799439011",
       "createdAt": "2024-01-15T10:30:00.000Z",
       "updatedAt": "2024-01-15T10:30:00.000Z"
     }
   }

2. RESİMLERİ LİSTELEME ENDPOINT:
   URL: GET /api/images/fetch
   Authentication: Required (JWT Token)
   Authorization: User level (role: 'user' or 'admin')
   
   QUERY PARAMETERS (Opsiyonel):
   - page: Sayfa numarası (varsayılan: 1)
   - limit: Sayfa başına resim sayısı (varsayılan: 10)
   - sortBy: Sıralama alanı (varsayılan: 'createdAt')
   - sortOrder: Sıralama yönü ('asc' veya 'desc', varsayılan: 'desc')
   
   REQUEST FORMAT:
   GET /api/images/fetch?page=1&limit=10&sortBy=createdAt&sortOrder=desc
   Headers:
     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   SUCCESS RESPONSE (200):
   {
     "success": true,
     "currentPage": 1,
     "totalPages": 3,
     "totalImages": 25,
     "images": [
       {
         "_id": "507f1f77bcf86cd799439011",
         "url": "https://res.cloudinary.com/demo/image/upload/sample1.jpg",
         "publicId": "sample_image_123",
         "uploadedBy": "507f1f77bcf86cd799439011",
         "createdAt": "2024-01-15T10:30:00.000Z"
       }
     ]
   }

3. RESİM SİLME ENDPOINT:
   URL: DELETE /api/images/delete/:imageId
   Authentication: Required (JWT Token)
   Authorization: Admin level (role: 'admin' ONLY)
   
   REQUEST FORMAT:
   DELETE /api/images/delete/507f1f77bcf86cd799439011
   Headers:
     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   SUCCESS RESPONSE (200):
   {
     "success": true,
     "message": "Image deleted successfully"
   }

==========================================================================
MIDDLEWARE CHAIN AÇIKLAMALARI
==========================================================================

1. UPLOAD ROUTE MIDDLEWARE CHAIN:
   Request → authMiddleware → isAdminUser → uploadMiddleware.single('image') → uploadImage
   
   a) authMiddleware: JWT token doğrulama
   b) isAdminUser: Admin yetkisi kontrolü  
   c) uploadMiddleware.single('image'): Tek resim dosyası yükleme
   d) uploadImage: Controller fonksiyonu - business logic

2. FETCH ROUTE MIDDLEWARE CHAIN:
   Request → authMiddleware → fetchImages
   
   a) authMiddleware: JWT token doğrulama
   b) fetchImages: Controller fonksiyonu - pagination ve sorting

3. DELETE ROUTE MIDDLEWARE CHAIN:
   Request → authMiddleware → isAdminUser → deleteImage
   
   a) authMiddleware: JWT token doğrulama
   b) isAdminUser: Admin yetkisi kontrolü
   c) deleteImage: Controller fonksiyonu - ownership check ve silme

==========================================================================
YETKİLENDİRME MATRİSİ
==========================================================================

ENDPOINT ACCESS PERMISSIONS:

| Endpoint           | No Auth | User Role | Admin Role |
|--------------------|---------|-----------|------------|
| POST /upload       |   ❌    |    ❌     |     ✅     |
| GET /fetch         |   ❌    |    ✅     |     ✅     |
| DELETE /delete     |   ❌    |    ❌     |     ✅     |

KULLANICI ROLLERI:
- 'user': Normal kullanıcı - sadece resim görüntüleme
- 'admin': Yönetici kullanıcı - tüm resim işlemleri

==========================================================================
HATA RESPONSE'LARI
==========================================================================

401 UNAUTHORIZED (Token yok/geçersiz):
{
  "success": false,
  "message": "No token provided" / "Invalid token"
}

403 FORBIDDEN (Yetki yok):
{
  "success": false,
  "message": "Access denied for non-admin users"
}

400 BAD REQUEST (Dosya yok):
{
  "success": false,
  "message": "No image provided"
}

404 NOT FOUND (Resim bulunamadı):
{
  "success": false,
  "message": "Image not found"
}

403 FORBIDDEN (Sahiplik yok):
{
  "success": false,
  "message": "Unauthorized to delete this image"
}

500 INTERNAL SERVER ERROR:
{
  "success": false,
  "message": "Hata mesajı"
}

==========================================================================
KULLANIM ÖRNEKLERİ - CURL KOMUTLARI
==========================================================================

1. Admin ile resim yükleme:
   curl -X POST http://localhost:3000/api/images/upload \
   -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
   -F "image=@/path/to/image.jpg"

2. Resimleri listeleme:
   curl -X GET "http://localhost:3000/api/images/fetch?page=1&limit=5" \
   -H "Authorization: Bearer JWT_TOKEN"

3. Admin ile resim silme:
   curl -X DELETE http://localhost:3000/api/images/delete/IMAGE_ID \
   -H "Authorization: Bearer ADMIN_JWT_TOKEN"

Bu route modülü, güvenli ve kapsamlı resim yönetim API'si sağlar.
==========================================================================
*/