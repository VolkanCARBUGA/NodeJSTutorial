/*
==========================================================================
BOOK ROUTES - KİTAP API YÖNLENDİRME MODÜLÜ
==========================================================================
Bu dosya kitap API'si için tüm HTTP route'larını tanımlar.
Express Router kullanarak RESTful API endpoint'lerini
ilgili controller fonksiyonlarına bağlar.
==========================================================================
*/

// Express framework'ünü import ediyoruz
const express=require('express');

// Book controller'dan tüm CRUD fonksiyonlarını destructuring ile alıyoruz
// Bu fonksiyonlar HTTP isteklerini işleyecek
const {getAllBooks,getBookById,addNewBook,updateBook,deleteBook}=require('../controllers/book-controller');

// Express Router instance'ı oluşturuyoruz
// Router, route'ları gruplamak ve modüler hale getirmek için kullanılır
const router=express.Router();

/*
==========================================================================
RESTful API ROUTE TANIMLARI
==========================================================================
Tüm route'lar kitap işlemleri ile ilgilidir
Base URL: /api/books (server.js'te tanımlandı)
*/

// TÜM KİTAPLARI LİSTELE - GET /api/books/
// HTTP Method: GET, Path: /, Handler: getAllBooks
// Bu route tüm kitapları JSON array olarak döndürür
router.get('/',getAllBooks);

// TEK KİTAP DETAYI - GET /api/books/:id
// HTTP Method: GET, Path: /:id, Handler: getBookById  
// :id route parametresi - dinamik ID değeri alır
// Örnek: GET /api/books/507f1f77bcf86cd799439011
router.get('/:id',getBookById);

// YENİ KİTAP EKLE - POST /api/books/add
// HTTP Method: POST, Path: /add, Handler: addNewBook
// Request body'de kitap verilerini bekler (title, author, year)
router.post('/add',addNewBook);

// KİTAP GÜNCELLE - PUT /api/books/:id
// HTTP Method: PUT, Path: /:id, Handler: updateBook
// :id ile güncellenecek kitabı belirtir
// Request body'de güncellenmiş kitap verilerini bekler
router.put('/:id',updateBook);

// KİTAP SİL - DELETE /api/books/:id  
// HTTP Method: DELETE, Path: /:id, Handler: deleteBook
// :id ile silinecek kitabı belirtir
// Başarılı silme durumunda silinen kitap bilgilerini döndürür
router.delete('/:id',deleteBook);

// Router'ı dışa aktarıyoruz - server.js'te import edilecek
module.exports=router;

/*
==========================================================================
RESTful API ENDPOINT LİSTESİ
==========================================================================

Base URL: http://localhost:3000/api/books

1. GET    /                    - Tüm kitapları listele
2. GET    /:id                 - Belirli kitabı getir  
3. POST   /add                 - Yeni kitap ekle
4. PUT    /:id                 - Kitap güncelle
5. DELETE /:id                 - Kitap sil

==========================================================================
ÖRNEK KULLANIM
==========================================================================

1. Tüm kitapları listele:
   GET http://localhost:3000/api/books/

2. ID'si 507f1f77bcf86cd799439011 olan kitabı getir:
   GET http://localhost:3000/api/books/507f1f77bcf86cd799439011

3. Yeni kitap ekle:
   POST http://localhost:3000/api/books/add
   Body: {
     "title": "1984",
     "author": "George Orwell", 
     "year": 1949
   }

4. Kitap güncelle:
   PUT http://localhost:3000/api/books/507f1f77bcf86cd799439011
   Body: {
     "title": "Animal Farm",
     "author": "George Orwell",
     "year": 1945
   }

5. Kitap sil:
   DELETE http://localhost:3000/api/books/507f1f77bcf86cd799439011

==========================================================================
ROUTE PARAMETRELERI
==========================================================================

1. ROUTE PARAMETERS (:id):
   - URL'de dinamik değerler için kullanılır
   - req.params.id ile erişilir
   - MongoDB ObjectId formatında olmalıdır

2. REQUEST BODY:
   - POST ve PUT isteklerinde JSON data
   - req.body ile erişilir  
   - express.json() middleware ile parse edilir

3. RESPONSE FORMAT:
   - Tutarlı JSON response yapısı
   - HTTP status codes ile işlem durumu
   - success, message, data alanları

==========================================================================
EXPRESS ROUTER AVANTAJLARI
==========================================================================

✅ Modüler route yönetimi
✅ Middleware chain desteği  
✅ Route gruplandırma
✅ Namespace isolation
✅ Maintainable kod yapısı

Bu route modülü, kitap API'sinin tüm endpoint'lerini
organize ve yönetilebilir bir şekilde tanımlar.
==========================================================================
*/