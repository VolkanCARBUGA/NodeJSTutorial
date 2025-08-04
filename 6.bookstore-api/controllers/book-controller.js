/*
==========================================================================
BOOK CONTROLLER - KİTAP İŞLEMLERİ YÖNETİCİSİ
==========================================================================
Bu dosya kitap ile ilgili tüm CRUD (Create, Read, Update, Delete) 
işlemlerini yöneten controller fonksiyonlarını içerir.
Her fonksiyon HTTP isteklerini işleyip uygun yanıtlar döndürür.
==========================================================================
*/

// Book modelini import ediyoruz - veritabanı işlemleri için
const Book=require('../models/Book');

// TÜM KİTAPLARI GETIR - GET /api/books
// Veritabanındaki tüm kitapları JSON formatında döndürür
const getAllBooks=async(req,res)=>{
    try {
        // Book.find() - tüm kitapları veritabanından çeker
        // await kullanıyoruz çünkü bu asenkron bir işlem
        const allBooks=await Book.find();
        
        // 200 OK status ile başarılı yanıt döndürüyoruz
        res.status(200).json({
            success:true,                           // İşlem başarı durumu
            message:"All books fetched successfully", // Başarı mesajı
            books:allBooks                          // Kitap listesi
        });
    } catch (error) {
        // Hata durumunda 500 Internal Server Error döndürüyoruz
        res.status(500).json({
            success:false,                          // İşlem başarı durumu
            message:"Internal server error",       // Genel hata mesajı
            error:error.message                     // Detaylı hata bilgisi
        });
    }
}

// TEK KİTAP GETIR - GET /api/books/:id
// URL parametresinden alınan ID ile belirli bir kitabı getirir
const getBookById=async(req,res)=>{
    try {
        // URL'den kitap ID'sini alıyoruz (route parameter)
        // req.params.id - Express'te :id parametresine karşılık gelir
        const bookId=req.params.id;
        
        // MongoDB ObjectId ile kitabı buluyoruz
        // findById - ID'ye göre tek doküman bulma metodu
        const book=await Book.findById(bookId);
        
        // Kitap bulunamazsa 404 Not Found hatası döndürüyoruz
        if(!book){
            return res.status(404).json({
                success:false,                      // İşlem başarı durumu
                message:"Book not found"           // Hata mesajı
            });
        }
        
        // Kitap bulunduysa 200 OK ile kitap bilgilerini döndürüyoruz
        res.status(200).json({
            success:true,                           // İşlem başarı durumu  
            message:"Book fetched successfully",   // Başarı mesajı
            book:book                              // Bulunan kitap verisi
        });
    } catch (error) {
        // Genel hata durumu (geçersiz ObjectId, veritabanı hatası vb.)
        res.status(500).json({
            success:false,                          // İşlem başarı durumu
            message:"Internal server error",       // Genel hata mesajı
            error:error.message                     // Detaylı hata bilgisi
        });
    }
}

// YENİ KİTAP EKLE - POST /api/books/add
// Request body'den gelen verilerle yeni kitap oluşturur
const addNewBook=async(req,res)=>{
    try {
        // Request body'den kitap verilerini alıyoruz
        // req.body - POST isteğinde gönderilen JSON veriler
        const newBookFormData=req.body;
        
        // Book.create() - yeni kitap belgesi oluşturup veritabanına kaydeder
        // Bu işlem hem doğrulama yapar hem de kaydeder
        const newBook=await Book.create(newBookFormData);
        
        // Kitap oluşturulamazsa (validation hatası vb.) 400 Bad Request
        if(!newBook){
            return res.status(400).json({
                success:false,                      // İşlem başarı durumu
                message:"Invalid book data"        // Hata mesajı
            });
        }
        
        // Başarılı oluşturma durumunda 201 Created status code
        res.status(201).json({
            success:true,                           // İşlem başarı durumu
            message:"Book created successfully",   // Başarı mesajı
            book:newBookFormData                   // Oluşturulan kitap verisi
        });
    } catch (error) {
        // Hata durumu (validation hatası, veritabanı hatası vb.)
        res.status(500).json({
            success:false,                          // İşlem başarı durumu
            message:"Internal server error",       // Genel hata mesajı
            error:error.message                     // Detaylı hata bilgisi
        });
    }
}

// KİTAP GÜNCELLE - PUT /api/books/:id  
// Mevcut kitabın bilgilerini request body'deki verilerle günceller
const updateBook=async(req,res)=>{
    try {
        // URL'den güncellenecek kitabın ID'sini alıyoruz
        const bookId=req.params.id;
        
        // Request body'den güncellenmiş kitap verilerini alıyoruz
        const updatedBookFormData=req.body;
        
        // findByIdAndUpdate - ID'ye göre bulup güncelleme yapar
        // {new: true} - güncellenmiş dokümanı döndürür (eski hali yerine)
        const updatedBook=await Book.findByIdAndUpdate(bookId,updatedBookFormData,{new:true});
        
        // Kitap bulunamazsa 404 Not Found hatası
        if(!updatedBook){
            return res.status(404).json({
                success:false,                      // İşlem başarı durumu
                message:"Book not found"           // Hata mesajı
            });
        }
        
        // Başarılı güncelleme durumunda 200 OK
        res.status(200).json({
            success:true,                           // İşlem başarı durumu
            message:"Book updated successfully",   // Başarı mesajı
            book:updatedBook                       // Güncellenmiş kitap verisi
        });
       
    } catch (error) {
        // Hata durumu (geçersiz ID, validation hatası vb.)
        res.status(500).json({
            success:false,                          // İşlem başarı durumu
            message:"Internal server error",       // Genel hata mesajı
            error:error.message                     // Detaylı hata bilgisi
        });
    }
}

// KİTAP SİL - DELETE /api/books/:id
// URL parametresindeki ID'ye sahip kitabı veritabanından siler
const deleteBook=async(req,res)=>{
    try {
        // URL'den silinecek kitabın ID'sini alıyoruz
        const bookId=req.params.id;
        
        // findByIdAndDelete - ID'ye göre bulup siler
        // Silinen dokümanı geri döndürür
        const deletedBook=await Book.findByIdAndDelete(bookId);
        
        // Kitap bulunamazsa 404 Not Found hatası
        if(!deletedBook){
            return res.status(404).json({
                success:false,                      // İşlem başarı durumu
                message:"Book not found"           // Hata mesajı
            });
        }
        
        // Başarılı silme durumunda 200 OK
        res.status(200).json({
            success:true,                           // İşlem başarı durumu
            message:"Book deleted successfully",   // Başarı mesajı
            book:deletedBook                       // Silinen kitap verisi
        });
    } catch (error) {
        // Hata durumu (geçersiz ID, veritabanı hatası vb.)
        res.status(500).json({
            success:false,                          // İşlem başarı durumu
            message:"Internal server error",       // Genel hata mesajı
            error:error.message                     // Detaylı hata bilgisi
        });
    }
}

// Tüm controller fonksiyonlarını object olarak dışa aktarıyoruz
// Bu fonksiyonlar route dosyasında import edilip kullanılacak
module.exports={
    getAllBooks,    // Tüm kitapları listele
    getBookById,    // Tek kitap getir
    addNewBook,     // Yeni kitap ekle
    updateBook,     // Kitap güncelle
    deleteBook,     // Kitap sil
}

/*
==========================================================================
CONTROLLER TASARIM PRENSİPLERİ
==========================================================================

1. SEPARATION OF CONCERNS:
   - Her fonksiyon tek bir sorumluluğa sahip
   - İş mantığı controller'da, veri erişimi model'da
   - Route'lar sadece HTTP isteklerini yönlendirir

2. ERROR HANDLING:
   - Try-catch blokları ile hata yakalama
   - Uygun HTTP status kodları kullanımı
   - Kullanıcı dostu hata mesajları
   - Geliştirici için detaylı hata bilgileri

3. HTTP STATUS CODES:
   - 200 OK: Başarılı işlem
   - 201 Created: Başarılı oluşturma
   - 400 Bad Request: Hatalı istek
   - 404 Not Found: Kaynak bulunamadı
   - 500 Internal Server Error: Sunucu hatası

4. RESPONSE FORMAT:
   - Tutarlı JSON response yapısı
   - success: boolean işlem durumu
   - message: Açıklayıcı mesaj
   - data: İşlem sonucu veriler
   - error: Hata detayları (varsa)

5. ASYNC/AWAIT KULLANIMI:
   - Tüm veritabanı işlemleri asenkron
   - Promise tabanlı hata yönetimi
   - Clean kod yapısı

Bu controller, RESTful API prensiplerini takip eder ve
güvenilir kitap yönetimi sağlar.
==========================================================================
*/