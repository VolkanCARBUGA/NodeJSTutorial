// 3. NPM (NODE PACKAGE MANAGER) KULLANIMI
// Harici kütüphaneler yükleme ve kullanma - Lodash örneği

/*
=== NPM NEDİR? ===
NPM (Node Package Manager), Node.js için paket yönetim sistemidir.
- Dünyanın en büyük yazılım kütüphanesi registrysi
- Paketleri yükleme, güncelleme, kaldırma işlemleri
- package.json ile bağımlılık yönetimi
- Semantic versioning (semver) desteği

=== NPM KOMUTLARI ===
- npm init: Yeni proje oluşturur, package.json yaratır
- npm install <paket>: Paket yükler (node_modules klasörüne)
- npm install --save: package.json'a bağımlılık ekler
- npm install --global: Global olarak yükler
- npm uninstall: Paketi kaldırır

=== LODASH KÜTÜPHANESİ ===
Lodash, JavaScript için utility kütüphanesidir.
- Array, object, string manipülasyonu
- Functional programming desteği
- Cross-browser uyumlu
- Performans optimizasyonları
*/

// Lodash kütüphanesini içe aktarır (npm install lodash ile yüklendi)
// CommonJS require syntax kullanılıyor
const loadsh = require("lodash");

// İsimlerden oluşan bir dizi tanımlar
// Bu dizideki her ismin ilk harfini büyük yapacağız
const names = ["ali", "veli", "deli"]; // String array - küçük harfli isimler

// Lodash'in map ve capitalize fonksiyonlarını kullanarak
// dizideki her ismin ilk harfini büyük yapar
// map: Dizinin her elemanına fonksiyon uygular
// capitalize: String'in ilk harfini büyük yapar
const capitalize = loadsh.map(names, loadsh.capitalize);

// Sonucu konsola yazdırır: ["Ali", "Veli", "Deli"]
console.log("Orijinal isimler:", names);
console.log("Büyük harfli isimler:", capitalize);

/*
=== LODASH FONKSIYON DETAYI ===
loadsh.map(names, loadsh.capitalize) işlemi:
1. names dizisindeki her elemana erişir
2. Her elemanı loadsh.capitalize fonksiyonuna gönderir
3. capitalize fonksiyonu "ali" → "Ali" dönüşümü yapar
4. Yeni bir dizi oluşturur ve döndürür

=== ALTERNATIF KULLANIM ===
Vanilla JavaScript ile aynı işlem:
const capitalize = names.map(name => 
    name.charAt(0).toUpperCase() + name.slice(1)
);

=== PACKAGE.JSON ROLE ===
Bu dosyada lodash dependency olarak eklenir:
{
    "dependencies": {
        "lodash": "^4.17.21"
    }
}

=== ÖNEMLİ NOTLAR ===
📌 npm install öncesinde package.json oluşturun
📌 node_modules klasörü git'e eklenmez (.gitignore)
📌 package-lock.json exact versiyonları tutar
📌 Lodash modern JavaScript'e göre gereklilik azalmıştır

=== SEMANTIC VERSIONING ===
- ^4.17.21: Minor ve patch güncellemelerini kabul eder
- ~4.17.21: Sadece patch güncellemelerini kabul eder
- 4.17.21: Exact version (güncelleme yok)

=== MODERN ALTERNATİFLER ===
✨ Array.prototype.map(): Native JavaScript
✨ String.prototype methods: Native string işlemleri
✨ ES6+ features: Modern JavaScript özellikleri
*/
