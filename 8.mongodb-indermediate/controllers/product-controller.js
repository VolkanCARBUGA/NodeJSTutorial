const Product = require("../models/product"); // Product modelini içe aktarır

const getProductStats = async (req, res) => { // Ürün istatistiklerini döner
  try { // Hata yakalama
    const result = await Product.aggregate([ // Aggregation pipeline başlar
      {
        $match: { // Filtre: stokta olan ve fiyatı >= 100
          inStock: true,
          price: { $gte: 100 },
        },
      },
      {
        $group: { // Kategoriye göre grupla
          _id: "$category", // Grup anahtarı
          averagePrice: { $avg: "$price" }, // Ortalama fiyat
          count: { $sum: 1 }, // Ürün sayısı
        },
      },
    ]);
    res.status(200).json({ // Başarılı yanıt
      success: true,
      message: "Product stats fetched successfully",
      data: result,
    });
  } catch (error) { // Hata durumu
    res.status(500).json({ // Sunucu hatası
      success: false,
      message: "Failed to get product stats",
      error: error.message,
    });
  }
}; // getProductStats sonu
const getProductAnalysis = async (req, res) => { // Elektronik kategorisi için analiz
  try { // Hata yakalama
    const result = await Product.aggregate([ // Aggregation pipeline
      {
        $match: { // Sadece Electronics kategorisi
          category: "Electronics",
        },
      },
      {
        $group: { // Tek grup (tüm dökümanlar)
          _id: null,
          totalRevenue: { $sum: "$price" }, // Toplam gelir
          averagePrice: { $avg: "$price" }, // Ortalama fiyat
          maxProductPrice: { $max: "$price" }, // Maksimum fiyat
          minProductPrice: { $min: "$price" }, // Minimum fiyat
        },
      },
      {
        $project: { // Çıkış alanlarını düzenle
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: { // Fiyat aralığı hesapla
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      }
    ]);
    res.status(200).json({ // Başarılı yanıt
      success: true,
      message: "Product analysis fetched successfully",
      data: result,
    });
  } catch (error) { // Hata durumu
    res.status(500).json({ // Sunucu hatası
      success: false,
      message: "Failed to get product analysis",
      error: error.message,
    });
  }
}; // getProductAnalysis sonu
const insertSampleProducts = async (req, res) => { // Örnek ürünleri ekler
  try { // Hata yakalama
    const products = [ // Eklenecek örnek ürünler
      {
        name: "Mac mini",
        category: "Electronics",
        price: 100,
        inStock: true,
        tags: ["Apple", "Mac"],
      },
      {
        name: "Macbook pro",
        category: "Electronics",
        price: 200,
        inStock: false,
        tags: ["Apple", "Mac"],
      },
      {
        name: "iPhone 15",
        category: "Electronics",
        price: 300,
        inStock: true,
        tags: ["Apple", "iPhone"],
      },
    ];

    const result = await Product.insertMany(products); // Çoklu insert
    res.status(201).json({ // Başarılı oluşturma yanıtı
      success: true,
      message: "Sample products inserted successfully",
      data: result,
    });
  } catch (error) { // Hata durumu
    res.status(500).json({ // Sunucu hatası
      success: false,
      message: "Failed to insert sample products",
      error: error.message,
    });
  }
}; // insertSampleProducts sonu

module.exports = { insertSampleProducts, getProductStats ,getProductAnalysis}; // Fonksiyonları dışa aktarır

// Açıklama:
// Bu controller üç endpoint mantığı içerir: insertSampleProducts örnek verileri ekler,
// getProductStats stok ve fiyata göre kategori bazlı istatistik döner,
// getProductAnalysis ise Electronics kategorisi için özet metrikleri hesaplar.
