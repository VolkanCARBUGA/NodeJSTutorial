## EJS ile Sunucu Taraflı Şablonlama (3.ejs-tutorial)

Bu proje, EJS (Embedded JavaScript) şablon motoru ile dinamik HTML üretimini örnekler.

- **Views**: `views/` klasöründe `.ejs` şablonları.
- **Kısmi Şablonlar**: `views/components/` içinde tekrar kullanılabilir parçalar (örn. `header.ejs`).
- **Veri Geçişi**: Sunucudan şablona değişken aktarma.

### Dosyalar
- `index.js`: Express + EJS yapılandırması.
- `views/home.ejs`, `views/about.ejs`: Sayfa şablonları.

### Çalıştırma
```bash
npm install
node index.js
```

### Öğrenme Hedefi
Server-side rendering (SSR) mantığını ve EJS ile bileşenleştirilebilir şablon üretimini kavramak.


