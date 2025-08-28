const products = require('../data/products'); // Mock ürün verilerini içe aktar

const resolvers = { // Resolver haritası: Query ve Mutation alanlarının iş mantığı
    Query: {
        products: () => products, // Tüm ürünleri döndür
        product: (_, { id }) => products.find(product => String(product.id) === String(id)), // ID ile tek ürün bul
    },
    Mutation: {
        createProduct: (_, { title, category, price, inStock }) => { // Ürün oluştur
            const newProduct = { id: products.length + 1, title, category, price, inStock };
            products.push(newProduct); // Mock dizisine ekle (kalıcı değildir)
            return newProduct; // Eklenen ürünü döndür
        },
        updateProduct: (_, { id, ...updates }) => { // Ürün güncelle
            const index = products.findIndex(product => String(product.id) === String(id)); // Güncellenecek ürünü bul
            if (index === -1) {
              return null; // Bulunamazsa null döndür (şema ile uyumlu)
            }
            const updatedProduct = { ...products[index], ...updates }; // Alanları birleştir
            products[index] = updatedProduct; // Dizide güncelle
            return updatedProduct; // Güncel ürünü döndür
        },
        deleteProduct: (_, { id }) => { // Ürün sil
            const index = products.findIndex(product => String(product.id) === String(id)); // Silinecek ürünü bul
            if (index === -1) {
                return false; // Yoksa başarısızlık
            }
            products.splice(index, 1); // Ürünü diziden çıkar
            return true; // Başarıyı doğrula
        }
       
    },
};

module.exports = resolvers; // Dışa aktar

// Özet: Bu resolver'lar bellek içindeki ürün listesi üzerinde CRUD işlemleri sağlar.