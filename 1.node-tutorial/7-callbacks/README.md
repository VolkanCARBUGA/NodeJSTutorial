## Callback'ler ve Asenkronluk (7-callbacks)

### Konu Özeti
Node.js'te asenkron işlemlerin uzun yıllar kullanılan temel deseni: hata-öncelikli (error-first) callback.

### Dosyalar
- `index.js`: Basit callback kullanımı.
- `callback-hell.js`: İç içe geçmiş callback zinciri (callback hell) örneği.

### Önemli Noktalar
- İmza: `function(err, data) { ... }`.
- Hata işleme ve akış kontrolünün zorlaşması (callback hell).

### İpuçları
- `util.promisify` ile callback tabanlı API'leri promise'e dönüştürebilirsiniz.


