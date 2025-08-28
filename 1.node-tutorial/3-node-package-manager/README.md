## NPM ve Paket Yönetimi (3-node-package-manager)

### Konu Özeti
`npm init`, `package.json`, bağımlılıkların (`dependencies`/`devDependencies`) yönetimi, `package-lock.json` ve script komutları.

### Neden Önemli?
Üçüncü parti kütüphaneleri eklemek, sürüm kilitlemek ve komut otomasyonu yapmak için paket yöneticisi kritiktir.

### Temel Komutlar
```bash
npm init -y
npm install <paket>         # prod bağımlılık
npm install -D <paket>      # dev bağımlılık
npm run <script>
```

### İpuçları
- Sürüm aralığı: `^`, `~`, kesin sürüm farkları.
- `npx` ile paketleri global kurmadan çalıştırma.


