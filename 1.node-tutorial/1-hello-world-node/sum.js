// 1. BASIT FONKSİYON TANIMLAMA VE KULLANIMI
// JavaScript'te fonksiyon oluşturma ve test etme

/*
=== FONKSİYON NEDİR? ===
Fonksiyon, belirli bir görevi yerine getiren, yeniden kullanılabilir kod bloğudur.
- Parametreler alabilir (giriş değerleri)
- İşlem yapar
- Sonuç döndürebilir (return)

=== FONKSİYON YAPISI ===
function fonksiyonAdı(parametre1, parametre2) {
    // İşlemler
    return sonuç;
}

=== FONKSİYON AVANTAJLARI ===
✨ Kod tekrarını önler
✨ Yeniden kullanılabilirlik sağlar
✨ Kodun organizasyonunu iyileştirir
✨ Test edilebilirlik artar
*/

// İki sayıyı alıp toplamını döndüren fonksiyon
// num1: İlk sayı parametresi
// num2: İkinci sayı parametresi
function sum(num1, num2) { // Function declaration - hoisting özelliği var
    // İki parametreyi toplar ve sonucu döndürür
    return num1 + num2; // Addition operator ve return statement
}

// Fonksiyonu 1 ve 2 sayıları ile test eder ve sonucu konsola yazdırır
// Beklenen sonuç: 3 (1 + 2 = 3)
console.log(sum(1,2));

/*
=== FONKSIYON ÇAĞIRMA ===
sum(1,2) şeklinde çağrıldığında:
1. num1 = 1, num2 = 2 değerlerini alır
2. 1 + 2 işlemini yapar
3. Sonuç olan 3'ü döndürür
4. console.log bu sonucu ekrana yazdırır

=== FONKSİYON TİPLERİ ===
- Function Declaration: function adı() { }
- Function Expression: const adı = function() { }
- Arrow Function: const adı = () => { }

=== TEST ETME ===
📌 Farklı değerlerle test edin: sum(5,10), sum(-1,1)
📌 Edge case'leri kontrol edin: sum(0,0)
📌 Hatalı girişleri test edin: sum("a","b")
*/