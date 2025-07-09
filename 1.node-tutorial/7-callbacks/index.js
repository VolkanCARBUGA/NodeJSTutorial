// 7. CALLBACK FONKSİYONLARI KULLANIMI
// Asenkron işlemler ve fonksiyon parametreleri - callback pattern

/*
=== CALLBACK NEDİR? ===
Callback, başka bir fonksiyona parametre olarak geçirilen ve belirli bir zamanda 
çağrılan fonksiyondur.
- Higher-order functions ile kullanılır
- Asenkron işlemlerde sonuç bildirimi için
- Event handling için yaygın kullanım
- Functional programming'in temel taşı

=== CALLBACK PATTERN ===
function mainFunction(parameter, callback) {
    // İşlemler...
    callback(result); // Callback'i çağır
}

=== ASENKRON CALLBACK'LER ===
Node.js'te dosya işlemleri, ağ istekleri gibi I/O operasyonları
asenkron çalışır ve callback ile sonuç bildirir.

=== CALLBACK AVANTAJLARI ===
✨ Non-blocking kod yazımı
✨ Event-driven programming
✨ Modüler kod yapısı
✨ Fonksiyonel programlama desteği
*/

// Dosya sistemi modülünü içe aktarır
import fs from "fs"; // File System modülü - dosya işlemleri için

// Callback fonksiyonu alan örnek fonksiyon
// name: İsim parametresi
// callbackFn: Callback olarak çalıştırılacak fonksiyon
function person(name, callbackFn){
    console.log(`Merhaba ${name}!`); // İsmi selamlama
    
    // Callback fonksiyonunu çalıştır
    // Bu pattern sayesinde person fonksiyonu esnek hale gelir
    callbackFn(); 
}

// Adres bilgilerini gösteren fonksiyon (callback olarak kullanılacak)
// Bu fonksiyon person() tarafından çağrılacak
function address(){
    console.log("Adres bilgileri gösteriliyor..."); 
    console.log("Şehir: İstanbul, Ülke: Türkiye");
}

// İş bilgilerini gösteren başka bir callback fonksiyonu
function jobInfo(){
    console.log("İş bilgileri gösteriliyor...");
    console.log("Meslek: Yazılım Geliştirici");
}

// person fonksiyonunu farklı callback'lerle kullanım örnekleri
console.log("=== CALLBACK ÖRNEKLERİ ===");

// person fonksiyonunu çağırır, address fonksiyonunu callback olarak geçer
person("Volkan", address);

console.log("---");

// Aynı person fonksiyonunu farklı callback ile kullanır
person("Ayşe", jobInfo);

console.log("---");

// Anonymous (anonim) callback fonksiyon kullanımı
person("Mehmet", function(){
    console.log("Anonim callback çalıştı!");
    console.log("Bu fonksiyon sadece bu çağrıda kullanılır.");
});

console.log("---");

// Arrow function ile callback kullanımı (ES6)
person("Fatma", () => {
    console.log("Arrow function callback çalıştı!");
    console.log("Modern JavaScript syntax'ı.");
});

console.log("\n=== ASENKRON DOSYA İŞLEMLERİ ===");

// Asenkron dosya okuma işlemi (callback ile)
// input.txt dosyasını UTF-8 kodlamasıyla okur
fs.readFile("input.txt", "utf-8", (err, data) => {
    // Hata kontrolü - eğer hata varsa (dosya bulunamadı, izin hatası vb.)
    if(err){
        console.error("Dosya okuma hatası:", err.message); 
        return; // Fonksiyondan çık
    } else {
        // Başarılı okuma durumunda dosya içeriğini yazdır
        console.log("Dosya başarıyla okundu!");
        console.log("İçerik:", data);
    }
});

// Bu satır dosya okuma işleminden önce çalışabilir (asenkron)
console.log("Dosya okuma işlemi başlatıldı... (bu mesaj önce görünebilir)");

/*
=== CALLBACK HELL PROBLEMİ ===
İç içe geçmiş callback'ler kodun okunmasını zorlaştırır:

fs.readFile('file1.txt', (err, data1) => {
    if (err) throw err;
    fs.readFile('file2.txt', (err, data2) => {
        if (err) throw err;
        fs.readFile('file3.txt', (err, data3) => {
            // Bu yapı "Pyramid of Doom" olarak bilinir
        });
    });
});

=== CALLBACK HELL ÇÖZÜMLERI ===
1. Named functions kullanma
2. Promise'ler (ES6)
3. Async/await (ES2017)
4. Modüler fonksiyon yapısı

=== ERROR-FIRST CALLBACK PATTERN ===
Node.js'te standart callback pattern:
callback(error, result)
- İlk parametre hata (varsa)
- İkinci parametre sonuç (başarıysa)

=== CALLBACK BESTt PRACTICES ===
📌 Her zaman hata kontrolü yapın
📌 Early return pattern kullanın (if error return)
📌 Named functions kullanarak callback hell'den kaçının
📌 Callback'i sadece bir kez çağırın
📌 Error handling'i ihmal etmeyin

=== MODERN ALTERNATİFLER ===
✨ Promise API: fs.promises.readFile()
✨ Async/await syntax
✨ Util.promisify() ile callback'leri Promise'e çevirme
*/

