const mongoose = require("mongoose"); // Mongoose ODM'yi içe aktarır

const productSchema = new mongoose.Schema({ // Product şemasını tanımlar
  name: String, // Ürün adı
  category: String, // Ürün kategorisi
  price: Number, // Fiyat
  inStock: Boolean, // Stok durumu
  tags: [String], // Etiketler listesi
});

const Product = mongoose.model("Product", productSchema); // Product modelini oluşturur

module.exports = Product; // Modeli dışa aktarır

// Açıklama:
// Product şeması basit alanlardan oluşur ve aggregation örneklerinde kullanılır.