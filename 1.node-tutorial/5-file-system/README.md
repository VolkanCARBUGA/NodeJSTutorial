## Dosya Sistemi (fs) (5-file-system)

### Konu Özeti
`fs` modülü ile senkron/asenkron dosya okuma-yazma, klasör işlemleri ve veri akışları.

### Dosyalar
- `data/data.txt`, `data/data-async.txt`: Örnek veri dosyaları.
- `index.js`: `readFile`, `writeFile` ve senkron/asenkron farklarının gösterimi.

### Önemli Noktalar
- Senkron metodlar olay döngüsünü bloklar; üretimde asenkron tercih edilir.
- Hata ilk (error-first) callback deseni.

### İpuçları
- Büyük dosyalar için `fs.createReadStream`/`createWriteStream` ve `pipe` kullanın.


