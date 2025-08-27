const mongoose = require("mongoose"); // Mongoose ODM'yi içe aktarır

const bookSchema = new mongoose.Schema({ // Book şemasını tanımlar
    title:String, // Kitabın başlığı
    author: { // Author referansı (ilişki)
        type: mongoose.Schema.Types.ObjectId, // ObjectId türünde
        ref: "author", // Referans verilen koleksiyon/model adı
    },
    
});

module.exports = mongoose.model("Book", bookSchema); // Book modelini dışa aktarır

// Açıklama:
// Book şeması title ve author alanlarını içerir. author, Author modeline referanstır
// ve populate ile gerçek yazar dökümanına dönüştürülebilir.