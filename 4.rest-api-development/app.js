/*
==========================================================================
REST API GELİŞTİRME PROJESİ - CRUD İŞLEMLERİ
==========================================================================
Bu proje, Express.js kullanarak basit bir REST API oluşturmayı öğretir.
CRUD operasyonları (Create, Read, Update, Delete) implementasyonu içerir.
Kitap koleksiyonu üzerinde HTTP metotları ile veri işlemleri yapılır.
==========================================================================
*/

// Express.js framework'ünü import ediyoruz - web sunucusu oluşturmak için
const express = require("express");

// Express uygulaması oluşturuyoruz - ana uygulama objesi
const app = express();

// Sunucunun çalışacağı port numarası - localhost:3000
const PORT = 3000;

/*
==========================================================================
MİDDLEWARE AYARLARI
==========================================================================
*/
// JSON verilerini parse etmek için middleware - gelen POST/PUT isteklerindeki
// JSON formatındaki verileri req.body objesine çevirir
app.use(express.json());

/*
==========================================================================
VERİ DEPOLAMA (In-Memory Database)
==========================================================================
*/
// Geçici veri deposu - uygulama yeniden başlatıldığında veriler kaybolur
// Gerçek uygulamalarda MongoDB, PostgreSQL gibi veritabanları kullanılır
let books = [
    {id: 1, title: "Book 1", author: "Author 1"},
    {id: 2, title: "Book 2", author: "Author 2"},
    {id: 3, title: "Book 3", author: "Author 3"},
];

/*
==========================================================================
REST API ENDPOINT'LERİ - CRUD İŞLEMLERİ
==========================================================================
*/

// ROOT ENDPOINT - API'nin çalıştığını kontrol etmek için
// GET / - Ana sayfa, API'nin aktif olduğunu gösterir
app.get("/", (req, res) => {
    res.json({message: "Welcome to our books  API"});
});

/*
READ İŞLEMLERİ (Veri Okuma)
--------------------------------------------------------------------------
*/

// TÜM KİTAPLARI LİSTELE - GET /books
// Tüm kitapları JSON formatında döndürür
app.get("/books", (req, res) => {
    res.json(books);
});

// TEK KİTAP DETAYI - GET /book/:id
// URL parametresinden ID alır ve o ID'ye sahip kitabı bulur
app.get("/book/:id", (req, res) => {
    // URL'den gelen parametre string olduğu için parseInt ile sayıya çeviriyoruz
    const bookId = req.params.id;
    // Array.find() metodu ile ID eşleşen kitabı buluyoruz
    const book = books.find((book) => book.id === parseInt(bookId));
    
    // Kitap bulunamazsa 404 Not Found hatası döndürüyoruz
    if (!book) {
        return res.status(404).json({message: "Book not found Please try again"});
    }
    // Kitap bulunursa 200 OK ile kitap bilgilerini döndürüyoruz
    res.status(200).json({ message: "istek başarılı", book});
});

/*
CREATE İŞLEMİ (Veri Ekleme)
--------------------------------------------------------------------------
*/

// YENİ KİTAP EKLE - POST /add
// Yeni kitap oluşturur ve listeye ekler
app.post("/add", (req, res) => {
    // Yeni kitap objesi oluşturuyoruz
    // ID otomatik artırılır (basit yaklaşım)
    const newBook ={
        id: books.length + 1,  // Son ID + 1
        title: "Book" + (books.length + 1),    // Otomatik başlık
        author: "Author" + (books.length + 1), // Otomatik yazar
    }
    // Yeni kitabı diziye ekliyoruz
    books.push(newBook);
    // 201 Created status code ile başarı mesajı döndürüyoruz
    res.status(201).json({message: "Book created successfully", book: newBook});
});

/*
UPDATE İŞLEMİ (Veri Güncelleme)
--------------------------------------------------------------------------
*/

// KİTAP GÜNCELLE - PUT /update/:id
// Mevcut kitabın bilgilerini günceller
app.put("/update/:id", (req, res) => {
    const bookId = req.params.id;
    // Güncellenecek kitabı buluyoruz
    const book = books.find((book) => book.id === parseInt(bookId));
    
    // Kitap bulunamazsa hata döndürüyoruz
    if (!book) {
        return res.status(404).json({message: "Book not found Please try again"});
    }else{
        // Mevcut kitap bilgilerini güncelliyoruz
        // req.body'den gelen veriler varsa onları kullan, yoksa eskisini koru
        book.title = req.body && req.body.title ? req.body.title : book.title;
        book.author = req.body && req.body.author ? req.body.author : book.author;
        // 200 OK ile güncellenmiş kitap bilgilerini döndürüyoruz
        res.status(200).json({message: "Book updated successfully",data: book});
    }
});

/*
DELETE İŞLEMİ (Veri Silme)
--------------------------------------------------------------------------
*/

// KİTAP SİL - DELETE /delete/:id
// Belirtilen ID'ye sahip kitabı siler
app.delete("/delete/:id", (req, res) => {
    const bookId = req.params.id;
    // Silinecek kitabın index'ini buluyoruz
    const bookIndex = books.findIndex((book) => book.id === parseInt(bookId));
    
    // Kitap bulunamazsa hata döndürüyoruz
    if (bookIndex === -1) {
        return res.status(404).json({message: "Book not found Please try again"});
    }
    // splice() metodu ile kitabı diziden çıkarıyoruz ve silinen kitabı alıyoruz
    const deletedBook = books.splice(bookIndex, 1)[0];
    // 200 OK ile silinen kitap bilgilerini döndürüyoruz
    res.status(200).json({message: "Book deleted successfully", book: deletedBook});
});

/*
==========================================================================
SUNUCU BAŞLATMA
==========================================================================
*/
// Express sunucusunu belirtilen port'ta başlatıyoruz
// Sunucu başladığında konsola mesaj yazdırıyoruz
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
==========================================================================
API KULLANIM ÖRNEKLERİ
==========================================================================

1. Tüm kitapları listele:
   GET http://localhost:3000/books

2. Tek kitap getir:
   GET http://localhost:3000/book/1

3. Yeni kitap ekle:
   POST http://localhost:3000/add

4. Kitap güncelle:
   PUT http://localhost:3000/update/1
   Body: {"title": "Yeni Başlık", "author": "Yeni Yazar"}

5. Kitap sil:
   DELETE http://localhost:3000/delete/1

==========================================================================
HTTP STATUS KODLARI KULLANILAN
==========================================================================
200 OK - Başarılı işlem
201 Created - Başarılı oluşturma
404 Not Found - Kaynak bulunamadı
400 Bad Request - Hatalı istek
==========================================================================
*/


