// 2. NODE.JS MODULE WRAPPER EXPLORER
// Module wrapper'ın çalışmasını gözlemlemek için örnek modül

/*
=== WRAPPER EXPLORER NEDİR? ===
Bu dosya module wrapper'ın nasıl çalıştığını göstermek için tasarlanmıştır.
- Modül yüklendiğinde otomatik çalışan kodlar
- __filename ve __dirname değerlerini gösterme
- Export edilen fonksiyonların tanımlanması

=== MODÜL YÜKLENMESİ ===
Bu modül require() ile çağrıldığında:
1. Wrapper fonksiyonu otomatik çalışır
2. Console.log'lar hemen yazdırılır
3. greet fonksiyonu dışa aktarılır
4. Modül cache'e alınır (bir kez yüklenir)
*/

// Modülün yüklendiğini gösteren mesaj
// Bu modül require edildiğinde ilk çalışacak kod
console.log("wrapper-explorer modülü yüklendi");

// Bu dosyanın tam yolunu gösterir
// __filename wrapper tarafından otomatik sağlanır
console.log("wrapper-explorer __filename:", __filename);

// Bu dosyanın bulunduğu klasörün yolunu gösterir
// __dirname wrapper tarafından otomatik sağlanır  
console.log("wrapper-explorer __dirname:", __dirname);

// greet fonksiyonunu dışa aktarır - ES6 export syntax kullanılıyor
// Bu fonksiyon başka dosyalardan require ile kullanılabilir
export const greet = function(name){ // Function expression ile greet fonksiyonu tanımlanıyor
    console.log("Merhaba", name, "- wrapper-explorer'dan selamlar!"); // Selamlama mesajı yazdırır
};

/*
=== MODÜL EXPORT YÖNTEMLERİ ===

1. module.exports ile:
module.exports = { greet };

2. exports ile (module.exports'un kısa hali):
exports.greet = function(name) { ... };

3. ES6 export ile:
export const greet = function(name) { ... };

=== WRAPPER ETKİSİ ===
Bu modül wrapper-demo.js tarafından require edildiğinde:
1. İlk satırlar (console.log'lar) hemen çalışır
2. greet fonksiyonu dışa aktarılır
3. wrapper-demo.js'te greet("Hakan") çağrıldığında fonksiyon çalışır

=== MODÜL CACHE ===
📌 Node.js modülleri bir kez yükler ve cache'e alır
📌 İkinci require'da cache'teki versiyon kullanılır
📌 require.cache ile cache yönetilebilir
📌 Cache sayesinde performans artar

=== ÖNEMLİ NOTLAR ===
✨ Modül yüklenirken top-level kod hemen çalışır
✨ Export edilen fonksiyonlar çağrıldığında çalışır
✨ __filename ve __dirname her modülde farklıdır
✨ Wrapper her modülü kendi scope'unda izole eder
✨ Bir modül sadece bir kez evaluate edilir
*/