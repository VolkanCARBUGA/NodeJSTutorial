# Node.js ile TypeScript Projesi

Bu proje, Node.js ve TypeScript kullanarak geliştirilmiş bir REST API uygulamasıdır. Express.js web framework'ü ve MongoDB veritabanı ile birlikte kullanılmaktadır.

## 🚀 Proje Özellikleri

- **TypeScript**: Tip güvenliği sağlayan modern JavaScript
- **Express.js**: Hızlı ve minimal web framework
- **MongoDB**: NoSQL veritabanı
- **Mongoose**: MongoDB ODM (Object Document Mapper)
- **Nodemon**: Geliştirme sırasında otomatik yeniden başlatma

## 📁 Proje Yapısı

```
11.nodejs-with-typescript/
├── src/                    # TypeScript kaynak kodları
│   ├── app.ts             # Ana uygulama dosyası
│   ├── basics.ts          # TypeScript temel özellikleri
│   └── models/            # Veritabanı modelleri
│       └── user.ts        # Kullanıcı modeli
├── dist/                  # Derlenmiş JavaScript dosyaları
├── package.json           # Proje bağımlılıkları ve scriptleri
├── tsconfig.json          # TypeScript konfigürasyonu
└── README.md              # Bu dosya
```

## 🛠️ Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **TypeScript dosyalarını derleyin:**
   ```bash
   npm run build
   ```

3. **Uygulamayı çalıştırın:**
   ```bash
   npm start
   ```

4. **Geliştirme modunda çalıştırın:**
   ```bash
   npm run dev
   ```

## 📚 Kod Açıklamaları

### 1. `src/app.ts` - Ana Uygulama Dosyası

Bu dosya Express.js sunucusunu yapılandırır ve API endpoint'lerini tanımlar:

#### Import'lar ve Temel Yapılandırma
```typescript
import express,{Express,Request,Response,NextFunction} from "express"
import { IUser, User } from "./models/user"

const app:Express=express()
const port=3000
app.use(express.json())
```

#### Custom Request Interface
```typescript
interface CustomRequest extends Request{
 startTime?:number
}
```
Request nesnesini genişleterek her istek için başlangıç zamanını takip edebiliriz.

#### Middleware
```typescript
app.use((req:CustomRequest,res:Response,next:NextFunction)=>{
    req.startTime=Date.now()
    next()
});
```
Her istek için başlangıç zamanını kaydeden middleware.

#### API Endpoint'leri

1. **GET /users**: Tüm kullanıcıları getirir
2. **POST /user**: Yeni kullanıcı oluşturur
3. **GET /user/:id**: Belirli bir kullanıcıyı ID ile getirir
4. **GET /**: Ana sayfa

### 2. `src/basics.ts` - TypeScript Temel Özellikleri

Bu dosya TypeScript'in temel özelliklerini gösterir:

#### Veri Tipleri
- **Boolean**: `true/false` değerleri
- **Number**: Sayısal değerler
- **String**: Metin değerleri
- **Array**: Dizi yapıları
- **Tuple**: Belirli sayıda ve sırada eleman içeren diziler
- **Enum**: Numaralandırılmış sabitler
- **Any**: Herhangi bir tip (tip güvenliği yok)

#### Interface ve Type Alias
```typescript
interface User {
  name: string;
  id: number;
  email?: string;        // Opsiyonel alan
  readonly createdAt: Date; // Salt okunur alan
}

type Product = {
  title: string;
  price: number;
}
```

#### Fonksiyonlar
```typescript
function add(a:number,b:number):number{
  return a+b
}
```
Parametre ve dönüş tipleri belirtilerek tip güvenliği sağlanır.

### 3. `src/models/user.ts` - Kullanıcı Modeli

MongoDB ile etkileşim için Mongoose modeli tanımlar:

#### Interface Tanımı
```typescript
interface IUser extends Document{
    name:string
    email:string
    age:number
    createdAt:Date
}
```
Mongoose Document'ini extend ederek kullanıcı veri yapısını tanımlar.

#### Schema Tanımı
```typescript
const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  age: Number,
  createdAt: Date
});
```
Veritabanı koleksiyonunun yapısını belirler.

#### Model Oluşturma
```typescript
const User=mongoose.model<IUser>("User",userSchema)
```
CRUD işlemleri için kullanılacak modeli oluşturur.

## 🔧 Konfigürasyon Dosyaları

### `package.json`
- **Scripts**: Build, start ve dev komutları
- **Dependencies**: Express, Mongoose gibi çalışma zamanı bağımlılıkları
- **DevDependencies**: TypeScript, tip tanımları gibi geliştirme bağımlılıkları

### `tsconfig.json`
- **Compiler Options**: TypeScript derleyici ayarları
- **Module System**: CommonJS modül sistemi
- **Target**: ES2016 hedef JavaScript versiyonu
- **Strict Mode**: Katı tip kontrolü

## 🌟 TypeScript Avantajları

1. **Tip Güvenliği**: Derleme zamanında hataları yakalar
2. **IntelliSense**: IDE desteği ile daha iyi kod yazma deneyimi
3. **Refactoring**: Güvenli kod yeniden düzenleme
4. **Dokümantasyon**: Kod kendini dokümante eder
5. **Maintainability**: Daha kolay bakım yapılabilir kod

## 🚀 Geliştirme İpuçları

1. **Tip Tanımları**: Her zaman uygun tip tanımları yapın
2. **Interface Kullanımı**: Nesne yapıları için interface kullanın
3. **Generic Tipler**: Tekrar kullanılabilir tip tanımları için generic'ler kullanın
4. **Strict Mode**: TypeScript'in katı modunu aktif tutun
5. **Error Handling**: Try-catch blokları ile hata yönetimi yapın

## 📝 API Kullanımı

### Kullanıcıları Listele
```bash
GET http://localhost:3000/users
```

### Yeni Kullanıcı Oluştur
```bash
POST http://localhost:3000/user
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Kullanıcı Getir
```bash
GET http://localhost:3000/user/123
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje ISC lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Bu proje Node.js ve TypeScript öğrenme amaçlı geliştirilmiştir.
