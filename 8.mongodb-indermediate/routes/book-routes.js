const express = require("express"); // Express framework'ünü içe aktarır
const router = express.Router(); // Router örneği oluşturur
const { createAuthor, createBook,getBookWithAuthor } = require("../controllers/book-controller"); // İlgili controller fonksiyonlarını alır

router.post("/create-author", createAuthor); // Yeni yazar oluşturma endpoint'i
router.post("/create-book", createBook); // Yeni kitap oluşturma endpoint'i
router.get("/book/:id", getBookWithAuthor); // ID ile kitabı author'u ile getirme endpoint'i
module.exports = router; // Router'ı dışa aktarır

// Açıklama:
// Bu router, author ve book işlemleri için 3 endpoint tanımlar: yazar oluşturma,
// kitap oluşturma ve belirli bir kitabı author bilgisiyle birlikte getirme.