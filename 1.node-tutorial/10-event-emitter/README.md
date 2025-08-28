## EventEmitter (10-event-emitter)

### Konu Özeti
Node.js'in olay tabanlı mimarisi ve `events` modülündeki `EventEmitter` sınıfı ile özel olaylar üretme/dinleme.

### Dosyalar
- `index.js`: EventEmitter örneği ve basit olay dinleme.
- `custom-listener.js`: Özel dinleyici fonksiyonlar ve parametrelerle olay yayını.

### Önemli Noktalar
- `emitter.on`, `emitter.emit`, `once`.
- Sıralama, dinleyici kaldırma (`removeListener`) ve bellek sızıntısı uyarıları.

### İpuçları
- Çok sayıda dinleyici eklerken `setMaxListeners` ile uyarıları yönetin.


