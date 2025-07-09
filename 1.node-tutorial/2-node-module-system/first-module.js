// 2. MODÜL OLUŞTURMA VE DIŞA AKTARMA
// Matematiksel işlemler modülü - yeniden kullanılabilir fonksiyonlar

/*
=== MODÜL SİSTEMİ NEDİR? ===
Modül sistemi, kodu farklı dosyalara bölerek organize etmemizi sağlar.
- Her dosya bir modüldür
- Fonksiyonları, değişkenleri ve sınıfları dışa aktarabilir
- Başka dosyalardan içe aktararak kullanabiliriz

=== MODULE.EXPORTS NEDİR? ===
Node.js'te modülden dışarıya fonksiyon/veri göndermek için kullanılır.
- module.exports = { } : Obje olarak dışa aktarma
- exports.fonksiyon = ... : Tek tek dışa aktarma
- require() ile başka dosyalarda kullanılır

=== MATEMATİKSEL İŞLEMLER ===
Bu modül temel matematik işlemlerini (toplama, çıkarma, çarpma, bölme) sağlar
*/

// Toplama işlemi: İki sayıyı toplar
// num1: İlk sayı (toplanacak)
// num2: İkinci sayı (toplanacak)
// Döndürür: İki sayının toplamı
function add(num1, num2) {
    return num1 + num2;
}

// Çıkarma işlemi: İlk sayıdan ikinci sayıyı çıkarır
// num1: İlk sayı (çıkarılacak sayı)
// num2: İkinci sayı (çıkartılacak sayı)
// Döndürür: İki sayının farkı
function sub(num1, num2) {
    return num1 - num2;
}

// Çarpma işlemi: İki sayıyı çarpar
// num1: İlk sayı (çarpan)
// num2: İkinci sayı (çarpan)
// Döndürür: İki sayının çarpımı
function mul(num1, num2) {
    return num1 * num2;
}

// Bölme işlemi: İlk sayıyı ikinci sayıya böler
// num1: İlk sayı (bölünen)
// num2: İkinci sayı (bölen)
// Döndürür: İki sayının bölümü veya hata mesajı
function div(num1, num2) {
    // Sıfıra bölme kontrolü - matematiksel olarak tanımsız
    if (num2 === 0) {
        return "sayı 0 olamaz"; // Hata mesajı döndür
    }
    // Normal bölme işlemi
    return num1 / num2;
}

// Fonksiyonları dışa aktarır (export) - başka dosyalarda kullanılabilir
// Object shorthand syntax kullanılıyor: {add: add} yerine {add}
module.exports = { // CommonJS export syntax
    add,    // add: add - ES6 shorthand property
    sub,    // sub: sub - object property assignment 
    mul,    // mul: mul - fonksiyon referansı
    div     // div: div - method export
};

/*
=== KULLANIM ÖRNEĞİ ===
Başka dosyada:
const math = require('./first-module.js');
math.add(5, 3); // 8
math.div(10, 0); // "sayı 0 olamaz"

=== HATA YÖNETİMİ ===
📌 Bölme işleminde sıfıra bölme kontrolü yapılır
📌 Hata durumunda anlamlı mesaj döndürülür
📌 Try-catch yerine basit kontrol kullanılır

=== MODULE.EXPORTS KULLANIMI ===
✨ Tüm fonksiyonları bir obje olarak dışa aktarır
✨ Destructuring ile seçici import yapılabilir
✨ Modül bir kez yüklenip cache'lenir
*/