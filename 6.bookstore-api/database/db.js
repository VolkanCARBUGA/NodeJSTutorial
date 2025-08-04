/*
==========================================================================
MONGODB VERİTABANI BAĞLANTI MODÜLÜ
==========================================================================
Bu modül MongoDB veritabanına bağlantı kurmaktan sorumludur.
Mongoose ODM kullanarak asenkron veritabanı bağlantısı gerçekleştirir.
Hata durumlarını yakalar ve uygun şekilde yönetir.
==========================================================================
*/

// Mongoose ODM kütüphanesini import ediyoruz
// Mongoose, MongoDB için object modeling kütüphanesidir
const mongoose=require("mongoose")

// Asenkron veritabanı bağlantı fonksiyonu
// async/await syntax ile asenkron işlemleri yönetiyoruz
const connectDB=async()=>{
    try{
        // MongoDB'ye bağlantı kuruyoruz
        // process.env.MONGO_URL - .env dosyasından gelen MongoDB connection string
        // Connection string formatı: mongodb+srv://username:password@cluster.mongodb.net/database
        await mongoose.connect(process.env.MONGO_URL);
        
        // Başarılı bağlantı durumunda konsola mesaj yazdırıyoruz
        console.log("Connected to MongoDB");
        
    }catch(error){
        // Bağlantı hatası durumunda:
        // 1. Hata mesajını konsola yazdır
        console.log(error);
        
        // 2. Process'i hata kodu (1) ile sonlandır
        // Bu, uygulamanın veritabanı olmadan çalışmasını önler
        process.exit(1);
    }
}

// connectDB fonksiyonunu dışa aktarıyoruz
// Bu fonksiyon server.js'te import edilip çağrılacak
module.exports=connectDB;

/*
==========================================================================
MONGOOSE CONNECTION ÖZELLİKLERİ
==========================================================================

1. CONNECTION EVENTS:
   - connected: Bağlantı kurulduğunda
   - error: Hata oluştuğunda  
   - disconnected: Bağlantı kesildiğinde
   - reconnected: Yeniden bağlanıldığında

2. CONNECTION OPTIONS (opsiyonel):
   - useNewUrlParser: Yeni URL parser kullan
   - useUnifiedTopology: Yeni topology engine kullan
   - maxPoolSize: Maksimum connection pool boyutu
   - serverSelectionTimeoutMS: Server seçim timeout süresi

3. BAĞLANTI STRING YAPISI:
   mongodb+srv://username:password@cluster.mongodb.net/database_name?options

4. GÜVENLİK ÖNLEMLERİ:
   - Connection string'i .env dosyasında sakla
   - Database kullanıcısına minimum gerekli yetkileri ver
   - IP whitelist kullan (MongoDB Atlas)
   - SSL/TLS bağlantı kullan

==========================================================================
HATA YÖNETİMİ
==========================================================================
- try/catch bloğu ile hata yakalama
- process.exit(1) ile uygulamayı sonlandırma
- Hata mesajlarını loglama
- Graceful shutdown implementasyonu

Bu modül uygulamanın veritabanı bağlantısının temelini oluşturur.
==========================================================================
*/