/*
==========================================================================
AUTHENTICATION CONTROLLER - KİMLİK DOĞRULAMA YÖNETİCİSİ
==========================================================================
Bu dosya kullanıcı authentication işlemlerini yöneten controller fonksiyonlarını içerir.
Kullanıcı kaydı (register) ve girişi (login) işlemlerini güvenli şekilde gerçekleştirir.
JWT token oluşturma ve şifre hash'leme işlemlerini yönetir.
==========================================================================
*/

// User modelini import ediyoruz - veritabanı işlemleri için
const User = require("../models/User");

// bcrypt kütüphanesini import ediyoruz - şifre hash'leme için
const bcrypt = require('bcrypt');

// jsonwebtoken kütüphanesini import ediyoruz - JWT token işlemleri için
const jwt = require('jsonwebtoken');

/*
==========================================================================
KULLANICI KAYIT İŞLEMİ - POST /api/auth/register
==========================================================================
*/

// Yeni kullanıcı kaydı fonksiyonu
// Request body'den kullanıcı bilgilerini alır ve güvenli şekilde kaydeder
const registerUser = async (req, res) => {
    // Request body'den kullanıcı verilerini destructuring ile alıyoruz
    const { userName, email, password, role } = req.body;
    
    try {
        // Mevcut kullanıcı kontrolü - aynı email veya userName var mı?
        // $or operatörü ile email VEYA userName kontrolü yapılır
        const existingUser = await User.findOne({$or:[{email},{userName}]});
        
        // Eğer kullanıcı zaten mevcutsa hata döndür
        if (existingUser) {
            return res.status(400).json({
                success: false,                     // İşlem başarı durumu
                message: 'User already exists'     // Hata mesajı
            });
        }
        
        // Şifre hash'leme işlemi - güvenlik için
        // bcrypt.genSalt(10) - 10 rounds salt oluşturur
        const salt = await bcrypt.genSalt(10);
        
        // Şifreyi salt ile hash'ler - plain text şifre veritabanında saklanmaz
        const hashedPassword = await bcrypt.hash(password,salt);
        
        // Yeni kullanıcı objesi oluştur
        // password alanında hash'lenmiş şifre saklanır
        const newUser = new User({ 
            userName, 
            email, 
            password: hashedPassword,           // Hash'lenmiş şifre
            role:role||'user'                   // Role belirtilmemişse 'user' varsayılan
        });
        
        // Kullanıcıyı veritabanına kaydet
        await newUser.save();
        
        // Kayıt başarılıysa success response döndür
        if(newUser){
            res.status(201).json({ 
                message: 'User registered successfully',    // Başarı mesajı
                user: newUser                               // Oluşturulan kullanıcı bilgileri
            });
        }else{
            // Kayıt başarısızsa error response döndür
            res.status(400).json({ 
                message: 'Registration failed'             // Hata mesajı
            });
        }
    } catch (error) {
        // Beklenmeyen hata durumları (veritabanı hatası, validation hatası vb.)
        res.status(500).json({ 
            message: 'Registration failed',                // Genel hata mesajı
            error: error.message                           // Detaylı hata bilgisi
        });
    }
}

/*
==========================================================================
KULLANICI GİRİŞ İŞLEMİ - POST /api/auth/login
==========================================================================
*/

// Kullanıcı giriş fonksiyonu
// Kullanıcı adı ve şifre ile authentication yapar, JWT token döndürür
const loginUser = async (req, res) => {
    // Request body'den kullanıcı giriş bilgilerini alıyoruz
    const { userName, password } = req.body;
    
    try {
        // Kullanıcıyı userName ile veritabanında bul
        const user = await User.findOne({ userName });
        
        // Kullanıcı bulunamazsa hata döndür
        if (!user) {
            return res.status(401).json({
                success: false,                     // İşlem başarı durumu
                message: 'User not found'          // Hata mesajı
            });
        }

        // Şifre doğrulama - girilen şifre ile hash'lenmiş şifreyi karşılaştır
        // bcrypt.compare() hash'lenmiş şifre ile plain text şifreyi güvenli şekilde karşılaştırır
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // Şifre yanlışsa hata döndür
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,                     // İşlem başarı durumu
                message: 'Invalid credentials'     // Güvenlik için genel hata mesajı
            });
        }
        
        // JWT ACCESS TOKEN OLUŞTURMA
        // Şifre doğruysa kullanıcı için JWT token oluştur
        const accessToken = jwt.sign({
            userId:user._id,                        // Kullanıcı ID'si
            userName:user.userName,                 // Kullanıcı adı
            role:user.role,                         // Kullanıcı rolü (user/admin)
        },
            process.env.JWT_SECRET,                 // .env'deki secret key ile imzala
            {expiresIn:'15m'}                       // Token geçerlilik süresi: 15 dakika
        );
        
        // Başarılı giriş response'u
        res.status(200).json({
            success: true,                          // İşlem başarı durumu
            message: 'Login successful',           // Başarı mesajı
            accessToken:accessToken,                // JWT token
            user:user                               // Kullanıcı bilgileri
        });
    } catch (error) {
        // Beklenmeyen hata durumları
        res.status(500).json({ 
            success: false,                         // İşlem başarı durumu
            message: 'Login failed',               // Genel hata mesajı
            error: error.message                    // Detaylı hata bilgisi
        });
    }
}

// Controller fonksiyonlarını dışa aktarıyoruz
module.exports={registerUser,loginUser};

/*
==========================================================================
AUTHENTICATION FLOW (KİMLİK DOĞRULAMA AKIŞI)
==========================================================================

1. KAYIT İŞLEMİ (Register):
   - Kullanıcı bilgileri alınır
   - Mevcut kullanıcı kontrolü yapılır
   - Şifre hash'lenir (bcrypt + salt)
   - Yeni kullanıcı veritabanına kaydedilir
   - Başarı mesajı döndürülür

2. GİRİŞ İŞLEMİ (Login):
   - Kullanıcı adı ile kullanıcı bulunur
   - Şifre doğrulanır (bcrypt.compare)
   - JWT token oluşturulur
   - Token ve kullanıcı bilgileri döndürülür

==========================================================================
GÜVENLİK ÖNLEMLERİ
==========================================================================

1. ŞİFRE GÜVENLİĞİ:
   - bcrypt ile hash'leme
   - Salt rounds: 10
   - Plain text şifre asla saklanmaz

2. JWT TOKEN GÜVENLİĞİ:
   - Secret key ile imzalama
   - Kısa geçerlilik süresi (15m)
   - Payload'da hassas bilgi yok

3. VERİ DOĞRULAMA:
   - Mevcut kullanıcı kontrolü
   - Geçersiz credentials kontrolü
   - Error handling

4. HTTP STATUS CODES:
   - 200: Başarılı giriş
   - 201: Başarılı kayıt
   - 400: Hatalı istek
   - 401: Unauthorized
   - 500: Server hatası

==========================================================================
JWT TOKEN PAYLOAD
==========================================================================

Token içinde saklanan bilgiler:
- userId: Kullanıcı benzersiz ID'si
- userName: Kullanıcı adı
- role: Kullanıcı rolü (user/admin)
- iat: Token oluşturulma zamanı
- exp: Token geçerlilik süresi

Bu bilgiler middleware'de decode edilir ve req.userInfo'ya eklenir.
==========================================================================
*/