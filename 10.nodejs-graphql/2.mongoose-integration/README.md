## GraphQL + Mongoose Entegrasyonu

Bu klasör, GraphQL API'nin MongoDB ile nasıl kalıcı hale getirileceğini gösterir. Apollo Server üzerinde Mongoose modeli kullanılarak CRUD işlemleri yapılır.

### Dosya Yapısı
- `src/server.js`: Apollo Server kurulumu, `.env` ile `MONGO_URL` okunur, DB bağlantısı yapılır.
- `src/database/db.js`: Mongoose ile MongoDB bağlantısı.
- `src/models/product.js`: `Product` Mongoose modeli (title, category, price, inStock).
- `src/graphql/schema.js`: GraphQL tipleri ve Query/Mutation tanımlar.
- `src/graphql/resolvers.js`: Mongoose modeli üzerinden CRUD resolver'ları.

### Ortam Değişkenleri
`.env` dosyasına örnek:
```
PORT=4000
MONGO_URL=mongodb://localhost:27017/graphql_tutorial
```

### Kurulum ve Çalıştırma
```bash
npm install
npm start
```

### Örnek GraphQL Sorguları
```graphql
# Listeleme
query {
  products {
    id
    title
    category
    price
    inStock
  }
}

# Oluşturma
mutation {
  createProduct(title:"Pen", category:"Office", price:5.5, inStock:true) {
    id
    title
  }
}
```

### Notlar
- `deleteProduct` resolver'ı silinen dokümanı döndürür; şema `Boolean` bekliyorsa buna göre uyumlu hale getirilebilir.
- Mongoose `findByIdAndUpdate` içinde `{ new: true }` güncel dokümanı döndürmeyi sağlar.


