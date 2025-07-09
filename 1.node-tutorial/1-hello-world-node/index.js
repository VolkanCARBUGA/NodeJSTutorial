// 1. HELLO WORLD - NODE.JS TEMELLERİ
// Node.js'in temel komutları ve zamanlayıcı fonksiyonları

/*
=== NODE.JS NEDİR? ===
Node.js, JavaScript'i tarayıcı dışında (sunucu tarafında) çalıştırmamızı sağlayan 
bir runtime ortamıdır. V8 JavaScript motoru üzerine kuruludur.

=== TEMEL KOMUTLAR ===
- console.log(): Konsola veri yazdırmak için kullanılır
- setTimeout(): Belirtilen süre sonra bir kez çalışır
- setInterval(): Belirtilen aralıklarla sürekli çalışır  
- setImmediate(): Mevcut olay döngüsü sonrası hemen çalışır
*/

// Konsola "Hello World" mesajını yazdırır
// Bu Node.js'te en temel çıktı alma yöntemidir
console.log("Hello World");

// 1'den 5'e kadar sayılardan oluşan bir dizi tanımlar
const array=[1,2,3,4,5]; // Array literal syntax ile dizi oluşturma

// Tanımlanan diziyi konsola yazdırır
console.log(array); // Diziyi konsola tam olarak yazdırır: [1, 2, 3, 4, 5]

/* 
=== ZAMANLAYICI FONKSİYONLARI ===
Node.js'te asenkron işlemler için kullanılan temel fonksiyonlar
*/

// setTimeout: Belirtilen süre (3000 milisaniye = 3 saniye) sonra bir kez çalışır
// Asenkron bir fonksiyondur - program bu satırda durmaz, devam eder
setTimeout(() => {
    console.log("After 3 seconds");
}, 3000);

// setInterval: Belirtilen aralıklarla (3000 milisaniye = 3 saniye) sürekli çalışır
// Bu fonksiyon programı sonsuza kadar çalıştırır, durdurulması gerekir
setInterval(() => {
    console.log("Every 3 seconds");
}, 3000);

// setImmediate: Mevcut olay döngüsü (event loop) tamamlandıktan sonra hemen çalışır
// setTimeout(fn, 0)'dan farklı olarak gerçekten "hemen" çalışır
setImmediate(() => {
    console.log("Immediate");
});

/*
=== ÇALIŞMA SIRASI ===
1. "Hello World" - Hemen yazdırılır
2. [1,2,3,4,5] - Hemen yazdırılır  
3. "Immediate" - Event loop sonrası hemen yazdırılır
4. "After 3 seconds" - 3 saniye sonra bir kez yazdırılır
5. "Every 3 seconds" - 3 saniye aralıklarla sürekli yazdırılır

=== ÖNEMLİ NOTLAR ===
📌 setTimeout ve setInterval asenkron çalışır
📌 setImmediate, setTimeout(fn, 0)'dan daha hızlıdır
📌 setInterval sürekli çalışır, clearInterval() ile durdurulmalıdır
📌 Node.js single-threaded ama asenkron çalışır
*/