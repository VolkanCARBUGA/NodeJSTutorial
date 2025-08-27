const Book = require("../models/book"); // Book modelini içe aktarır
const Author = require("../models/author"); // Author modelini içe aktarır

const createAuthor = async (req, res) => { // Yeni bir yazar oluşturur
    try { // Hata yakalama için try bloğu
        const { name, bio } = req.body; // İstek gövdesinden name ve bio alanlarını alır
        const author = new Author({ name, bio }); // Yeni Author dökümanı oluşturur
        await author.save(); // Yazarı veritabanına kaydeder
        res.status(201).json({ // Başarılı yanıt döner
            success: true, // İşlemin başarılı olduğunu belirtir
            message: "Author created successfully", // Bilgi mesajı
            data: author, // Oluşan yazar dökümanını döner
        });
    } catch (error) { // Hata durumunu yakalar
        console.log(error); // Hata loglar
        res.status(500).json({ // Sunucu hatası yanıtı döner
            success: false, // Başarısız durum bayrağı
            message: "Failed to create author", // Hata mesajı
            error: error.message, // Hata detayını ekler
        });
    }
    
}; // createAuthor sonu

const createBook = async (req, res) => { // Yeni bir kitap oluşturur
    try { // Hata yakalama başlar
      const book = new Book(req.body); // Gövdedeki verilerle yeni Book dökümanı oluşturur
      await book.save(); // Kitabı veritabanına kaydeder

      // Kaydedilen kitabı author bilgisiyle birlikte geri getir
      const populatedBook = await Book.findById(book._id).populate("author"); // Kitabı ID ile çekip author alanını populate eder

      res.status(201).json({ // Başarılı oluşturma yanıtı
        success: true, // Başarılı bayrağı
        data: populatedBook, // Author bilgisiyle birlikte kitap döner
      });
      console.log("book created successfully", book); // Konsola bilgi loglar
    } catch (e) { // Hata yakalanır
      console.log(e); // Hata loglar
      res.status(500).json({ // Sunucu hatası döner
        success: false, // Başarısız bayrağı
        message: "Some error occured", // Genel hata mesajı
      });
    }
  }; // createBook sonu
  
const getBookWithAuthor = async (req, res) => { // ID'ye göre kitabı author ile birlikte getirir
    try { // Hata yakalama
        const book = await Book.findById(req.params.id) // Parametredeki id ile kitabı bulur

            .populate("author"); // author referansını gerçek dökümanla doldurur
        if(!book){ // Kitap bulunamadıysa
            return res.status(404).json({ // 404 döner
                success: false, // Başarısız bayrağı
                message: "Book not found", // Bulunamadı mesajı
            });
        }
        res.status(200).json({ // Başarılı yanıt
            success: true, // Başarılı bayrağı
            message: "Book fetched successfully", // Bilgi mesajı
            data: book, // Kitap verisi (author ile)
        });
    } catch (error) { // Hata yakalama
        console.log(error); // Hata loglar
        res.status(500).json({ // Sunucu hatası yanıtı
            success: false, // Başarısız bayrağı
            message: "Failed to get book with author", // Hata mesajı
            error: error.message, // Hata detayı
        });
    }
}; // getBookWithAuthor sonu

module.exports = { createAuthor ,createBook,getBookWithAuthor}; // Controller fonksiyonlarını dışa aktarır

// Açıklama:
// Bu dosya, Author ve Book için üç HTTP controller'ı içerir: createAuthor yeni bir yazar oluşturur,
// createBook yeni bir kitap oluşturur ve oluşturulan kitabı author alanı populate edilerek geri döner,
// getBookWithAuthor ise verilen id'deki kitabı author referansı çözülmüş haliyle getirir. Hatalar 500 ile yakalanır.