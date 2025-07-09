// 10. CUSTOM EVENT EMITTER - ÖZEL OLAY YANICI SINIFI
// EventEmitter'dan miras alan özel sınıf oluşturma ve kullanımı

/*
=== CUSTOM EVENT EMITTER SINIFI NEDİR? ===
EventEmitter class'ından miras alan özel sınıflar:
- EventEmitter'ın tüm özelliklerini kalıtır
- Kendi özel method ve property'lerini ekler
- Class-based event handling sağlar
- Daha organize ve nesne yönelimli yaklaşım

=== INHERITANCE (KALITIM) ===
- extends: Sınıf kalıtımı için kullanılır
- super(): Parent class constructor'ını çağırır
- super.method(): Parent class method'larını çağırır
- this: Current instance referansı

=== CONSTRUCTOR PATTERNI ===
- constructor(): Sınıf örneği oluşturulurken çalışır
- super() ile parent constructor çağrılır
- İlk kurulum işlemleri yapılır
- Event listener'lar burada tanımlanabilir

=== THIS CONTEXT ===
Arrow function (=>) this binding'i korur:
- Normal function: this context değişir
- Arrow function: this context korunur
- Class method'larında arrow function önemli
*/

// EventEmitter class'ını Node.js'in events modülünden import eder
import EventEmitter from "events"; // Built-in events modülünü içe aktar

// EventEmitter'dan miras alan özel sınıf tanımı
// extends keyword ile inheritance (kalıtım) sağlanır
class MyCustomEmitter extends EventEmitter {
    // Constructor: Sınıf örneği oluşturulurken çalışan method
    constructor(parameters) { // parameters: İsteğe bağlı başlangıç parametreleri
        // Parent class (EventEmitter) constructor'ını çağır
        // Bu çağrı olmadan EventEmitter özellikleri kullanılamaz
        super();
        
        // Sınıfa özel property tanımla
        // greeting: Selamlama mesajı için kullanılacak
        this.greeting="Hello";
        
        // Constructor içinde event listener tanımla
        // "greet" event'i dinlenip otomatik handler atanır
        // Arrow function kullanılır çünkü this context'ini korur
        this.on("greet",(name)=>{
            // this.greeting property'sine erişim
            console.log(this.greeting,name); // "Hello {name}" çıktısı
        });
    }
    
    // Sınıfa özel method: greet event'ini tetikler
    // Public method: dışarıdan çağrılabilir
    greet(name){
        // "greet" event'ini emit eder ve name parametresini gönderir
        // Bu method çağrıldığında constructor'daki listener tetiklenir
        this.emit("greet",name);
    }
}

console.log("=== CUSTOM EVENT EMITTER ÖRNEĞİ ===");

// Custom class'dan yeni bir instance oluştur
// Constructor çalışır ve başlangıç ayarları yapılır
const myCustomEmitter=new MyCustomEmitter();

// Instance'a harici bir listener daha ekle
// Aynı event için birden fazla listener olabilir
myCustomEmitter.on("greet",(name)=>{
    console.log("greeting event input",name); // Ek bilgi çıktısı
});

console.log("1. Custom greet method çağrılıyor:");

// Custom method'u çağır - bu aşağıdaki olayları tetikler:
// 1. greet() method emit("greet", "Hakan") çalıştırır
// 2. Constructor'daki listener çalışır: "Hello Hakan"
// 3. Harici listener çalışır: "greeting event input Hakan"
myCustomEmitter.greet("Hakan");

/*
=== ÇALIŞMA AKIŞI ===

1. MyCustomEmitter class'ı tanımlanır (EventEmitter'dan miras alır)
2. constructor() çalışır:
   - super() ile EventEmitter başlatılır
   - greeting property "Hello" olarak set edilir
   - "greet" event için listener eklenir
3. myCustomEmitter instance'ı oluşturulur
4. Harici listener eklenir
5. greet("Hakan") çağrılır:
   - emit("greet", "Hakan") tetiklenir
   - İki listener sırayla çalışır

=== CUSTOM EVENT EMITTER AVANTAJLARI ===

✨ Encapsulation: İlgili data ve behavior bir arada
✨ Reusability: Aynı class'dan birden fazla instance
✨ Extensibility: Kolayca yeni özellikler eklenebilir
✨ Organization: Kod daha organized ve maintainable
✨ Type Safety: Class-based approach daha güvenli

=== GERÇEK DÜNYA ÖRNEKLERİ ===

1. Database Connection Pool:
class DBPool extends EventEmitter {
    connect() { this.emit('connected'); }
    disconnect() { this.emit('disconnected'); }
}

2. File Processor:
class FileProcessor extends EventEmitter {
    process(file) { this.emit('progress', percentage); }
}

3. HTTP API Client:
class APIClient extends EventEmitter {
    request(url) { this.emit('response', data); }
}

=== BEST PRACTICES ===

📌 Constructor'da super() ilk satırda çağırılmalı
📌 Arrow function kullanın (this binding için)
📌 Event isimleri constant olarak tanımlanabilir
📌 Error handling ekleyin
📌 Memory leak'e karşı listener'ları temizleyin

=== DİKKAT EDİLECEK NOKTALAR ===

⚠️ super() çağrılmazsa ReferenceError oluşur
⚠️ Arrow function kullanmazsanız this context kaybolur
⚠️ Constructor parametreleri isteğe bağlıdır
⚠️ Instance method'ları emit() için kullanılmalı
⚠️ Multiple inheritance JavaScript'te desteklenmez

=== EXTENDED ÖRNEK ===

class ChatRoom extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.users = [];
        
        this.on('userJoin', (user) => {
            this.users.push(user);
            console.log(`${user} joined ${this.name}`);
        });
    }
    
    join(user) {
        this.emit('userJoin', user);
    }
    
    leave(user) {
        this.emit('userLeave', user);
    }
}
*/




