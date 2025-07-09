// 2. MODÜL İÇE AKTARMA VE KULLANIMI
// Başka dosyalardan fonksiyonları import edip kullanma

/*
=== MODÜL İÇE AKTARMA ===
- require(): CommonJS modül sistemi (Node.js varsayılan)
- import/export: ES6 modül sistemi (modern JavaScript)
- Bu dosyada ES6 import kullanılıyor

=== DESTRUCTURING IMPORT ===
{ add, sub, mul, div } şeklinde sadece gerekli fonksiyonları alır
Alternatif: const math = require('./first-module.js') - tüm modülü alır

=== ES6 VS COMMONJS ===
ES6: import { add } from './module.js'
CommonJS: const { add } = require('./module.js')
*/

// first-module.js dosyasındaki matematiksel fonksiyonları içe aktarır
// Destructuring kullanarak sadece ihtiyaç duyulan fonksiyonları alır
import { add, sub, mul, div } from "./first-module.js";

/*
=== FONKSİYON TESTLERI ===
Her matematik işlemini farklı sayılarla test edelim
*/

// Toplama işlemini test eder (1 + 2 = 3)
console.log("Toplama 1+2:", add(1,2));

// Çıkarma işlemini test eder (1 - 2 = -1)
console.log("Çıkarma 1-2:", sub(1,2));

// Çarpma işlemini test eder (1 * 2 = 2)
console.log("Çarpma 1*2:", mul(1,2));

// Bölme işlemini test eder (1 / 2 = 0.5)
console.log("Bölme 1/2:", div(1,2));

// Hata yakalama (error handling) için try-catch bloğu
// JavaScript'te hataları yakalamanın ana yöntemi
try {
    // Sıfıra bölme işlemini test eder - bu hata oluşturacak
    console.log("Sıfıra bölme 1/0:", div(1,0));
    
} catch (error) {
    // Hata durumunda hata mesajını yazdırır
    // Bu durumda çalışmayacak çünkü div() exception fırlatmıyor
    console.log("Hata yakalandı:", error.message);
}

/*
=== NODE.JS MODULE WRAPPER ===
Node.js her modülü otomatik olarak bu fonksiyon içine sarar:
*/

// Node.js Module Wrapper: Her modül bu fonksiyon içine sarılır
// Bu wrapper sayesinde modüller birbirinden izole edilir
// exports: Modül dışa aktarımları (module.exports'un kısa hali)
// require: Modül içe aktarımları  
// module: Mevcut modül referansı (bilgi ve meta veriler)
// __filename: Bu dosyanın tam yolu
// __dirname: Bu dosyanın bulunduğu klasörün yolu
(
    function (exports, require, module, __filename, __dirname) {
        // Burada bizim yazdığımız kod çalışır
        // Bu parametreler otomatik olarak sağlanır
    }
);

/*
=== ÇALIŞMA SIRASI ===
1. first-module.js yüklenir ve içindeki fonksiyonlar alınır
2. Her matematik işlemi test edilir ve sonuçlar yazdırılır
3. Try-catch bloğu çalışır (bu örnekte hata yakalanmaz)

=== ÖNEMLİ NOTLAR ===
📌 Import/export ES6 modül sistemi kullanır
📌 Require/module.exports CommonJS sistemi kullanır
📌 Node.js her modülü wrapper fonksiyonuna sarar
📌 __filename ve __dirname otomatik olarak sağlanır
📌 Try-catch sadece exception'ları yakalar, string dönüşleri yakalamaz

=== MODÜL SİSTEMİ AVANTAJLARI ===
✨ Kod organizasyonu ve yeniden kullanım
✨ Namespace pollution önlenir
✨ Bağımlılık yönetimi kolaylaşır
✨ Test edilebilirlik artar
*/