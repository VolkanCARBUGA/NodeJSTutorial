## HTTP Modülü (6-http-module)

### Konu Özeti
Node'un yerleşik `http` modülü ile temel web sunucusu kurma, istek/yanıt (req/res) döngüsü ve basit yönlendirme.

### Dosyalar
- `server.js`: Sunucu kurulumu (`http.createServer`).
- `routes.js`: URL bazlı yönlendirme ve içerik üretimi.

### Önemli Noktalar
- `req.method`, `req.url` ile routing.
- `res.writeHead` ile durum kodu ve başlıklar.
- Akış (stream) olarak yanıt yazma.

### İpuçları
- Basit projeler için `http` yeterlidir; daha büyük uygulamalarda Express tercih edilir.


