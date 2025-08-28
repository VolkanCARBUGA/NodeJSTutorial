## Kimlik Doğrulama ve Yetkilendirme (7.nodejs-auth)

Bu proje, JWT tabanlı kimlik doğrulama ve rol tabanlı yetkilendirme örneği içerir. Ayrıca Cloudinary ile görsel yükleme akışı sunar.

- **Auth**: `controllers/auth-controller.js`, `middleware/auth-middleware.js` (JWT doğrulama).
- **Rol Yönetimi**: `middleware/admin-middleware.js` ile admin koruması.
- **Yükleme**: `middleware/upload-middleware.js`, `helpers/cloudinary-helper.js` ve `config/cloudinary.js` ile medya yönetimi.
- **Modeller**: `models/User.js`, `models/Image.js`.

### Çalıştırma
```bash
npm install
node server.js
```

Çevresel değişkenler (örnek):
```
JWT_SECRET=... 
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Öğrenme Hedefi
JWT ile giriş/çıkış, korumalı rotalar ve rol tabanlı erişim kontrolünü uygulamak; dosya yüklemeyi harici servisle entegre etmek.


