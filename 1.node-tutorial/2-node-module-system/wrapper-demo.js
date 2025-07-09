// 2. NODE.JS MODULE WRAPPER DEMONSTRATION
// Module wrapper'ın nasıl çalıştığını gösteren örnek

/*
=== MODULE WRAPPER NEDİR? ===
Node.js her JavaScript dosyasını otomatik olarak bir fonksiyon içine sarar.
Bu wrapper sayesinde:
- Her modül kendi scope'una sahip olur
- Global değişken kirliliği önlenir  
- __filename, __dirname gibi özel değişkenler sağlanır
- require, exports, module objeleri otomatik olarak enjekte edilir

=== WRAPPER FONKSİYONU ===
(function(exports, require, module, __filename, __dirname) {
    // Bizim kodumuz buraya yerleşir
});

=== __FILENAME VE __DIRNAME ===
- __filename: Dosyanın tam yolunu verir (dosya adı dahil)
- __dirname: Dosyanın bulunduğu klasörün yolunu verir
*/

// wrapper-explorer modülünü içe aktarır
// Bu modülden greet fonksiyonunu kullanacağız
const wrapperExplorer = require("./wrapper-explorer");

// Dosyanın çalıştığını belirten mesaj
console.log("wrapper-demo.js dosyası çalışıyor");

// __filename: Bu dosyanın tam yolunu gösterir
// Örnek: /Users/kullanici/proje/wrapper-demo.js
console.log("Dosya yolu (__filename):", __filename);

// __dirname: Bu dosyanın bulunduğu klasörün yolunu gösterir  
// Örnek: /Users/kullanici/proje/
console.log("Klasör yolu (__dirname):", __dirname);

// İçe aktarılan modülden greet fonksiyonunu "Hakan" parametresi ile çağırır
wrapperExplorer.greet("Hakan");

/*
=== WRAPPER ÇALIŞMA PRENSİBİ ===
1. Node.js bu dosyayı okur
2. İçeriği wrapper fonksiyonuna sarar
3. Gerekli parametreleri (exports, require, vb.) sağlar
4. Wrapper fonksiyonunu çalıştırır
5. Sonuç olarak modül yüklenir ve çalıştırılır

=== WRAPPER PARAMETRELERI ===
📌 exports: module.exports'un kısa hali (dışa aktarım)
📌 require: Modül içe aktarımı için kullanılır
📌 module: Mevcut modül hakkında bilgi içerir
📌 __filename: Dosyanın mutlak yolu
📌 __dirname: Dosyanın bulunduğu klasörün mutlak yolu

=== KULLANIM ÖRNEKLERİ ===
- Dosya yolu işlemleri için __dirname kullanın
- Dinamik modül yükleme için __filename kullanın
- Relative path'ler için path.join(__dirname, 'dosya.js')

=== ÖNEMLİ NOTLAR ===
✨ Wrapper her modül için otomatik çalışır
✨ Browser JavaScript'te __dirname yoktur
✨ ES6 modüllerinde import.meta.url kullanılır
✨ Wrapper sayesinde modüller izole çalışır
*/