/*
==========================================================================
MONGODB VERİTABANI BAĞLANTI MODÜLÜ - AUTHENTICATION PROJESİ
==========================================================================
Bu modül authentication API'si için MongoDB veritabanına bağlantı kurmaktan sorumludur.
Mongoose ODM kullanarak asenkron veritabanı bağlantısı gerçekleştirir.
Hata durumlarını yakalar ve uygun şekilde yönetir.
==========================================================================
*/

// Mongoose ODM kütüphanesini import ediyoruz
// Mongoose, MongoDB için object modeling kütüphanesidir
const mongoose=require('mongoose');

// Asenkron veritabanı bağlantı fonksiyonu
// async/await syntax ile asenkron işlemleri yönetiyoruz
const connectDB=async()=>{
    try{
        // MongoDB'ye bağlantı kuruyoruz
        // process.env.MONGO_URL - .env dosyasından gelen MongoDB connection string
        // Connection string formatı: mongodb+srv://username:password@cluster.mongodb.net/database
        await mongoose.connect(process.env.MONGO_URL);
        
        // Başarılı bağlantı durumunda konsola mesaj yazdırıyoruz
        console.log('MongoDB connected');
        
    }catch(error){
        // Bağlantı hatası durumunda hata mesajını konsola yazdır
        console.log(error);
        
        // Not: Bu projede process.exit(1) kullanılmamış
        // Bu, uygulamanın veritabanı hatası durumunda da çalışmaya devam etmesi anlamına gelir
        // Production'da process.exit(1) kullanılması önerilir
    }
};

// connectDB fonksiyonunu dışa aktarıyoruz
// Bu fonksiyon server.js'te import edilip çağrılacak
module.exports=connectDB;

/*
==========================================================================
VERITABANI BAĞLANTI YÖNETİMİ
==========================================================================

1. CONNECTION STRING:
   - MongoDB Atlas cloud database kullanılır
   - .env dosyasında MONGO_URL olarak saklanır
   - Format: mongodb+srv://username:password@cluster.mongodb.net/auth_db

2. MONGOOSE CONNECTION:
   - Otomatik reconnection desteği
   - Connection pooling
   - Built-in validation
   - Schema-based modeling

3. ERROR HANDLING:
   - Try-catch bloğu ile hata yakalama
   - Console logging
   - Graceful degradation (uygulama çalışmaya devam eder)

==========================================================================
AUTHENTICATION DATABASE SCHEMA
==========================================================================

Bu veritabanında şu collection'lar bulunur:

1. USERS COLLECTION:
   - Kullanıcı hesap bilgileri
   - Hash'lenmiş şifreler
   - Rol bilgileri (user/admin)
   - Timestamp'ler (createdAt, updatedAt)

ÖRNEK USER DOCUMENT:
{
  "_id": "507f1f77bcf86cd799439011",
  "userName": "johndoe",
  "email": "john@example.com", 
  "password": "$2b$10$...",        // bcrypt hash
  "role": "user",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}

==========================================================================
BAĞLANTI BEST PRACTICES
==========================================================================

1. ENVIRONMENT VARIABLES:
   - Connection string'i environment variable'da sakla
   - Production ve development için farklı database'ler
   - Sensitive bilgileri code'a yazmaya

2. CONNECTION OPTIONS (gelişmiş konfigürasyon):
   await mongoose.connect(process.env.MONGO_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     maxPoolSize: 10,               // Connection pool size
     serverSelectionTimeoutMS: 5000 // Server selection timeout
   });

3. CONNECTION EVENTS:
   mongoose.connection.on('connected', () => {
     console.log('Mongoose connected to MongoDB');
   });
   
   mongoose.connection.on('error', (err) => {
     console.log('Mongoose connection error:', err);
   });
   
   mongoose.connection.on('disconnected', () => {
     console.log('Mongoose disconnected');
   });

4. GRACEFUL SHUTDOWN:
   process.on('SIGINT', async () => {
     await mongoose.connection.close();
     console.log('MongoDB connection closed.');
     process.exit(0);
   });

==========================================================================
GÜVENLİK ÖNLEMLERİ
==========================================================================

1. CONNECTION SECURITY:
   - SSL/TLS encryption kullan
   - IP whitelist ayarla
   - Strong authentication credentials

2. DATABASE SECURITY:
   - Minimum privilege principle
   - Database user permissions
   - Network security groups

3. DATA PROTECTION:
   - Şifre hash'leme (bcrypt)
   - PII data encryption
   - Audit logging

Bu modül, güvenli ve reliable veritabanı bağlantısı sağlar.
==========================================================================
*/