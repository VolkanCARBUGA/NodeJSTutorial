// Express.js framework'ünü ES6 module syntax ile import ediyoruz
import express from "express";

// Express uygulaması örneğini oluşturuyoruz
const app = express();

//root route - Kök route (Ana sayfa)
// "/" path'ine gelen GET isteklerini işler
// Bu, web sitesinin ana sayfasıdır (örn: localhost:3000/)
app.get("/", (req, res) => {
   // Basit string mesajı ile karşılama sayfası
   res.send("Welcome to the home page");
});

// get all products - Tüm ürünleri getiren route
// RESTful API yapısında "GET /products" = tüm kaynakları listele
// JSON formatında veri döndürür - API endpoint'i
app.get("/products", (req, res) => {
    // Örnek ürün verisi - gerçek uygulamada database'den gelir
    const products = [
        {id: 1, name: "Product 1"},
        {id: 2, name: "Product 2"},
        {id: 3, name: "Product 3"},
    ]
    // JSON formatında yanıt gönderir
    // res.json() otomatik olarak Content-Type: application/json header'ı ekler
    res.json({products});
});

//get single product - Tekil ürün getirme route'u
// ROUTE PARAMETRESİ KULLANIMI: ":id" dinamik parametre
// "/products/1", "/products/2" gibi istekleri yakalar
// RESTful API yapısında "GET /products/:id" = belirli kaynağı getir
app.get("/products/:id", (req, res) => {
    // req.params - URL'deki dinamik parametreleri içerir
    // Örnek: /products/123 → req.params = {id: "123"}
    console.log(req.params);
    
    // URL'den gelen id parametresini alıyoruz
    // DİKKAT: req.params.id her zaman string olarak gelir
   const productId = req.params.id;
   
   // Aynı ürün listesi (gerçek uygulamada database sorgusu olur)
   const products = [
    {id: 1, name: "Product 1"},
    {id: 2, name: "Product 2"},
    {id: 3, name: "Product 3"},
]

// ÜRÜN ARAMA İŞLEMİ
// Array.find() - koşula uyan ilk elemanı döndürür
// parseInt() - string id'yi sayıya çevirir ("1" → 1)
const getSingleProduct = products.find((product) => product.id === parseInt(productId));

// ÜRÜN BULUNAMAMA DURUMU - Error Handling
// Eğer ürün bulunamazsa 404 (Not Found) hatası döner
if (!getSingleProduct) {
    // return ile fonksiyondan çıkıyoruz (sonraki kodlar çalışmaz)
    // 404 HTTP status kodu = "Kaynak bulunamadı"
    return res.status(404).send("Product not found");
}

// Bulunan ürünü JSON formatında döndürür
res.json(getSingleProduct);
});

// Port numarasını tanımlıyoruz
const PORT = 3000;

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
ROUTE PARAMETRELERİ VE RESTful API KAVRAMI:

1. ROUTE PARAMETRELERİ (:id):
   - URL'de dinamik değerler için kullanılır
   - :id, :name, :category gibi isimlendirme yapılır
   - req.params objesi ile erişilir
   - Her zaman string olarak gelir, gerekirse dönüştürülmeli

2. RESTful API YÖNTEMLERİ:
   - GET /products → Tüm ürünleri listele
   - GET /products/:id → Belirli ürünü getir
   - POST /products → Yeni ürün oluştur
   - PUT /products/:id → Ürünü güncelle
   - DELETE /products/:id → Ürünü sil

3. HTTP STATUS KODLARI:
   - 200: Başarılı (OK)
   - 404: Bulunamadı (Not Found)
   - 500: Sunucu hatası (Internal Server Error)
   - 201: Oluşturuldu (Created)
   - 400: Hatalı istek (Bad Request)

4. JSON RESPONSE:
   - res.json() - JavaScript objesini JSON string'e çevirir
   - Content-Type header'ını otomatik ayarlar
   - Modern API'lerin standart veri formatı

5. ERROR HANDLİNG:
   - Kaynak bulunamama durumlarını kontrol et
   - Uygun HTTP status kodları kullan
   - Kullanıcı dostu hata mesajları gönder
   - return ile erken çıkış yap

6. GERÇEK UYGULAMA İPUÇLARI:
   - Ürün listesi database'den gelir (MongoDB, PostgreSQL vb.)
   - Input validation yapılmalı
   - Middleware ile authentication/authorization
   - Error handling middleware kullanılmalı
   - Pagination (sayfalama) eklenebilir

Bu örnek, modern web API'lerinin temel yapı taşlarını gösterir.
*/

