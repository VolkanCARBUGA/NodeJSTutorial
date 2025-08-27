const express = require("express"); // Express framework'ünü içe aktarır
const router = express.Router(); // Router örneği oluşturur
const { insertSampleProducts , getProductStats,getProductAnalysis} = require("../controllers/product-controller"); // Ürün controller fonksiyonlarını alır

router.post("/add", insertSampleProducts); // Örnek ürünleri ekler
router.get("/stats", getProductStats); // Ürün istatistiklerini döner (aggregate)
router.get("/analysis", getProductAnalysis); // Elektronik kategorisi için analiz döner
module.exports = router; // Router'ı dışa aktarır

// Açıklama:
// Bu router, ürün ekleme ve iki farklı aggregate tabanlı rapor endpoint'i sağlar:
// /stats genel istatistikler; /analysis ise Electronics kategorisi için özet metrikleri döner.