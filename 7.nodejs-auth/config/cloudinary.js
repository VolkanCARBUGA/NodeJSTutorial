/*
==========================================================================
CLOUDINARY KONFIGÜRASYON - BULUT RESİM DEPOLAMAı AYARLARI
==========================================================================
Bu dosya Cloudinary bulut depolama servisinin konfigürasyonunu yapar.
Cloudinary, resimlerin bulut ortamında güvenli şekilde saklanması ve 
yönetilmesi için kullanılan bir SaaS (Software as a Service) platformudur.
==========================================================================
*/

// Cloudinary kütüphanesinin v2 sürümünü import ediyoruz
// v2 sürümü daha gelişmiş özellikler ve daha iyi performans sunar
const cloudinary = require('cloudinary').v2;

// Cloudinary servisini konfigüre ediyoruz
// Bu ayarlar .env dosyasından çevre değişkenleri olarak alınır
cloudinary.config({
    // Cloudinary hesap adı - her hesabın benzersiz bir cloud_name'i vardır
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    
    // API anahtarı - Cloudinary servisine erişim için gerekli kimlik bilgisi
    api_key: process.env.CLOUDINARY_API_KEY,
    
    // API gizli anahtarı - güvenlik için sadece sunucu tarafında kullanılır
    // Bu anahtar ile dosya yükleme, silme gibi işlemler gerçekleştirilir
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigüre edilmiş cloudinary nesnesini dışa aktarıyoruz
// Bu nesne diğer dosyalarda import edilerek kullanılacak
module.exports = cloudinary;

/*
==========================================================================
CLOUDINARY BULUT DEPOLAMAı SİSTEMİ
==========================================================================

CLOUDINARY NEDİR?
Cloudinary, web ve mobil uygulamalar için kapsamlı bulut tabanlı 
resim ve video yönetim çözümüdür. Resimlerin yüklenmesi, optimize edilmesi,
dönüştürülmesi ve dağıtımı için eksiksiz bir platform sağlar.

ANA ÖZELLİKLER:
1. Otomatik resim optimizasyonu
2. Çoklu format desteği (JPEG, PNG, WebP, AVIF)
3. Real-time resim dönüştürme
4. CDN (Content Delivery Network) entegrasyonu
5. Güvenli resim depolama
6. API tabanlı yönetim

KONFIGÜRASYON PARAMETRELERİ:

1. CLOUD_NAME:
   - Cloudinary hesabınızın benzersiz tanımlayıcısı
   - URL'lerde kullanılır: https://res.cloudinary.com/{cloud_name}/...
   - Örnek: my-app-images

2. API_KEY:
   - Cloudinary API'sine erişim için genel kimlik
   - Client-side'da kullanılabilir
   - Örnek: 123456789012345

3. API_SECRET:
   - Güvenlik için kritik gizli anahtar
   - Sadece server-side'da kullanılmalı
   - Upload, delete gibi işlemler için gerekli
   - Asla client-side kodda expose edilmemeli

GÜVENLIK ÖNEMLERİ:
- API_SECRET .env dosyasında saklanmalı
- Production'da environment variables kullanılmalı
- Secret key'i version control'e commit etmeyin
- Signed upload URL'leri kullanın

ÇEVRE DEĞİŞKENLERİ (.env dosyası):
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Bu konfigürasyon dosyası, uygulamada güvenli resim yükleme altyapısını sağlar.
==========================================================================
*/


