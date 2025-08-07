/*
==========================================================================
UPLOAD MIDDLEWARE - DOSYA YÜKLEME ARA KATMANI
==========================================================================
Bu dosya Multer kütüphanesi kullanarak dosya yükleme işlemlerini yöneten middleware'i tanımlar.
Resim dosyalarının geçici olarak sunucuya yüklenmesini, dosya tipini kontrol etmesini
ve dosya boyutu sınırlarını belirlemeyi sağlar.
==========================================================================
*/

// Multer kütüphanesini import ediyoruz - dosya yükleme işlemleri için
const multer = require('multer');

// Node.js path modülünü import ediyoruz - dosya uzantısı işlemleri için
const path = require('path');

// Dosya depolama konfigürasyonu - multer.diskStorage ile yerel depolama ayarları
const storage = multer.diskStorage({
    // Dosyanın kaydedileceği klasörü belirle
    destination: function (req, file, cb) {
        // cb(error, destination) - error: null, destination: 'uploads/' klasörü
        // uploads/ klasörü projenin kök dizininde olmalıdır
        cb(null, 'uploads/');
    },
    
    // Dosya adını belirle - benzersiz isim oluştur
    filename: function (req, file, cb) {
        // Dosya adı formatı: fieldname-timestamp.extension
        // Örnek: image-1640995200000.jpg
        cb(null,
            file.fieldname + '-' +           // Form field adı (örn: 'image')
            Date.now() +                     // Geçerli timestamp (benzersizlik için)
            path.extname(file.originalname)  // Orijinal dosyanın uzantısı (.jpg, .png, etc.)
        );
    }
});

// Dosya tipi kontrolü fonksiyonu - sadece resim dosyalarına izin ver
const fileFilter = (req, file, cb) => {
    // file.mimetype: dosyanın MIME tipi (örn: image/jpeg, image/png)
    // startsWith('image') ile mime tipinin 'image' ile başlayıp başlamadığını kontrol et
    if (file.mimetype.startsWith('image')) {
        // Dosya resim ise işleme devam et
        // cb(error, allowFile) - error: null, allowFile: true
        cb(null, true);
    } else {
        // Dosya resim değilse hata fırlat ve işlemi durdur
        // cb(error, allowFile) - error: Error objesi, allowFile: false
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

// Multer middleware'ini konfigüre et
const upload = multer({ 
    storage: storage,           // Yukarıda tanımlanan depolama konfigürasyonu
    fileFilter: fileFilter,     // Yukarıda tanımlanan dosya tipi kontrolü
    limits: { 
        fileSize: 1024 * 1024 * 5  // Dosya boyutu sınırı: 5MB (1024 byte * 1024 * 5)
    }
});

// Konfigüre edilmiş upload middleware'ini dışa aktarıyoruz
// Bu middleware route'larda .single(), .array(), .fields() metodları ile kullanılır
module.exports = upload;

/*
==========================================================================
MULTER DOSYA YÜKLEME SİSTEMİ
==========================================================================

Multer, multipart/form-data ile gönderilen dosyaları işlemek için kullanılan
Express.js middleware'idir. Bu dosyada resim yükleme için özelleştirilmiştir.

TEMEL KAVRAMLAR:

1. DISK STORAGE:
   - Dosyalar geçici olarak sunucunun local disk'inde saklanır
   - uploads/ klasörü kullanılır
   - Benzersiz dosya isimleri oluşturulur

2. FILE FILTER:
   - Sadece resim dosyalarına (image/*) izin verilir
   - MIME type kontrolü yapılır
   - Güvenlik açıklarını önler

3. SIZE LIMITS:
   - 5MB maksimum dosya boyutu
   - Sunucu kaynaklarını korur
   - DoS saldırılarını önler

KULLANIM YÖNTEMLERİ:

1. SINGLE FILE UPLOAD:
   ```javascript
   router.post('/upload', upload.single('image'), controller);
   // Form field name: 'image'
   // req.file objesinde dosya bilgileri bulunur
   ```

2. MULTIPLE FILES:
   ```javascript
   router.post('/upload', upload.array('images', 5), controller);
   // Maksimum 5 dosya
   // req.files array'inde dosyalar bulunur
   ```

3. MULTIPLE FIELDS:
   ```javascript
   router.post('/upload', upload.fields([
     { name: 'profile', maxCount: 1 },
     { name: 'gallery', maxCount: 5 }
   ]), controller);
   ```

DOSYA BİLGİLERİ (req.file):

Multer, yüklenen dosya hakkında şu bilgileri sağlar:
- fieldname: Form field'ın adı
- originalname: Orijinal dosya adı
- encoding: Dosya encoding'i
- mimetype: MIME tipi (örn: image/jpeg)
- destination: Dosyanın kaydedildiği klasör
- filename: Sunucudaki dosya adı
- path: Dosyanın tam yolu
- size: Dosya boyutu (byte)

GÜVENLİK ÖNLEMLERİ:

1. FILE TYPE VALIDATION:
   - Sadece image MIME types kabul edilir
   - Malicious file upload önlenir

2. SIZE LIMITS:
   - 5MB maksimum boyut
   - Sunucu kaynak korunması

3. FILENAME SANITIZATION:
   - Timestamp ile benzersiz isimler
   - Path traversal saldırıları önlenir

4. TEMPORARY STORAGE:
   - Dosyalar önce geçici olarak saklanır
   - Cloudinary'ye yüklendikten sonra silinir

HATA YÖNETİMİ:

Multer şu hatalari fırlatabilir:
- LIMIT_FILE_SIZE: Dosya boyutu limitini aştı
- LIMIT_FILE_COUNT: Dosya sayısı limitini aştı
- LIMIT_FIELD_KEY: Field name çok uzun
- LIMIT_FIELD_VALUE: Field value çok uzun
- LIMIT_FIELD_COUNT: Çok fazla field
- LIMIT_UNEXPECTED_FILE: Beklenmeyen dosya field'ı

Bu middleware, güvenli ve kontrollü dosya yükleme altyapısı sağlar.
==========================================================================
*/