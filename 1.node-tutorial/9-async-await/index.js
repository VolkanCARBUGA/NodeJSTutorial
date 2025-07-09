// 9. ASYNC/AWAIT - Asenkron JavaScript İşlemleri
// Async/await, Promise'leri daha okunabilir ve senkron kod gibi yazmamızı sağlar

/* 
=== ASYNC/AWAIT NEDİR? ===
Async/await, modern JavaScript'te asenkron işlemleri yönetmenin en temiz yoludur.
- async: Bir fonksiyonun asenkron olduğunu belirtir ve otomatik olarak Promise döndürür
- await: Promise'in tamamlanmasını bekler ve sonucu döndürür
- Promise tabanlı: Aslında Promise'lerin daha okunabilir halidir

=== ASYNC/AWAIT AVANTAJLARI ===
✨ Okunabilirlik: Senkron kod gibi görünür
✨ Hata yönetimi: try/catch ile kolay
✨ Debugging: Daha kolay debug edilir  
✨ Promise zinciri: .then() kullanmaya gerek yok
*/

// Gecikme fonksiyonu - Promise döndürür
function delayFn(time){
    // setTimeout'u Promise içine sararak bekleme işlemi oluşturuyoruz
    // resolve fonksiyonu belirtilen süre sonra çağrılacak
    return new Promise((resolve)=>setTimeout(resolve,time));
}

// Async fonksiyon - asenkron işlemler yapabilir
async function delayedGreet(name){
    // await anahtar kelimesi Promise'in tamamlanmasını bekler
    // Bu satır 2 saniye bekleyecek, ardından devam edecek
    await delayFn(2000);
    // Bekleme tamamlandıktan sonra bu satır çalışacak
    console.log("Hello",name);
}

// Fonksiyonu çağırıyoruz - 2 saniye sonra "Hello Hakan" yazdıracak
delayedGreet("Hakan");

// Bölme işlemi yapan async fonksiyon - hata yönetimi ile
async function division(number1,number2){
    try{
        // Sıfıra bölme kontrolü
        if(number2===0){
            // Hata fırlatıyoruz - catch bloğu yakalayacak
            throw new Error("Error: Division by zero");
        }
        // Normal bölme işlemi sonucunu döndürüyoruz
        return number1/number2;

    }catch(err){
        // Hata yakalandığında konsola yazdırıyoruz
        console.log(err);
        // Hata durumunda undefined döner
    }
}

// Ana fonksiyon - async/await kullanımını gösterir
async function main(){
    // await ile division fonksiyonunun sonucunu bekliyoruz
    // Normal bölme işlemi - sonuç: 5
    const result=await division(10,2);
    
    // Sıfıra bölme işlemi - hata oluşacak, undefined dönecek
    const result2=await division(10,0);
    
    // Sonuçları konsola yazdırıyoruz
    console.log(result);    // 5
    console.log(result2);   // undefined (çünkü hata oluştu)
}

/* 
=== ÇALIŞMA SIRASI ===
🎯 1. delayedGreet("Hakan") çağrılır → 2 saniye sonra "Hello Hakan" yazar
🎯 2. main() fonksiyonu çalışır:
     - division(10,2) → Sonuç: 5
     - division(10,0) → Hata yakalar, undefined döner
     - Her iki sonucu da konsola yazar

=== ÖNEMLİ NOTLAR ===
📌 Async fonksiyonlar her zaman Promise döndürür
📌 Await sadece async fonksiyonlar içinde kullanılabilir
📌 Try/catch ile hata yönetimi yapılabilir
📌 Async/await kod akışını senkron gibi gösterir ama aslında asenkrondur
*/

// Ana fonksiyonu çağırıyoruz
main();