/*
==========================================================================
IMAGE CONTROLLER - RESİM YÖNETİM KONTROLCÜSÜ
==========================================================================
Bu dosya resim yükleme, listeleme ve silme işlemlerini yöneten controller fonksiyonlarını içerir.
Cloudinary bulut depolama servisi ile entegre çalışarak güvenli resim yönetimi sağlar.
Admin yetkili kullanıcılar resim yükleyip silebilir, tüm kullanıcılar resimleri görüntüleyebilir.
==========================================================================
*/

// Image modelini import ediyoruz - MongoDB resim verileri için
const Image = require('../models/Image');

// Cloudinary helper fonksiyonunu import ediyoruz - bulut yükleme işlemleri için
const { uploadImageToCloudinary } = require('../helpers/cloudinary-helper');

// Node.js file system modülünü import ediyoruz - geçici dosya silme için
const fs = require('fs');

// Cloudinary API'sini import ediyoruz - buluttan resim silme için
const cloudinary = require('cloudinary').v2;

/*
==========================================================================
RESİM YÜKLEME FONKSİYONU - uploadImage
==========================================================================
Admin kullanıcıların resim yüklemesi için kullanılır
*/
const uploadImage = async (req, res) => {
    try {
        // Dosya yüklenip yüklenmediğini kontrol et
        // req.file multer middleware tarafından eklenir
        if (!req.file) {
            return res.status(400).json({
                success: false,                    // İşlem durumu
                message: 'No image provided'       // Hata mesajı - resim eksik
            });
        }

        // Cloudinary'ye resim yükle ve URL ile publicId al
        // uploadImageToCloudinary helper fonksiyonu kullanılır
        const { url, publicId } = await uploadImageToCloudinary(req.file.path);
        
        // Veritabanına yeni resim kaydı oluştur
        const newImage = new Image({
            url,                                   // Cloudinary'den dönen resim URL'i
            uploadedBy: req.userInfo.userId,       // Yükleyen kullanıcının ID'si (JWT'den gelir)
            publicId                               // Cloudinary'deki resim ID'si (silme için gerekli)
        });
        
        // Resim kaydını veritabanına kaydet
        await newImage.save();
        
        // Geçici dosyayı sunucudan sil (multer ile uploads/ klasörüne kaydedilmişti)
        // Cloudinary'ye yükledikten sonra geçici dosyaya ihtiyaç yok
        fs.unlinkSync(req.file.path);
        
        // Başarılı response döndür
        res.status(201).json({
            success: true,                          // İşlem durumu
            message: 'Image uploaded successfully', // Başarı mesajı
            image: newImage                         // Yüklenen resim bilgileri
        });
    } catch (error) {
        // Hata durumunda error response döndür
        res.status(500).json({ 
            success: false,                         // İşlem durumu
            message: error.message                  // Hata mesajı
        });
    }
};

/*
==========================================================================
RESİMLERİ LİSTELEME FONKSİYONU - fetchImages
==========================================================================
Tüm kullanıcıların resimleri görüntülemesi için kullanılır
Pagination, sorting ve filtering desteği ile
*/
const fetchImages = async (req, res) => {
    try {
        // Query parametrelerinden sayfalama bilgilerini al
        // parseInt ile string'i number'a çevir, varsayılan değerler ata
        const page = parseInt(req.query.page) || 1;           // Hangi sayfa (varsayılan: 1)
        const limit = parseInt(req.query.limit) || 10;        // Sayfa başına kaç resim (varsayılan: 10)
        
        // Skip değerini hesapla - kaç kaydı atlayacağını belirler
        // Örnek: Sayfa 2, limit 10 -> skip = (2-1) * 10 = 10 (ilk 10 kaydı atla)
        const skip = (page - 1) * limit;
        
        // Sıralama parametrelerini al
        const sortBy = req.query.sortBy || 'createdAt';       // Hangi alana göre sırala (varsayılan: oluşturulma tarihi)
        const sortOrder = req.query.sortOrder === 'desc'?1:-1; // Sıralama yönü (desc: azalan, asc: artan)
        
        // Toplam resim sayısını hesapla - pagination için gerekli
        const totalImages = await Image.countDocuments();
        
        // Toplam sayfa sayısını hesapla
        const totalPages = Math.ceil(totalImages / limit);
        
        // Sıralama objesi oluştur - MongoDB sort() metodu için
        const sortObject = {};
        sortObject[sortBy] = sortOrder;
        
        // Veritabanından resimleri çek - sıralama, atlama ve limit ile
        const images = await Image.find().sort(sortObject).skip(skip).limit(limit);
        
        // Resimler bulunduysa başarılı response döndür
        if(images){
            return res.status(200).json({
                success: true,                      // İşlem durumu
                currentPage: page,                  // Mevcut sayfa numarası
                totalPages: totalPages,             // Toplam sayfa sayısı
                totalImages: totalImages,           // Toplam resim sayısı
                images: images                      // Resim listesi
            });
        }
        
    } catch (error) {
        // Hata durumunda error response döndür
        res.status(500).json({
            success: false,                         // İşlem durumu
            message: error.message                  // Hata mesajı
        });
    }
};

/*
==========================================================================
RESİM SİLME FONKSİYONU - deleteImage
==========================================================================
Admin kullanıcıların kendi yüklediği resimleri silmesi için kullanılır
*/
const deleteImage = async (req, res) => {
    try {
        // URL parametresinden silinecek resmin ID'sini al
        const currentImageId = req.params.imageId;
        
        // JWT token'dan mevcut kullanıcının ID'sini al
        const currentUserId = req.userInfo.userId;
        
        // Veritabanından resmi bul
        const image = await Image.findById(currentImageId);
        
        // Resim bulunamazsa 404 error döndür
        if (!image) {
            return res.status(404).json({
                success: false,                     // İşlem durumu
                message: 'Image not found'          // Hata mesajı - resim bulunamadı
            });
        }
        
        // Resmi yükleyen kullanıcı ile mevcut kullanıcıyı karşılaştır
        // toString() ile ObjectId'yi string'e çevir
        if (image.uploadedBy.toString() !== currentUserId) {
            return res.status(403).json({
                success: false,                                     // İşlem durumu
                message: 'Unauthorized to delete this image'       // Hata mesajı - yetki yok
            });
        }
        
        // Cloudinary'den resmi sil - publicId kullanarak
        await cloudinary.uploader.destroy(image.publicId);
        
        // Veritabanından resim kaydını sil
        await Image.findByIdAndDelete(currentImageId);
        
        // Başarılı response döndür
        res.status(200).json({
            success: true,                          // İşlem durumu
            message: 'Image deleted successfully'   // Başarı mesajı
        });
       
    } catch (error) {
        // Hata durumunda error response döndür
        res.status(500).json({
            success: false,                         // İşlem durumu
            message: error.message                  // Hata mesajı
        });
    }
};

// Controller fonksiyonlarını dışa aktarıyoruz
module.exports = { uploadImage, fetchImages, deleteImage };

/*
==========================================================================
RESİM YÖNETİM SİSTEMİ
==========================================================================

Bu controller dosyası, modern web uygulamalarında resim yönetimi için 
gerekli tüm CRUD (Create, Read, Update, Delete) işlemlerini sağlar.

ANA ÖZELLİKLER:

1. GÜVENLİ RESİM YÜKLEME:
   - Sadece admin kullanıcılar yükleyebilir
   - Multer ile dosya upload middleware
   - Cloudinary bulut depolama entegrasyonu
   - Geçici dosya temizliği

2. PAGINATION DESTEKLİ LİSTELEME:
   - Sayfa bazlı resim görüntüleme
   - Özelleştirilebilir sayfa boyutu
   - Toplam sayfa ve resim sayısı bilgisi
   - Sıralama seçenekleri

3. YETKİLENDİRME SİSTEMİ:
   - JWT token ile kullanıcı doğrulama
   - Admin yetkisi kontrolü
   - Kendi yüklediği resimleri silme yetkisi

4. BULUT DEPOLAMA ENTEGRASYONU:
   - Cloudinary ile güvenli resim saklama
   - Otomatik resim optimizasyonu
   - CDN ile hızlı erişim
   - PublicId ile resim referansları

ENDPOINT YAPISI:

1. POST /api/images/upload
   - Admin yetkisi gerekli
   - Multipart/form-data ile resim upload
   - Cloudinary'ye yükleme ve DB'ye kayıt

2. GET /api/images/fetch
   - Tüm kullanıcılar erişebilir
   - Query parameters: page, limit, sortBy, sortOrder
   - Pagination ve sıralama desteği

3. DELETE /api/images/delete/:imageId
   - Admin yetkisi gerekli
   - Sadece kendi yüklediği resimleri silebilir
   - Cloudinary ve DB'den eşzamanlı silme

GÜVENLIK ÖNLEMLERİ:
- JWT token doğrulama
- Role-based access control
- File type validation
- File size limits
- Ownership verification for delete

Bu sistem, güvenli ve ölçeklenebilir resim yönetimi sağlar.
==========================================================================
*/