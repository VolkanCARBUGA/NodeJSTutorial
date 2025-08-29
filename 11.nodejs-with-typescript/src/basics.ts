// TypeScript Temel Veri Tipleri ve Özellikleri

// Boolean tipi: true/false değerleri alır
let isDone: boolean = false;

// Number tipi: Sayısal değerler (integer, float, decimal, hex, binary)
let num: number = 10;

// String tipi: Metin değerleri
let str: string = "Hello";

// Tuple tipi: Belirli sayıda ve sırada eleman içeren dizi
let list: [1, 2, 3]; // Sadece bu 3 elemanı içerebilir

// Array tipi: Aynı tipte elemanlardan oluşan dizi
let list2: number[] = [1, 2, 3]; // Sadece number tipinde elemanlar

// Generic Array tipi: Array<string> şeklinde de tanımlanabilir
let product: Array<string> = ["product1", "product2", "product3"];

// Any tipi: Herhangi bir tip olabilir (tip güvenliği yok)
let randomValue: any = 10;

// Undefined tipi: Tanımlanmamış değer
let xty = undefined;

// Null tipi: Boş değer
let notat = null;

// Enum tipi: Numaralandırılmış sabitler
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
let go = Direction.Up; // 0 değerini alır
console.log(go); // 0 yazdırır

// Tuple tipi: Farklı tiplerde elemanlar içerebilir
let abc: [string, number];
abc = ["asa", 123]; // İlk eleman string, ikinci eleman number

// Interface: Nesne yapısını tanımlar
interface User {
  name: string;        // Zorunlu alan
  id: number;          // Zorunlu alan
  email?: string;      // Opsiyonel alan (? ile işaretlenir)
  readonly createdAt: Date; // Salt okunur alan (değiştirilemez)
}

// Interface'i kullanan bir nesne oluşturuyoruz
const user: User = {
  name: "asa",
  id: 123,
  createdAt: new Date(), // email opsiyonel olduğu için vermeyebiliriz
};
user.name = "volkan"; // name alanını değiştirebiliriz
console.log(user.name); // "volkan" yazdırır

// Type alias: Interface'e alternatif olarak type kullanabiliriz
type Product = {
  title: string;
  price: number;
}

// Type alias kullanarak nesne oluşturuyoruz
const product1:Product={
  title:"product1",
  price:100
}
const product2:Product={
  title:"product2",
  price:200
}

// Fonksiyon tanımlamaları: Parametre ve dönüş tipleri belirtilir
function add(a:number,b:number):number{
  return a+b // İki sayıyı toplar ve number döndürür
}
function multiply(a:number,b:number):number{
  return a*b // İki sayıyı çarpar ve number döndürür
}
function divide(a:number,b:number):number{
  return a/b // İki sayıyı böler ve number döndürür
}

// Fonksiyonları çağırıp sonuçları değişkenlere atıyoruz
let x:number=add(1,2)      // x = 3
let y:number=multiply(1,2) // y = 2
let z:number=divide(1,2)   // z = 0.5
console.log(x,y,z) // 3 2 0.5 yazdırır
