const mongoose = require('mongoose'); // Mongoose ODM

const productSchema = new mongoose.Schema({ // Ürün şeması
 title: {
  type: String,
  required: true,
 },
 category: {
  type: String,
  required: true,
 },
 price: {
  type: Number,
  required: true,
 },
 inStock: {
  type: Boolean,
  default: true,
 }
});

module.exports = mongoose.model('Product', productSchema); // Model dışa aktarımı

// Özet: Mongoose şeması ve modeli; GraphQL tipleriyle uyumlu alanları içerir.