/*
==========================================================================
IMAGE MODEL - RESİM VERİTABANI ŞEMASI
==========================================================================
Bu dosya resim verileri için MongoDB/Mongoose şemasını tanımlar.
Cloudinary'de saklanan resimlerin veritabanı referanslarını,
meta verilerini ve kullanıcı ilişkilerini yönetir.
==========================================================================
*/

// Mongoose ODM kütüphanesini import ediyoruz - MongoDB işlemleri için
const mongoose = require('mongoose');

// Resim şemasını tanımlıyoruz - veritabanındaki resim belgelerinin yapısı
const imageSchema = new mongoose.Schema({
    // Resmin Cloudinary'deki URL adresi
    url: {
        type: String,               // Veri tipi: String (metin)
        required: true,             // Zorunlu alan - boş olamaz
        // Örnek: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
    },
    
    // Cloudinary'deki benzersiz resim ID'si
    publicId: {
        type: String,               // Veri tipi: String (metin)
        required: true,             // Zorunlu alan - boş olamaz
        // Örnek: folder/image_name_abc123
        // Bu ID ile resim Cloudinary'den silinebilir veya güncellenebilir
    },
    
    // Resmi yükleyen kullanıcının ID referansı
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,  // MongoDB ObjectId tipi
        ref: 'User',                           // User modeline referans - populate edilebilir
        required: true,                        // Zorunlu alan - her resmin sahibi olmalı
        // Bu alan ile hangi kullanıcının hangi resimleri yüklediği takip edilir
    },
    
// Schema options - ek yapılandırmalar
}, { 
    timestamps: true    // createdAt ve updatedAt alanlarını otomatik ekle
    // createdAt: Resim kaydının oluşturulma tarihi
    // updatedAt: Resim kaydının son güncellenme tarihi
});

// Image modelini oluşturuyoruz - imageSchema'yı kullanarak
// Model adı: 'Image', Collection adı: 'images' (MongoDB otomatik çoğul yapar)
const Image = mongoose.model('Image', imageSchema);

// Image modelini dışa aktarıyoruz - diğer dosyalarda kullanılabilir
module.exports = Image;

/*
==========================================================================
RESİM MODEL YAPISI VE KULLANIMI
==========================================================================

Bu model, bulut tabanlı resim yönetim sistemi için tasarlanmıştır.
Resimler fiziksel olarak Cloudinary'de, meta verileri ise MongoDB'de saklanır.

SCHEMA ALANLARI:

1. URL FIELD:
   - Resmin Cloudinary'deki erişim adresi
   - HTTPS protokolü ile güvenli erişim
   - CDN üzerinden hızlı yükleme
   - Frontend'de doğrudan img src'de kullanılabilir

2. PUBLIC_ID FIELD:
   - Cloudinary'nin resim için oluşturduğu benzersiz ID
   - Resim silme işlemleri için kritik
   - Resim transformasyonları için kullanılır
   - Format: "folder/filename" şeklinde

3. UPLOADED_BY FIELD:
   - User modeli ile ilişki kurur (Foreign Key)
   - ObjectId tipinde referans
   - populate() ile kullanıcı bilgileri çekilebilir
   - Yetkilendirme ve sahiplik kontrolü için

4. TIMESTAMPS:
   - createdAt: Otomatik oluşturulma tarihi
   - updatedAt: Otomatik güncellenme tarihi
   - Mongoose tarafından yönetilir

MODEL KULLANIM ÖRNEKLERİ:

1. YENİ RESİM KAYDI:
   ```javascript
   const newImage = new Image({
     url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
     publicId: "sample_image_123",
     uploadedBy: "507f1f77bcf86cd799439011"
   });
   await newImage.save();
   ```

2. RESİMLERİ LİSTELEME:
   ```javascript
   const images = await Image.find()
     .populate('uploadedBy', 'userName email')
     .sort({ createdAt: -1 });
   ```

3. KULLANICI RESİMLERİNİ BULMA:
   ```javascript
   const userImages = await Image.find({ 
     uploadedBy: userId 
   });
   ```

4. RESİM SİLME:
   ```javascript
   await Image.findByIdAndDelete(imageId);
   ```

VERİTABANI İLİŞKİLERİ:

Image Collection ←→ User Collection
- One-to-Many relationship
- Bir kullanıcı birden fazla resim yükleyebilir
- Her resmin bir sahibi vardır

POPULATE KULLANIMI:
```javascript
const imagesWithUsers = await Image.find()
  .populate({
    path: 'uploadedBy',
    select: 'userName email -_id'
  });
```

INDEX ÖNERILERİ:

Production ortamında performans için şu index'ler eklenebilir:
1. uploadedBy field'i için index (kullanıcı resimlerini hızlı bulmak için)
2. createdAt field'i için index (tarih sıralaması için)
3. publicId field'i için unique index (benzersizlik kontrolü için)

```javascript
imageSchema.index({ uploadedBy: 1 });
imageSchema.index({ createdAt: -1 });
imageSchema.index({ publicId: 1 }, { unique: true });
```

GÜVENLİK ÖNLEMLERİ:

1. OWNERSHIP VALIDATION:
   - Sadece resmin sahibi silebilir
   - uploadedBy field'i ile kontrol edilir

2. REFERENCE INTEGRITY:
   - User referansının geçerliliği kontrol edilir
   - Populate işlemleri ile data consistency

3. URL VALIDATION:
   - Cloudinary URL formatı kontrol edilebilir
   - Malicious URL'ler önlenebilir

Bu model, güvenli ve ölçeklenebilir resim meta veri yönetimi sağlar.
==========================================================================
*/