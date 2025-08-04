/*
==========================================================================
AUTHENTICATION MIDDLEWARE - KİMLİK DOĞRULAMA ARA KATMANI
==========================================================================
Bu middleware JWT token tabanlı kimlik doğrulama işlemlerini gerçekleştirir.
HTTP request'lerden JWT token'ı çıkarır, doğrular ve kullanıcı bilgilerini
req.userInfo objesine ekler. Korumalı route'lara erişim kontrolü sağlar.
==========================================================================
*/

// JWT kütüphanesini import ediyoruz --token doğrulama işlemleri için
const jwt = require('jsonwebtoken');

// Authentication middleware fonksiyonu
// Her korumalı route'a gelen isteklerde çalışır
const authMiddleware = (req,res,next)=>{
  // HTTP Authorization header'ından token'ı çıkarma işlemi
  // Header formatı: "Bearer <token>" şeklinde olmalıdır
  const authHeader = req.headers['authorization'];
  
  // Debug amaçlı authorization header'ını konsola yazdır
  console.log(authHeader);
  
  // Token'ı header'dan çıkar - "Bearer " kısmını ayırıp sadece token'ı al
  // authHeader && authHeader.split(' ')[1] - header varsa böl ve ikinci kısmı al
  // Örnek: "Bearer eyJhbGciOiJIUzI1NiIs..." -> "eyJhbGciOiJIUzI1NiIs..."
  const token = authHeader && authHeader.split(' ')[1];
  
  // Token yoksa unauthorized error döndür
  if(!token){
    return res.status(401).json({
        success:false,                          // İşlem başarı durumu
        message:'No token provided'            // Hata mesajı - token eksik
    });
  }
  
    // JWT TOKEN DOĞRULAMA İŞLEMİ
    try {
        // Token'ı doğrula ve decode et
        // jwt.verify() token'ın geçerli olup olmadığını kontrol eder
        // process.env.JWT_SECRET - token'ı imzalarken kullanılan aynı secret key
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        
        // Debug amaçlı decode edilmiş token bilgilerini yazdır
        console.log(decodedToken);
        
        // Decode edilen token bilgilerini req.userInfo'ya ekle
        // Bu sayede sonraki middleware'ler ve route handler'lar kullanıcı bilgilerine erişebilir
        // decodedToken içeriği: {userId, userName, role, iat, exp}
        req.userInfo = decodedToken;
        
        // Bir sonraki middleware'e veya route handler'a geç
        // Bu çağrı olmadan request askıda kalır
        next();
    } catch (error) {
        // Token geçersiz/süresi dolmuş/yanlış imzalanmış durumlarında hata döndür
        return res.status(401).json({
            success:false,                      // İşlem başarı durumu
            message:'Invalid token'            // Hata mesajı - geçersiz token
        });
    }
}

// Middleware fonksiyonunu dışa aktarıyoruz
module.exports = authMiddleware;

/*
==========================================================================
MIDDLEWARE ÇALIŞMA PRENSİBİ
==========================================================================

1. İSTEK GELİŞİ:
   - Korumalı route'a HTTP isteği gelir
   - Authorization header kontrol edilir
   - Token çıkarılır ve doğrulanır

2. TOKEN DOĞRULAMA:
   - JWT signature kontrol edilir
   - Token süresi kontrol edilir  
   - Secret key ile imza doğrulanır

3. BAŞARILI DOĞRULAMA:
   - Token bilgileri req.userInfo'ya eklenir
   - next() ile işlem devam eder
   - Route handler çalışır

4. BAŞARISIZ DOĞRULAMA:
   - 401 Unauthorized error döndürülür
   - İstek reddedilir
   - Route handler çalışmaz

==========================================================================
KULLANIM ÖRNEĞİ
==========================================================================

Route'ta middleware kullanımı:
app.get('/api/home/welcome', authMiddleware, (req, res) => {
  // req.userInfo artık kullanılabilir
  const {userId, userName, role} = req.userInfo;
  res.json({message: `Hoş geldin ${userName}`});
});

HTTP İstek Formatı:
GET /api/home/welcome
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

==========================================================================
GÜVENLİK ÖZELLİKLERİ
==========================================================================

1. TOKEN KONTROLLERI:
   - Bearer format kontrolü
   - JWT signature doğrulama
   - Token expiry kontrolü
   - Secret key kontrolü

2. ERROR HANDLING:
   - Token eksik durumu
   - Geçersiz token durumu
   - Süresi dolmuş token durumu
   - Yanlış imza durumu

3. USER INFO İNJECTION:
   - Decode edilen token bilgileri req'e eklenir
   - Sonraki middleware'ler kullanıcı bilgilerine erişebilir
   - Route handler'lar user context'ine sahip olur

==========================================================================
JWT TOKEN YAPISISI
==========================================================================

Decode edilen token içeriği:
{
  "userId": "507f1f77bcf86cd799439011",
  "userName": "johndoe", 
  "role": "user",
  "iat": 1640995200,        // Issued at time
  "exp": 1640996100         // Expiry time
}

Bu bilgiler req.userInfo olarak kullanılabilir hale gelir.
==========================================================================
*/