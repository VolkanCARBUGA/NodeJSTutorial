/*
==========================================================================
CLOUDINARY HELPER - BULUT DEPOLAMA YARDIMCI FONKSİYONLARI
==========================================================================
Bu dosya Cloudinary bulut depolama servisi ile etkileşim kuran yardımcı fonksiyonları içerir.
Resim yükleme işlemlerini basitleştiren ve hata yönetimi sağlayan wrapper fonksiyonlar barındırır.
Controller'lar bu helper'ı kullanarak Cloudinary API'si ile güvenli iletişim kurar.
==========================================================================
*/

// Cloudinary konfigürasyon dosyasını import ediyoruz
// Bu dosyada API anahtarları ve cloud_name ayarları bulunur
const cloudinary = require('../config/cloudinary');

/*
==========================================================================
RESİM YÜKLEME HELPER FONKSİYONU
==========================================================================
Yerel dosya yolunu alır ve Cloudinary'ye yükler
*/
const uploadImageToCloudinary = async (file) => {
    try {
        // Cloudinary API'sini kullanarak dosyayı yükle
        // file parametresi: yerel dosya yolu (örn: uploads/image-1234567890.jpg)
        const result = await cloudinary.uploader.upload(file);
        
        // Yükleme sonucundan gerekli bilgileri çıkar ve döndür
        return {
            // Güvenli HTTPS URL'i - resmin buluttaki erişim adresi
            // Bu URL frontend'de img src olarak kullanılabilir
            url: result.secure_url,
            
            // Cloudinary'deki benzersiz resim ID'si
            // Resmi silmek veya güncellemek için bu ID gereklidir
            publicId: result.public_id,
        };
    } catch (error) {
        // Yükleme hatası durumunda özel hata mesajı fırlat
        // Controller katmanı bu hatayı yakalayarak kullanıcıya uygun mesaj döndürür
        throw new Error('Image upload failed');
    }
};

// Yardımcı fonksiyonu dışa aktarıyoruz
// Controller'lar bu fonksiyonu import ederek kullanabilir
module.exports = { uploadImageToCloudinary };

/*
==========================================================================
CLOUDINARY HELPER KULLANIM REHBERİ
==========================================================================

Bu helper dosyası, Cloudinary API'si ile controller'lar arasında
bir abstraction layer (soyutlama katmanı) sağlar.

AVANTAJLARI:

1. CODE REUSABILITY (Kod Yeniden Kullanılabilirliği):
   - Aynı yükleme logic'i birden fazla controller'da kullanılabilir
   - DRY (Don't Repeat Yourself) prensibine uygun

2. ERROR HANDLING (Hata Yönetimi):
   - Cloudinary hataları tek yerden yönetilir
   - Standart hata mesajları sağlar
   - Controller'lar için temiz hata handling

3. MAINTAINABILITY (Sürdürülebilirlik):
   - Cloudinary logic değişikliklerinde tek dosya düzenlenir
   - API değişikliklerine kolay adaptasyon

4. TESTABILITY (Test Edilebilirlik):
   - Helper fonksiyonları bağımsız olarak test edilebilir
   - Mock'lanması kolay

KULLANIM ÖRNEĞİ:

```javascript
// Controller'da kullanım
const { uploadImageToCloudinary } = require('../helpers/cloudinary-helper');

const uploadController = async (req, res) => {
  try {
    const { url, publicId } = await uploadImageToCloudinary(req.file.path);
    // Başarılı yükleme işlemleri...
  } catch (error) {
    // Hata yönetimi...
  }
};
```

CLOUDINARY UPLOAD RESULT:

Cloudinary API'si yükleme sonucunda şu bilgileri döndürür:
- asset_id: Cloudinary'deki asset ID'si
- public_id: Resim için benzersiz tanımlayıcı
- version: Resim versiyonu
- version_id: Version ID'si
- signature: Güvenlik imzası
- width: Resim genişliği
- height: Resim yüksekliği
- format: Dosya formatı (jpg, png, etc.)
- resource_type: Kaynak tipi (image, video, etc.)
- created_at: Oluşturulma tarihi
- tags: Etiketler
- bytes: Dosya boyutu
- type: Upload tipi
- etag: Entity tag
- placeholder: Placeholder bilgisi
- url: HTTP URL
- secure_url: HTTPS URL (güvenli)
- folder: Klasör bilgisi
- access_mode: Erişim modu

Bu helper'da sadece url ve publicId döndürülür çünkü
uygulama için bunlar yeterlidir.

GÜVENLİK ÖNLEMLERİ:
- API secret'ları config dosyasında saklanır
- Sadece gerekli bilgiler döndürülür
- Error handling ile sensitive bilgi sızması önlenir

Bu helper, güvenli ve verimli resim yükleme işlemi sağlar.
==========================================================================
*/