const mongoose = require("mongoose"); // Mongoose ODM'yi içe aktarır

const authorSchema = new mongoose.Schema({ // Author şemasını tanımlar
    name:String, // Yazarın adı
    bio:String, // Yazarın kısa biyografisi
});

module.exports = mongoose.model("Author", authorSchema); // Author modelini dışa aktarır

// Açıklama:
// Basit bir Author şemasıdır; name ve bio alanlarından oluşur.