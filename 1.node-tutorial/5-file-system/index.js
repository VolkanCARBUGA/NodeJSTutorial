// 5. DOSYA SİSTEMİ (FILE SYSTEM) İŞLEMLERİ
// Dosya ve klasör oluşturma, okuma, yazma - Senkron ve Asenkron işlemler

/*
=== FILE SYSTEM MODÜLÜ ===
Node.js'in fs (file system) modülü dosya sistemi işlemleri için kullanılır.
- Dosya okuma/yazma
- Klasör oluşturma/silme
- Dosya/klasör varlık kontrolü
- Meta data bilgileri

=== SENKRON VS ASENKRON ===
Senkron (Sync):
- İşlem tamamlanana kadar bekler
- Blocking (engelleyici) çalışır
- Basit kullanım, hata yönetimi kolay
- Performans problemi oluşturabilir

Asenkron (Async):
- Non-blocking çalışır
- Callback veya Promise kullanır
- Yüksek performans
- Hata yönetimi daha karmaşık

=== ES MODULES (__dirname sorunu) ===
ES modüllerinde __dirname otomatik tanımlı değildir.
import.meta.url ile manual olarak oluşturulur.
*/

// ES module ortamında __dirname üretimi
import { dirname, join } from "path"; // Path modülünden destructuring import
import { fileURLToPath } from "url"; // URL modülünden file URL çevirici

// Modüller - destructuring import ile sadece gerekli fonksiyonları alır
import { log } from "console";
import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync, appendFile } from "fs";

// __dirname tanımı (ESM için)
// ES modüllerinde __dirname otomatik olarak tanımlı değildir, manuel oluşturulur
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Çalışma dizini:", __dirname);

// data klasörünün yolunu oluşturur (__dirname + "/data")
const dataFolder = join(__dirname, "data");

// Eğer data klasörü yoksa oluşturur
// existsSync: Dosya/klasörün var olup olmadığını kontrol eder (senkron)
// mkdirSync: Klasör oluşturur (senkron)
if (!existsSync(dataFolder)) {
    mkdirSync(dataFolder);
    log("Data klasörü oluşturuldu");
} else {
    log("Data klasörü zaten mevcut");
}

// data.txt dosyasının tam yolunu oluşturur
const filePath = join(dataFolder, "data.txt");

// Eğer data.txt dosyası yoksa boş bir dosya oluşturur
// writeFileSync: Dosyaya veri yazar (senkron) - eğer dosya yoksa oluşturur
if (!existsSync(filePath)) {
    writeFileSync(filePath, "İlk satır - dosya oluşturuldu\n");
    log("Data.txt dosyası oluşturuldu");
} else {
    log("Data.txt dosyası zaten mevcut");
}

// data.txt dosyasının içeriğini okur (senkron)
// readFileSync: Dosyayı okur ve içeriğini döndürür
// "utf-8": Metin kodlamasını belirtir (Unicode)
const readData = readFileSync(filePath, "utf-8");

// data.txt dosyasının sonuna yeni bir satır ekler (senkron)
// appendFileSync: Dosyanın sonuna veri ekler (var olan içeriği korur)
const writeData = appendFileSync(filePath, "Yeni satır eklendi - senkron\n");

// data-async.txt dosyasının yolunu oluşturur
const asyncFilePath = join(dataFolder, "data-async.txt");

// data-async.txt dosyasının sonuna yeni bir satır ekler (asenkron)
// appendFile: Asenkron olarak dosyanın sonuna veri ekler
// Callback fonksiyonu ile hata kontrolü yapar
appendFile(asyncFilePath, "Asenkron veri eklendi\n", function (err) {
    if (err) {
        log("Asenkron yazma hatası:", err);
    } else {
        log("Asenkron yazma başarılı");
    }
});

// appendFileSync fonksiyonunun dönüş değeri undefined'dır
log("writeData dönüş değeri:", writeData); // undefined yazdırır

// Okunan dosya içeriğini konsola yazdırır
log("Dosya içeriği:");
log(readData);

/*
=== FILE SYSTEM FONKSİYON TİPLERİ ===

1. Senkron (Sync):
   - readFileSync(), writeFileSync(), appendFileSync()
   - Blocking: İşlem bitene kadar bekler
   - Dönüş değeri var
   - Hata fırlatır (try-catch kullanın)

2. Asenkron (Callback):
   - readFile(), writeFile(), appendFile()
   - Non-blocking: Callback ile sonuç döner
   - Hata callback'in ilk parametresinde

3. Promise-based:
   - fs.promises.readFile()
   - async/await ile kullanılabilir

=== ENCODING (KODLAMA) ===
📌 utf-8: Türkçe karakter desteği için gerekli
📌 ascii: Sadece İngilizce karakterler
📌 base64: Binary data için
📌 Encoding belirtmezseniz Buffer döner

=== HATA YÖNETİMİ ===
Senkron: try-catch kullanın
Asenkron: callback'in err parametresini kontrol edin

=== PERFORMANS İPUÇLARI ===
✨ Büyük dosyalarda stream kullanın
✨ Çok sayıda dosya işleminde asenkron tercih edin
✨ existsSync yerine fs.access() kullanabilirsiniz
✨ Dosya path'lerini path.join() ile oluşturun

=== GÜVENLİK ===
🔒 Kullanıcı girişlerini doğrulamadan dosya yolu olarak kullanmayın
🔒 Path traversal (../) saldırılarını önleyin
🔒 Dosya izinlerini kontrol edin
*/
