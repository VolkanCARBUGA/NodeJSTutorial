## GraphQL Temelleri (10.nodejs-graphql)

Bu proje, GraphQL şemasının tanımlanması, sorguların (Query) çalıştırılması ve basit resolver mantığını gösterir.

- **Veri**: `src/data/products.js` örnek ürün verileri.
- **Şema**: `src/graphql/schema.js` tipler ve Query tanımları.
- **Sunucu**: `src/server.js` Apollo Server ile GraphQL endpoint kurulumu.

### Çalıştırma
```bash
npm install
npm start
```

### Örnek Sorgu
```graphql
query {
  products {
    id
    title
    price
  }
}
```

### Öğrenme Hedefi
GraphQL tip sistemi, şema ve resolver kavramlarını anlamak; REST'e alternatif sorgulanabilir API tasarımını görmek.

### Mimarinin Kısa Özeti
- `src/graphql/schema.js`: Product tipi, Query ve Mutation tanımları.
- `src/graphql/resolvers.js`: Bellek içi ürünler üzerinde CRUD iş mantığı.
- `src/server.js`: Apollo Server'ı 4000 portunda ayağa kaldırır.
- `src/data/products.js`: Örnek veri seti.

### Önemli Notlar
- Bu örnek bellek içi veri kullanır; kalıcı depolama yoktur.
- ID eşleştirmeleri `String(id)` kullanılarak gevşek karşılaştırma ile yapılmıştır.


