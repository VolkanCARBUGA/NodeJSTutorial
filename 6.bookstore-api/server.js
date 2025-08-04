/*
==========================================================================
BOOKSTORE API - ANA SUNUCU DOSYASI
==========================================================================
Bu dosya kitap mağazası API'sinin ana sunucu yapılandırmasını içerir.
Express.js tabanlı RESTful API servisi başlatır.
MongoDB veritabanı bağlantısı ve route yapılandırması yapar.
==========================================================================
*/

// Express.js web framework'ünü CommonJS ile import ediyoruz
const express = require('express');

// Çevre değişkenlerini .env dosyasından yüklemek için dotenv konfigürasyonu
// .env dosyasındaki PORT, MONGO_URL gibi değişkenleri process.env ile erişilebilir yapar
require('dotenv').config();

// Veritabanı bağlantı fonksiyonunu import ediyoruz
const connectDB=require('./database/db');

// Kitap route'larını import ediyoruz - tüm kitap CRUD işlemleri
const bookRoutes=require('./routes/book-routes');

// Express uygulaması oluşturuyoruz - ana uygulama objesi
const app=express();

// Port numarasını çevre değişkeninden alıyoruz, yoksa 3000 kullanıyoruz
// process.env.PORT - production ortamında platform tarafından belirlenir
const PORT=process.env.PORT || 3000;

// Veritabanına bağlantı kuruyoruz
// Bu fonksiyon asenkron olarak MongoDB'ye bağlanır
connectDB();

// JSON middleware - gelen POST/PUT isteklerindeki JSON verileri parse eder
// req.body'de JSON verilere erişmemizi sağlar
app.use(express.json());

// Kitap route'larını /api/books prefix'i ile bağlıyoruz
// Tüm kitap işlemleri /api/books/... URL'leri altında erişilebilir olur
app.use('/api/books',bookRoutes);

// Sunucuyu belirtilen port'ta dinlemeye başlatıyoruz
// Callback fonksiyonu sunucu başarıyla başladığında çalışır
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

/*
==========================================================================
API ENDPOINT YAPISI
==========================================================================
Bu sunucu aşağıdaki endpoint'leri sağlar:

1. GET /api/books - Tüm kitapları listeler
2. GET /api/books/:id - Belirli bir kitabı getirir  
3. POST /api/books/add - Yeni kitap ekler
4. PUT /api/books/:id - Kitap bilgilerini günceller
5. DELETE /api/books/:id - Kitabı siler

==========================================================================
KULLANILAN TEKNOLOJİLER
==========================================================================
- Express.js: Web framework
- MongoDB: NoSQL veritabanı
- Mongoose: MongoDB ODM
- dotenv: Çevre değişkeni yönetimi

==========================================================================
ÇALIŞMA SIRASI
==========================================================================
1. Çevre değişkenleri yüklenir (.env)
2. Express uygulaması oluşturulur
3. MongoDB bağlantısı kurulur
4. Middleware'ler yapılandırılır
5. Route'lar tanımlanır
6. Sunucu belirlenen port'ta başlatılır
==========================================================================
*/