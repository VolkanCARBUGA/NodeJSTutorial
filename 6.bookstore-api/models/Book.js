/*
==========================================================================
BOOK MODELİ - MONGOOSE SCHEMA TANIMI
==========================================================================
Bu dosya kitap veritabanı modelini tanımlar.
Mongoose Schema kullanarak kitap verilerinin yapısını,
doğrulama kurallarını ve kısıtlamalarını belirtir.
==========================================================================
*/

// Mongoose ODM kütüphanesini import ediyoruz
const mongoose=require('mongoose');

// Kitap şemasını tanımlıyoruz - veritabanındaki kitap belgelerinin yapısı
const BookSchema=new mongoose.Schema({
    // Kitap başlığı alanı
    title:{
        type:String,                    // Veri tipi: String (metin)
        required:[true,"Title is required"],    // Zorunlu alan, hata mesajı ile
        trim:true,                      // Baş ve sondaki boşlukları temizle
        maxlength:[100,"Title must be less than 100 characters"],  // Maksimum 100 karakter
    },
    
    // Kitap yazarı alanı
    author:{
        type:String,                    // Veri tipi: String (metin)
        required:[true,"Author is required"],   // Zorunlu alan, hata mesajı ile
        trim:true,                      // Baş ve sondaki boşlukları temizle
        maxlength:[100,"Author must be less than 100 characters"], // Maksimum 100 karakter
    },
    
    // Kitap yayın yılı alanı
    year:{
        type:Number,                    // Veri tipi: Number (sayı)
        required:[true,"Year is required"],     // Zorunlu alan, hata mesajı ile
        min:[1900,"Year must be greater than 1900"],           // Minimum değer: 1900
        max:[new Date().getFullYear(),"Year must be less than or equal to the current year"], // Maksimum: mevcut yıl
    },
    
    // Kayıt oluşturulma tarihi alanı
    createdAt:{
        type:Date,                      // Veri tipi: Date (tarih)
        default:Date.now,               // Varsayılan değer: şu anki tarih/saat
    },
});

// Model oluşturuyoruz ve collection adını "Books" olarak belirtiyoruz
// İlk parametre: Model adı (tekil)
// İkinci parametre: Schema
// Üçüncü parametre: Collection adı (çoğul) - MongoDB'deki collection ismi
const Book=mongoose.model("Book", BookSchema, "Books");

// Book modelini dışa aktarıyoruz - diğer dosyalarda kullanılabilir
module.exports=Book;

/*
==========================================================================
MONGOOSE SCHEMA VALIDASYON KURALLARI
==========================================================================

1. TEMEL VERİ TİPLERİ:
   - String: Metin veriler
   - Number: Sayısal veriler  
   - Date: Tarih/saat veriler
   - Boolean: true/false değerler
   - ObjectId: MongoDB referans ID'leri
   - Array: Dizi veriler

2. VALIDASYON ÖZELLİKLERİ:
   - required: Zorunlu alan
   - unique: Benzersiz değer
   - min/max: Minimum/maksimum değer (Number, Date)
   - minlength/maxlength: Minimum/maksimum uzunluk (String)
   - trim: Boşluk temizleme (String)
   - lowercase/uppercase: Harf dönüşümü (String)
   - enum: Belirli değerler listesi
   - default: Varsayılan değer

3. ÖZEL VALIDASYON:
   - Custom validator fonksiyonları
   - Regex pattern'leri
   - Asenkron validation

4. SCHEMA OPTIONS:
   - timestamps: createdAt ve updatedAt otomatik ekleme
   - versionKey: __v alanını kontrol etme
   - collection: Collection adını manuel belirleme
   - strict: Schema dışı alanları kontrol etme

==========================================================================
MODEL KULLANIM ÖRNEKLERİ
==========================================================================

1. YENİ KİTAP OLUŞTURMA:
   const newBook = new Book({title: "...", author: "...", year: 2024});
   await newBook.save();

2. KİTAP ARAMA:
   const books = await Book.find();
   const book = await Book.findById(id);

3. KİTAP GÜNCELLEME:
   await Book.findByIdAndUpdate(id, updateData);

4. KİTAP SİLME:
   await Book.findByIdAndDelete(id);

Bu model, kitap verilerinin tutarlılığını ve doğruluğunu sağlar.
==========================================================================
*/