// 8. PROMISE (SÖZ/VADİ) KULLANIMI
// Callback Hell'den kurtulmak için modern JavaScript çözümü

/*
=== PROMISE NEDİR? ===
Promise, asenkron işlemlerin sonucunu temsil eden bir JavaScript objesidir.
- Gelecekteki bir değeri temsil eder
- Callback hell problemini çözer
- Daha okunabilir asenkron kod
- Hata yönetimi daha kolay

=== PROMISE STATES (DURUMLAR) ===
1. Pending (Beklemede): İşlem henüz tamamlanmamış
2. Fulfilled (Yerine getirilmiş): İşlem başarıyla tamamlanmış
3. Rejected (Reddedilmiş): İşlem hata ile sonuçlanmış

=== PROMISE CONSTRUCTOR ===
new Promise((resolve, reject) => {
    // Asenkron işlem
    if (başarılı) {
        resolve(sonuç);  // Promise fulfilled
    } else {
        reject(hata);    // Promise rejected
    }
});

=== PROMISE METHODS ===
- .then(): Başarılı sonuç için
- .catch(): Hata yakalama için
- .finally(): Her durumda çalışır
- Promise.all(): Paralel işlemler
- Promise.race(): İlk tamamlanan
*/

console.log("=== PROMISE ÖRNEKLERİ ===");

// Gecikme fonksiyonu - Promise döndürür
// time: Milisaniye cinsinden bekleme süresi
function delayFn(time){ // Function declaration ile Promise döndüren fonksiyon
    console.log(`${time}ms bekleme başlatıldı...`); // Başlangıç mesajı
    
    // Yeni bir Promise oluşturur
    return new Promise((resolve) => { // Promise constructor - tek parametre (resolve)
        // setTimeout ile asenkron bekleme
        setTimeout(() => { // Arrow function callback
            const message = `${time}ms bekleme tamamlandı!`; // String template literal
            resolve(message); // Promise'i başarıyla çöz - fulfilled state
        }, time); // Bekleme süresi parametre olarak geçiliyor
    });
}

console.log("Promise başlatılıyor...");

// Promise zinciri: .then() ile başarılı sonucu yakalar
delayFn(2000).then((data) => {
    console.log("✅ Promise sonucu:", data); // 2 saniye sonra yazdırılır
    console.log("Promise başarıyla tamamlandı!");
});

console.log("Bu mesaj Promise beklenmeden hemen yazdırılır (asenkron)");

console.log("\n=== PROMISE İLE HATA YÖNETİMİ ===");

// Bölme işlemi yapan Promise fonksiyonu
// number1: Bölünen sayı
// number2: Bölen sayı
function divideFn(number1, number2){
    console.log(`${number1} ÷ ${number2} işlemi başlatıldı...`);
    
    // Promise oluşturur - hem resolve hem reject parametreli
    return new Promise((resolve, reject) => {
        // Kısa bir bekleme simülasyonu (gerçek hesaplama süresi)
        setTimeout(() => {
            // Sıfıra bölme kontrolü
            if(number2 === 0){
                reject(new Error("Bölme hatası: Sıfıra bölme yapılamaz!")); // Hata durumu
            } else {
                const result = number1 / number2;
                resolve(result); // Başarılı sonuç
            }
        }, 1000);
    });
}

// Başarılı bölme işlemi örneği
divideFn(10, 2).then((data) => {
    console.log("✅ Bölme sonucu:", data); // 5
}).catch((err) => {
    console.error("❌ Hata yakalandı:", err.message);
});

// Hatalı bölme işlemi örneği (sıfıra bölme)
divideFn(10, 0).then((data) => {
    console.log("✅ Bölme sonucu:", data); // Bu çalışmayacak
}).catch((err) => {
    console.error("❌ Hata yakalandı:", err.message); // Bu çalışacak
});

console.log("\n=== PROMISE CHAINING (ZİNCİRLEME) ===");

// Promise zinciri örneği - birden fazla asenkron işlem
delayFn(1000)
    .then((result1) => {
        console.log("1. İşlem:", result1);
        return delayFn(1500); // Yeni Promise döndür
    })
    .then((result2) => {
        console.log("2. İşlem:", result2);
        return "Final sonuç"; // Basit değer döndür
    })
    .then((finalResult) => {
        console.log("3. İşlem:", finalResult);
        console.log("🎉 Tüm zincir tamamlandı!");
    })
    .catch((error) => {
        console.error("Zincirde hata:", error);
    });

/*
=== CALLBACK VS PROMISE KARŞILAŞTIRMA ===

CALLBACK HELL:
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            // İç içe geçmiş yapı
        });
    });
});

PROMISE CHAIN:
getData()
    .then(a => getMoreData(a))
    .then(b => getEvenMoreData(b))
    .then(c => console.log(c))
    .catch(err => console.error(err));

=== PROMISE AVANTAJLARI ===
✅ Callback Hell'den kurtarır
✅ Daha okunabilir kod yapısı
✅ Hata yönetimi daha kolay (.catch)
✅ Zincirleme işlemler (.then().then())
✅ Promise.all() ile paralel işlemler
✅ Standart API (ES6+)

=== PROMISE.ALL() ÖRNEĞİ ===
const promises = [
    divideFn(10, 2),
    divideFn(20, 4),
    divideFn(30, 6)
];

Promise.all(promises)
    .then(results => console.log("Tüm sonuçlar:", results))
    .catch(err => console.error("Herhangi birinde hata:", err));

=== PROMISE BESTt PRACTICES ===
📌 Her zaman .catch() ile hata yakalayın
📌 Promise chain'de return değerlerini kullanın
📌 Nested Promise'lerden kaçının (.then içinde .then)
📌 Promise.all() paralel işlemler için kullanın
📌 Error handling'i ihmal etmeyin

=== MODERN ALTERNATİF: ASYNC/AWAIT ===
Promise'ler harika ama async/await daha da temiz:

async function example() {
    try {
        const result1 = await delayFn(1000);
        const result2 = await divideFn(10, 2);
        console.log(result1, result2);
    } catch (error) {
        console.error(error);
    }
}
*/

