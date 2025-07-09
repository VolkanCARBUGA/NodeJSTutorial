// 4. PATH MODÜLÜ KULLANIMI
// Dosya ve klasör yolları ile çalışma - cross-platform path işlemleri

/*
=== PATH MODÜLÜ NEDİR? ===
Node.js'in yerleşik (built-in) path modülü dosya yolları ile çalışmak için kullanılır.
- Cross-platform uyumluluk (Windows, Mac, Linux)
- Dosya yolu manipülasyonu
- Yol birleştirme ve parçalama
- Güvenli yol oluşturma

=== PLATFORM FARKLILIKLARI ===
Windows: C:\Users\Documents\file.txt (backslash \)
Unix/Mac: /Users/Documents/file.txt (forward slash /)
Path modülü bu farklılıkları otomatik yönetir.

=== PATH MODÜLÜ FONKSİYONLARI ===
- dirname(): Dosyanın bulunduğu klasör yolu
- basename(): Dosya adı (uzantı ile birlikte)
- extname(): Dosya uzantısı
- join(): Yol parçalarını birleştirir
- resolve(): Mutlak yol oluşturur
*/

// Node.js'in yerleşik path modülünü içe aktarır
const path = require("path"); // CommonJS require syntax kullanarak built-in modül yükleme

// __filename: Şu anki dosyanın mutlak yolu
console.log("Şu anki dosya (__filename):", __filename);

// Dosyanın bulunduğu klasörün yolunu alır
// Örnek: /Users/kullanici/proje/4-path-module
console.log("Klasör yolu (dirname):", path.dirname(__filename));

// Dosyanın adını (uzantısı ile birlikte) alır
// Örnek: index.js
console.log("Dosya adı (basename):", path.basename(__filename));

// Dosyanın uzantısını (.js) alır
// Sadece son noktadan sonraki kısmı döndürür
console.log("Dosya uzantısı (extname):", path.extname(__filename));

// Farklı yol parçalarını birleştirerek tam bir yol oluşturur
// İşletim sistemine uygun ayırıcıları (/ veya \) kullanır
const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Birleştirilmiş yol (join):", joinPath);

// Mutlak yol oluşturma örneği
const resolvePath = path.resolve("data", "file.txt");
console.log("Mutlak yol (resolve):", resolvePath);

/*
=== PATH.JOIN VS PATH.RESOLVE ===

path.join():
- Sadece verilen segmentleri birleştirir
- Relative path döndürebilir
- path.join('folder', 'file.txt') → 'folder/file.txt'

path.resolve():
- Her zaman mutlak yol döndürür
- Mevcut working directory'yi baz alır
- path.resolve('file.txt') → '/current/working/dir/file.txt'

=== GÜVENLİK ÖNLEMLERİ ===
📌 Kullanıcı girdilerini doğrudan yol olarak kullanmayın
📌 Path traversal saldırılarına dikkat edin (../)
📌 path.normalize() ile güvenli yollar oluşturun

=== KULLANIM ÖRNEKLERİ ===
// Güvenli dosya yolu oluşturma
const safePath = path.join(__dirname, 'uploads', filename);

// Yapılandırma dosyası yolu
const configPath = path.resolve(__dirname, '..', 'config', 'app.json');

// Static dosya servisi
const publicPath = path.join(__dirname, 'public');

=== CROSS-PLATFORM UYUMLULUK ===
✨ Otomatik path separator detection
✨ Windows drive letter desteği (C:)
✨ Unix absolute path desteği (/)
✨ Relative path çözümlemesi

=== DİĞER FONKSİYONLAR ===
- path.parse(): Yolu obje olarak parçalar
- path.format(): Obje'den yol oluşturur  
- path.isAbsolute(): Mutlak yol kontrolü
- path.relative(): İki yol arasındaki relative yol
*/
