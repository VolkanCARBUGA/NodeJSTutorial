// 10. EVENT EMITTER - OLAY YANICI SISTEMI
// Node.js'te event-driven programming ve observer pattern implementasyonu

/*
=== EVENT EMITTER NEDİR? ===
EventEmitter, Node.js'in yerleşik event sistemidir.
- Observer pattern implementasyonu
- Event-driven programming için temel yapı
- Asenkron iletişim sağlar
- Loosely coupled (gevşek bağlı) sistemler oluşturur

=== EVENT-DRIVEN PROGRAMMING ===
Program akışı olaylar (events) tarafından yönlendirilen programlama paradigması:
- Olay oluşur (emit)
- Dinleyiciler (listeners) tetiklenir
- Handler fonksiyonları çalışır
- Asenkron ve non-blocking

=== TEMEL KAVRAMLAR ===
- Event: Gerçekleşen olay (string isim)
- Listener: Olayı dinleyen fonksiyon
- Emit: Olay fırlatma işlemi
- Handler: Olay gerçekleştiğinde çalışan fonksiyon

=== NODE.JS'TE EVENT KULLANIMI ===
Birçok Node.js modülü EventEmitter'den türer:
- HTTP Server: request, close events
- File System: change, error events
- Process: exit, uncaughtException events
*/

// EventEmitter class'ını Node.js'in events modülünden import eder
import EventEmitter from "events"; // Built-in events modülünden default export

console.log("=== EVENT EMITTER ÖRNEKLERİ ===");

// Yeni bir EventEmitter instance'ı oluştur
const myFirstEmitter = new EventEmitter(); // Constructor ile yeni instance oluşturma

// Event listener (dinleyici) ekleme
// "greet" olayını dinler ve parametre olarak name alır
myFirstEmitter.on("greet", (name) => {
    console.log(`👋 Merhaba ${name}! (Event listener'dan)`);
});

// Aynı event için birden fazla listener ekleyebiliriz
myFirstEmitter.on("greet", (name) => {
    console.log(`🎉 ${name} için ikinci selamlama!`);
});

// Event fırlatma (emit) - "greet" event'ini tetikler
console.log("1. Event fırlatılıyor:");
myFirstEmitter.emit("greet", "Hakan");

console.log("\n=== FARKLI EVENT TÜRLERİ ===");

// Birden fazla parametre ile event
myFirstEmitter.on("userLogin", (username, timestamp, ip) => {
    console.log(`🔐 Kullanıcı girişi:`);
    console.log(`   Kullanıcı: ${username}`);
    console.log(`   Zaman: ${timestamp}`);
    console.log(`   IP: ${ip}`);
});

// Error event - özel bir event türü
myFirstEmitter.on("error", (error) => {
    console.error("❌ Hata oluştu:", error.message);
});

// Success event
myFirstEmitter.on("success", (operation, data) => {
    console.log(`✅ İşlem başarılı: ${operation}`);
    console.log(`   Sonuç: ${JSON.stringify(data)}`);
});

// Event'leri fırlat
console.log("2. Login event fırlatılıyor:");
myFirstEmitter.emit("userLogin", "volkan123", new Date().toLocaleString(), "192.168.1.100");

console.log("\n3. Success event fırlatılıyor:");
myFirstEmitter.emit("success", "Dosya işleme", { fileCount: 5, size: "2.3MB" });

console.log("\n4. Error event fırlatılıyor:");
myFirstEmitter.emit("error", new Error("Bağlantı hatası"));

console.log("\n=== ONCE LISTENER ÖRNEĞİ ===");

// once() - Sadece bir kez çalışan listener
myFirstEmitter.once("firstTime", (message) => {
    console.log(`🆕 İlk kez çalışan listener: ${message}`);
});

// İlk çağrı - listener çalışır
console.log("5. First time event (ilk kez):");
myFirstEmitter.emit("firstTime", "Bu sadece bir kez görünür");

// İkinci çağrı - listener çalışmaz (once kullanıldığı için)
console.log("6. First time event (ikinci kez):");
myFirstEmitter.emit("firstTime", "Bu görünmeyecek");

/*
=== EVENT EMITTER METODLARI ===

1. on(event, listener): Event listener ekler
   - Alias: addListener()
   - Sürekli dinler

2. once(event, listener): Tek seferlik listener
   - İlk emit'ten sonra otomatik kaldırılır

3. emit(event, ...args): Event fırlatır
   - Tüm listener'ları sırayla çağırır
   - Boolean döndürür (listener var mı?)

4. removeListener(event, listener): Listener kaldırır
   - Alias: off()

5. removeAllListeners(event): Tüm listener'ları kaldırır

6. listenerCount(event): Listener sayısını döndürür

7. listeners(event): Listener listesini döndürür

=== CUSTOM EVENT EMITTER CLASS ÖRNEĞİ ===

class MyCustomEmitter extends EventEmitter {
    constructor() {
        super();
    }
    
    start() {
        this.emit('started', Date.now());
    }
    
    stop() {
        this.emit('stopped', Date.now());
    }
}

=== GERÇEK DÜNYA ÖRNEKLERİ ===

1. HTTP Server:
server.on('request', (req, res) => { ... });
server.on('connection', (socket) => { ... });

2. File Watcher:
watcher.on('change', (filename) => { ... });
watcher.on('error', (error) => { ... });

3. Database Connection:
db.on('connect', () => { ... });
db.on('disconnect', () => { ... });

=== EVENT EMITTER BEST PRACTICES ===
📌 Error event'lerini her zaman dinleyin
📌 Memory leak'ten kaçınmak için listener'ları temizleyin
📌 Event isimlerinde consistent naming kullanın
📌 Too many listeners warning'ine dikkat edin
📌 Event parameter'larını tutarlı tutun

=== AVANTAJLAR ===
✨ Loosely coupled architecture
✨ Asenkron iletişim
✨ Plugin ve modüler sistem desteği
✨ Observer pattern implementation
✨ Non-blocking event handling

=== DİKKAT EDİLECEK NOKTALAR ===
⚠️ Error event dinlenmezse process crash olabilir
⚠️ Too many listeners memory leak'e sebep olabilir
⚠️ Event names case-sensitive'dir
⚠️ Listener'lar sırayla (synchronously) çalışır
*/





