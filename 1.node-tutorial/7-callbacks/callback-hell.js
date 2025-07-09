// 7. CALLBACK HELL (CALLBACK CEHENNEMİ) ÖRNEĞİ
// İç içe geçmiş callback'lerin yarattığı problemli kod yapısı

/*
=== CALLBACK HELL NEDİR? ===
Callback Hell, asenkron işlemlerin ardışık yapıldığı durumlarda
callback'lerin iç içe geçmesi sonucu oluşan karmaşık kod yapısıdır.
- "Pyramid of Doom" olarak da bilinir
- Kodun sağa doğru kayması
- Okunabilirlik sorunu
- Bakım zorluğu

=== CALLBACK HELL'İN PROBLEMLERİ ===
1. 🔻 Okunabilirlik azalır
2. 🔻 Debugging zorlaşır
3. 🔻 Hata yönetimi karmaşıklaşır
4. 🔻 Kod tekrarı artar
5. 🔻 Test etmek zorlaşır

=== CALLBACK HELL ÇÖZÜM YÖNTEMLERİ ===
✅ Named functions kullanma
✅ Promise pattern
✅ Async/await syntax
✅ Functional composition
✅ Control flow libraries (async.js)

=== BU ÖRNEKTE ===
Üç aşamalı dosya işlemi:
1. input.txt dosyasını oku
2. İçeriği büyük harfe çevir ve output.txt'ye yaz
3. output.txt'yi tekrar oku ve göster
*/

// Dosya sistemi modülünü içe aktarır
import fs from "fs";

console.log("=== CALLBACK HELL ÖRNEĞİ ===");
console.log("1. input.txt dosyası okunuyor...");

// Callback Hell: İç içe geçmiş callback fonksiyonları
// Bu yapı kodun okunmasını ve bakımını zorlaştırır

// 1. ADIM: input.txt dosyasını oku
fs.readFile("input.txt", "utf-8", (err, data) => {
    if(err){
        console.error("1. ADIM HATASI - Dosya okuma:", err.message);
        return;
    }
    
    console.log("✅ 1. ADIM - Dosya başarıyla okundu");
    console.log("Orijinal içerik:", data);
    
    // Okunan veriyi büyük harfe çevir
    const modifyData = data.toUpperCase();
    console.log("2. output.txt dosyasına yazılıyor...");
    
    // 2. ADIM: Değiştirilmiş veriyi output.txt dosyasına yaz (iç içe callback)
    // İLK SEVİYE İÇ İÇE GEÇMİŞ CALLBACK
    fs.writeFile("output.txt", modifyData, (err) => {
        if(err){
            console.error("2. ADIM HATASI - Dosya yazma:", err.message);
            return;
        }
        
        console.log("✅ 2. ADIM - Dosya başarıyla yazıldı");
        console.log("3. output.txt dosyası okunuyor...");
        
        // 3. ADIM: Yazılan dosyayı tekrar oku (daha da derin callback)
        // İKİNCİ SEVİYE İÇ İÇE GEÇMİŞ CALLBACK
        fs.readFile("output.txt", "utf-8", (err, data) => {
            if(err){
                console.error("3. ADIM HATASI - Dosya okuma:", err.message);
                return;
            }
            
            console.log("✅ 3. ADIM - Final dosyası başarıyla okundu");
            console.log("Final içerik:", data);
            console.log("🎉 Tüm işlemler tamamlandı!");
            
            // Bu noktada 3 seviye içiçe callback var!
            // Daha fazla işlem eklenmesi halinde kod daha da karmaşıklaşır
        });
    });
});

// Bu satır yukarıdaki asenkron işlemlerden önce çalışabilir
console.log("Asenkron işlemler başlatıldı... (bu mesaj ilk görünebilir)");

/*
=== CALLBACK HELL'İN GÖRSELLEŞTİRİLMESİ ===

İdeal kod yapısı (linear):
1. Dosya oku
2. İçeriği değiştir  
3. Dosyaya yaz
4. Sonucu göster

Callback Hell yapısı (pyramid):
dosyaOku(function() {
    içeriğiDeğiştir(function() {
        dosyayaYaz(function() {
            sonucuGöster(function() {
                // Ve daha derin...
            });
        });
    });
});

=== CALLBACK HELL ÇÖZÜM ÖRNEĞİ - NAMED FUNCTIONS ===

function step1() {
    fs.readFile("input.txt", "utf-8", step2);
}

function step2(err, data) {
    if (err) return handleError(err);
    const modifiedData = data.toUpperCase();
    fs.writeFile("output.txt", modifiedData, step3);
}

function step3(err) {
    if (err) return handleError(err);
    fs.readFile("output.txt", "utf-8", step4);
}

=== PROMISE ÇÖZÜMÜ ===
fs.promises.readFile("input.txt", "utf-8")
    .then(data => data.toUpperCase())
    .then(modifiedData => fs.promises.writeFile("output.txt", modifiedData))
    .then(() => fs.promises.readFile("output.txt", "utf-8"))
    .then(finalData => console.log(finalData))
    .catch(err => console.error(err));

=== ASYNC/AWAIT ÇÖZÜMÜ ===
async function processFile() {
    try {
        const data = await fs.promises.readFile("input.txt", "utf-8");
        const modifiedData = data.toUpperCase();
        await fs.promises.writeFile("output.txt", modifiedData);
        const finalData = await fs.promises.readFile("output.txt", "utf-8");
        console.log(finalData);
    } catch (err) {
        console.error(err);
    }
}

=== ÖNEMLİ NOTLAR ===
📌 Callback hell gerçek bir problemdir ve çözülmelidir
📌 Modern JavaScript Promise ve async/await kullanır
📌 Named functions callback hell'i azaltabilir
📌 Control flow kütüphaneleri yardımcı olabilir
📌 Kod review'larda callback hell'e dikkat edin
*/

