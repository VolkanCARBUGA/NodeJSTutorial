## Kitaplık REST API (6.bookstore-api)

Bu proje, Express.js ve MongoDB (Mongoose) kullanarak kitap kaynağı için tam bir CRUD API sunar.

- **Model**: `models/Book.js` ile kitap şeması ve doğrulamalar.
- **Controller**: `controllers/book-controller.js` iş mantığı.
- **Routes**: `routes/book-routes.js` uç noktalar (CRUD).
- **DB Bağlantısı**: `database/db.js` üzerinden MongoDB bağlantısı.

### Çalıştırma
```bash
npm install
node server.js
```

### Öğrenme Hedefi
Mongoose ile modelleme, Express ile katmanlı (model-controller-route) mimaride REST API geliştirmek.


