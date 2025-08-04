/*
==========================================================================
ADMIN MIDDLEWARE - YÖNETİCİ YETKİLENDİRME ARA KATMANI
==========================================================================
Bu middleware kullanıcının admin yetkisine sahip olup olmadığını kontrol eder.
authMiddleware'den sonra çalışır ve req.userInfo'daki role bilgisini kontrol eder.
Sadece 'admin' rolüne sahip kullanıcıların admin endpoint'lerine erişmesini sağlar.
==========================================================================
*/

// Admin yetkilendirme middleware fonksiyonu
// authMiddleware'den SONRA çalışmalıdır (req.userInfo gerekli)
const isAdminUser = (req,res,next)=>{
    // req.userInfo'dan role bilgisini destructuring ile çıkar
    // Bu bilgi önceki authMiddleware tarafından token'dan decode edilmiştir
    const {role} = req.userInfo;
    
    // Kullanıcının rolü 'admin' değilse erişimi reddet
    if(role !== 'admin'){
        return res.status(403).json({
            success:false,                                      // İşlem başarı durumu
            message:'Access denied for non-admin users'        // Hata mesajı - admin olmayan kullanıcılar için erişim reddedildi
        });
    }
    
    // Kullanıcı admin ise bir sonraki middleware'e veya route handler'a geç
    next();
}

// Admin middleware fonksiyonunu dışa aktarıyoruz
module.exports = isAdminUser;

/*
==========================================================================
ADMIN MIDDLEWARE ÇALIŞMA PRENSİBİ
==========================================================================

MIDDLEWARE SIRASI:
1. authMiddleware çalışır
   - JWT token doğrulanır
   - req.userInfo'ya kullanıcı bilgileri eklenir

2. isAdminUser middleware çalışır
   - req.userInfo.role kontrol edilir
   - 'admin' ise devam eder
   - 'user' ise 403 Forbidden döner

3. Route handler çalışır
   - Sadece admin kullanıcılar bu noktaya ulaşır

==========================================================================
KULLANIM ÖRNEĞİ
==========================================================================

Admin route tanımı:
router.get('/welcome', authMiddleware, isAdminUser, (req, res) => {
  // Bu kod sadece admin kullanıcılar için çalışır
  res.json({message: 'Admin paneline hoş geldiniz'});
});

Middleware Chain:
Request → authMiddleware → isAdminUser → Route Handler

==========================================================================
HTTP STATUS CODES
==========================================================================

403 FORBIDDEN:
- Kullanıcı kimlik doğrulaması yapmış ama yetki yok
- Admin olmayan kullanıcı admin endpoint'ine erişmeye çalışıyor
- Authentication ✓, Authorization ✗

401 UNAUTHORIZED (authMiddleware'den):
- Kullanıcı kimlik doğrulaması yapmamış
- Token yok/geçersiz/süresi dolmuş
- Authentication ✗

==========================================================================
ROLE-BASED ACCESS CONTROL (RBAC)
==========================================================================

USER ROLES:
- 'user': Normal kullanıcı
  * /api/home/* endpoint'lerine erişebilir
  * /api/admin/* endpoint'lerine erişemez

- 'admin': Yönetici kullanıcı  
  * /api/home/* endpoint'lerine erişebilir
  * /api/admin/* endpoint'lerine erişebilir

YETKİ KONTROL AKIŞI:
1. Token'dan role bilgisi çıkarılır
2. Endpoint gereksinimi ile karşılaştırılır
3. Yetki varsa işlem devam eder
4. Yetki yoksa 403 Forbidden döner

==========================================================================
GÜVENLİK ÖNLEMLERİ
==========================================================================

1. ROLE VALIDATION:
   - String comparison ile exact match
   - Case sensitive kontrol
   - Enum values (admin/user) kontrolü

2. MIDDLEWARE ORDER:
   - Authentication önce
   - Authorization sonra
   - Doğru middleware sıralaması kritik

3. ERROR MESSAGES:
   - Spesifik hata mesajları
   - Security through obscurity değil
   - Clear error responses

Bu middleware, güvenli admin panel erişimi sağlar.
==========================================================================
*/