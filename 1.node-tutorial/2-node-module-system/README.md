## Modül Sistemi ve Wrapper (2-node-module-system)

### Konu Özeti
CommonJS modül sistemi, `module.exports`/`exports`, modül kapsamı ve Node'un her dosyayı bir IIFE benzeri wrapper ile sarmalaması.

### Neden Önemli?
Kapsam izolasyonu ve modülerlik, büyük uygulamaların okunabilirliğini ve bakımı kolaylaştırır.

### Dosyalar
- `first-module.js`: Dışa aktarılan değer/fonksiyon örneği.
- `wrapper-demo.js`, `wrapper-explorer.js`: Node'un dosyaları nasıl sardığını (wrapper) keşfetme.
- `index.js`: Modüllerin içe aktarımı ve kullanımı.

### Temel Kavramlar
- `require` çözümleme algoritması (çekirdek modül, dosya, dizin, `node_modules`).
- `exports` vs `module.exports` farkları.

### Sık Hatalar
- `exports = function(){}` kullanımı dışa aktarmayı bozabilir; `module.exports = ...` tercih edin.


