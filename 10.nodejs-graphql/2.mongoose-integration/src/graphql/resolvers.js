const Product = require('../models/product'); // Mongoose Product modeli

const resolvers = { // Resolver haritası: MongoDB üzerinden CRUD
    Query: {
        products:async () => await Product.find(), // Tüm ürünleri getir
        product: async (_, { id }) => await Product.findById(id), // ID ile tek ürün getir
    },
    Mutation: {
        createProduct: async (_, { title, category, price, inStock }) => { // Ürün oluştur
            const newProduct = new Product({ title, category, price, inStock });
            return await newProduct.save(); // Kaydet ve döndür
        },
        updateProduct: async (_, { id, title, category, price, inStock }) => { // Ürün güncelle
            const updatedProduct = await Product.findByIdAndUpdate(
              id,
              { title, category, price, inStock },
              { new: true }
            );
            return updatedProduct; // Güncel ürünü döndür
        },
        deleteProduct: async (_, { id }) => { // Ürün sil
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct; // Silinen dokümanı (veya null) döndür
        }
       
    },
};

module.exports = resolvers; // Dışa aktar

// Özet: Resolver'lar Mongoose modeli üzerinden veritabanı CRUD işlemlerini gerçekleştirir.