// MongoDB ve Mongoose ile Veritabanı İşlemleri Rehberi
// Bu dosya, MongoDB veritabanı ile temel CRUD (Create, Read, Update, Delete) işlemlerini göstermektedir
// Mongoose, MongoDB için Node.js tabanlı bir Object Data Modeling (ODM) kütüphanesidir

// Mongoose kütüphanesini import ediyoruz
const mongoose = require("mongoose");

// MongoDB Atlas Cloud Database'e bağlantı kuruyoruz
// MongoDB Atlas ücretsiz cloud database hizmeti sunmaktadır
// Connection string formatı: mongodb+srv://username:password@cluster.mongodb.net/database_name
mongoose.connect("mongodb+srv://volkanilkyar:Volkan7676@cluster0.jbnkgsx.mongodb.net/users").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

// Mongoose Schema Tanımı
// Schema, veritabanındaki belgelerin (document) yapısını tanımlar
// MongoDB'de collection'lar (tablolar) ve document'lar (kayıtlar) vardır
const userSchema = new mongoose.Schema({
    name: String,           // Kullanıcının adı (String tipinde)
    email: String,          // Kullanıcının e-posta adresi (String tipinde)
    age: Number,            // Kullanıcının yaşı (Number tipinde)
    isActive: Boolean,      // Kullanıcının aktif olup olmadığı (Boolean tipinde)
    tags: [String],         // Kullanıcının etiketleri (String array tipinde)
    createdAt: {            // Kayıt oluşturulma tarihi
        type: Date,         // Tarih tipinde
        default: Date.now   // Varsayılan değer olarak şu anki tarih
    }
});

// Model Oluşturma
// Model, schema'yı kullanarak veritabanı işlemleri yapmamızı sağlar
// İlk parametre collection adı, ikinci parametre schema
const User = mongoose.model("User", userSchema);

// Asenkron Fonksiyon ile Veritabanı Sorgu Örnekleri
// Tüm MongoDB işlemleri asenkron olduğu için async/await kullanıyoruz
async function runQueryExamples() {
    try {
        // 1. YENİ KULLANICI OLUŞTURMA (CREATE İŞLEMİ)
        
        // Yöntem 1: User.create() metodu ile direkt oluşturma
        const newUser1 = await User.create({
            name: "Silinen User",
            email: "silinen@gmail.com",
            age: 55,
            isActive: false,
            tags: ["Backend Developer","Frontend Developer","AI Engineer"],
        });
        console.log("Create metodu ile oluşturulan kullanıcı:", newUser1);
        
        // Yöntem 2: new User() constructor ile oluşturma ve save() metodu ile kaydetme
        const newUser2 = new User({
            name: "Ahmet",
            email: "ahmet@gmail.com",
            age: 25,
            isActive: false,
            tags: ["developer", "designer","AI Engineer","Backend Developer"],
        });
        await newUser2.save(); // Veritabanına kaydet
        console.log("New constructor ile oluşturulan kullanıcı:", newUser2);
        
        // 2. OKUMA İŞLEMLERİ (READ İŞLEMLERİ)
        
        // Tüm kullanıcıları bulma
        const users = await User.find();
        console.log("Tüm kullanıcılar:", users);
        
        // Tek bir kullanıcı bulma (isimle arama)
        const user = await User.findOne({name: "Deli"});
        console.log("Tek kullanıcı (Deli):", user);
        
        // Koşullu arama - aktif olmayan kullanıcıları bulma
        const getUserOffActiveFalse = await User.find({isActive: false});
        console.log("Aktif olmayan kullanıcılar:", getUserOffActiveFalse);
        
        // ID ile kullanıcı bulma
        const getLastCreatedUserByUserId = await User.findById(newUser2._id);
        console.log("ID ile bulunan kullanıcı:", getLastCreatedUserByUserId);
        
        // 3. GELIŞMIŞ SORGULAR
        
        // Sadece belirli alanları seçme (projection)
        const selectedFields = await User.find().select("name email");
        console.log("Seçili alanlar (name, email):", selectedFields);
        
        // Sonuç sayısını sınırlama
        const limitedUsers = await User.find().limit(2);
        console.log("Sınırlı kullanıcılar (2 adet):", limitedUsers);
        
        // Sıralama (yaşa göre azalan sırada)
        const sortedUsers = await User.find().sort({age: -1});
        console.log("Yaşa göre sıralanmış kullanıcılar:", sortedUsers);
        
        // Toplam kayıt sayısını bulma
        const countUsers = await User.countDocuments();
        console.log("Toplam kullanıcı sayısı:", countUsers);
        
        // 4. GÜNCELLEME İŞLEMİ (UPDATE İŞLEMİ)
        
        // Tek bir kullanıcıyı güncelleme
        const updatedUser = await User.updateOne(
            {_id: newUser2._id}, // Güncelleme koşulu
            {$set: { // $set operatörü ile güncelleme
                name: "Silinen Ahmet",
                age: 55,
                isActive: true,
                tags: ["Backend Developer","Frontend Developer","AI Engineer"]
            }}
        );
        console.log(`Güncellenen kullanıcı sayısı: ${updatedUser.modifiedCount}`);
        
        // 5. SİLME İŞLEMİ (DELETE İŞLEMİ)
        
        // Tek bir kullanıcıyı silme
        const deletedUser = await User.deleteOne({_id: newUser1._id});
        console.log(`Silinen kullanıcı sayısı: ${deletedUser.deletedCount}`);
        
    } catch (error) {
        // Hata durumunda hata mesajını yazdır
        console.log("Hata oluştu:", error);
    } finally {
        // İşlem tamamlandıktan sonra veritabanı bağlantısını kapat
        // Bu, bellek sızıntısını önlemek için önemlidir
        mongoose.connection.close();
    }
}

// Fonksiyonu çalıştır
runQueryExamples();

/*
MONGODB ve MONGOOSE TEMEL KAVRAMLAR:

1. MONGODB NEDİR?
   - NoSQL (Not Only SQL) belge tabanlı veritabanıdır
   - JSON benzeri BSON formatında veri saklar
   - Esnek şema yapısına sahiptir
   - Yatay ölçeklenebilir

2. MONGOOSE NEDİR?
   - MongoDB için Node.js ODM (Object Data Modeling) kütüphanesidir
   - Schema tanımlamasına olanak sağlar
   - Veri doğrulama (validation) yapar
   - Middleware desteği sunar

3. CRUD İŞLEMLERİ:
   - CREATE: Yeni veri oluşturma (create(), save())
   - READ: Veri okuma (find(), findOne(), findById())
   - UPDATE: Veri güncelleme (updateOne(), updateMany())
   - DELETE: Veri silme (deleteOne(), deleteMany())

4. MONGOOSE METOTLARI:
   - find(): Koşula uyan tüm belgeleri bulur
   - findOne(): Koşula uyan ilk belgeyi bulur
   - findById(): ID'ye göre belge bulur
   - create(): Yeni belge oluşturur
   - save(): Belgeyi veritabanına kaydeder
   - updateOne(): Tek belge günceller
   - deleteOne(): Tek belge siler
   - select(): Belirli alanları seçer
   - limit(): Sonuç sayısını sınırlar
   - sort(): Sonuçları sıralar
   - countDocuments(): Belge sayısını verir

5. MONGODB OPERATÖRLERI:
   - $set: Alanları günceller
   - $inc: Sayısal değeri artırır
   - $push: Array'e eleman ekler
   - $pull: Array'den eleman çıkarır
   - $gte: Büyük eşit
   - $lte: Küçük eşit
   - $in: Belirtilen değerlerden biri
   - $or: Veya koşulu
   - $and: Ve koşulu
*/