/*
==========================================================================
USER MODELİ - KULLANICI VERİTABANI ŞEMASI
==========================================================================
Bu dosya kullanıcı authentication sistemi için veritabanı modelini tanımlar.
Mongoose Schema kullanarak kullanıcı verilerinin yapısını,
güvenlik önlemlerini ve doğrulama kurallarını belirtir.
==========================================================================
*/

// Mongoose ODM kütüphanesini import ediyoruz - MongoDB işlemleri için
const mongoose=require('mongoose');

// bcrypt kütüphanesini import ediyoruz - şifre hash'leme için  
const bcrypt=require('bcrypt');

// Kullanıcı şemasını tanımlıyoruz - veritabanındaki kullanıcı belgelerinin yapısı
const userSchema=new mongoose.Schema({
    // Kullanıcı adı alanı
    userName:{
        type:String,            // Veri tipi: String (metin)
        required:true,          // Zorunlu alan - boş olamaz
        unique:true,            // Benzersiz değer - aynı kullanıcı adı birden fazla olamaz
        trim:true,              // Başta ve sonda boşlukları temizle
    },
    
    // E-posta adresi alanı
    email:{
        type:String,            // Veri tipi: String (metin)
        required:true,          // Zorunlu alan - boş olamaz
        unique:true,            // Benzersiz değer - aynı e-posta birden fazla olamaz
        trim:true,              // Başta ve sonda boşlukları temizle
        lowercase:true,         // E-postayı küçük harfe çevir (tutarlılık için)
    },
    
    // Şifre alanı
    password:{
        type:String,            // Veri tipi: String (metin)
        required:true,          // Zorunlu alan - boş olamaz
        // Not: Şifre hash'lenmiş olarak saklanır, plain text değil
    },
    
    // Kullanıcı rolü alanı
    role:{
        type:String,            // Veri tipi: String (metin)
        enum:['admin','user'],  // Sadece 'admin' veya 'user' değerleri kabul edilir
        default:'user',         // Varsayılan değer: 'user' (yeni kullanıcılar normal user olur)
    },
    
// Schema options - ek yapılandırmalar
},{timestamps:true});  // createdAt ve updatedAt alanlarını otomatik ekle

// User modelini oluşturuyoruz - userSchema'yı kullanarak
// Model adı: 'User', Collection adı: 'users' (MongoDB otomatik çoğul yapar)
const User=mongoose.model('User',userSchema);

// User modelini dışa aktarıyoruz - diğer dosyalarda kullanılabilir
module.exports=User;

/*
==========================================================================
KULLANICI AUTHENTICATION MODELİ ÖZELLİKLERİ
==========================================================================

1. GÜVENLIK ÖZELLİKLERİ:
   - unique: Aynı userName/email ile birden fazla hesap önlenir
   - trim: Boşluk kaynaklı güvenlik açıklarını önler
   - lowercase: Email tutarlılığı sağlar
   - enum: Role değerlerini sınırlar

2. VERİ DOĞRULAMA:
   - required: Zorunlu alanlar boş bırakılamaz
   - Mongoose built-in validation
   - Schema level constraints

3. TIMESTAMPS:
   - createdAt: Hesap oluşturulma tarihi
   - updatedAt: Son güncelleme tarihi
   - Otomatik yönetilir

4. PASSWORD GÜVENLİĞİ:
   - Şifreler bcrypt ile hash'lenir
   - Plain text şifre veritabanında saklanmaz
   - Salt rounds kullanılır

==========================================================================
MODEL KULLANIM ÖRNEKLERİ
==========================================================================

1. YENİ KULLANICI OLUŞTURMA:
   const newUser = new User({
     userName: "johndoe",
     email: "john@example.com", 
     password: hashedPassword,
     role: "user"
   });
   await newUser.save();

2. KULLANICI ARAMA:
   const user = await User.findOne({userName: "johndoe"});
   const userById = await User.findById(userId);

3. KULLANICI GÜNCELLEME:
   await User.findByIdAndUpdate(userId, updateData);

4. KULLANICI SİLME:
   await User.findByIdAndDelete(userId);

==========================================================================
ROLE-BASED ACCESS CONTROL
==========================================================================

ROLLER:
- 'user': Genel kullanıcı (varsayılan)
  * Ana sayfa erişimi
  * Kendi profil işlemleri
  
- 'admin': Yönetici kullanıcı
  * Tüm user yetkilerine ek olarak
  * Admin panel erişimi
  * Sistem yönetimi

KULLANIM:
- Middleware'de req.userInfo.role kontrol edilir
- Route seviyesinde yetkilendirme yapılır

==========================================================================
VERİTABANI CONSTRAINTS
==========================================================================

UNIQUE CONSTRAINTS:
- userName: Benzersiz kullanıcı adı
- email: Benzersiz e-posta adresi

INDEX'LER:
- userName ve email otomatik index'lenir (unique)
- Hızlı arama performansı sağlar

Bu model, güvenli ve ölçeklenebilir kullanıcı yönetimi sağlar.
==========================================================================
*/