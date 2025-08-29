// Express framework'ünü ve gerekli tip tanımlarını import ediyoruz
import express,{Express,Request,Response,NextFunction} from "express"
// User modelini ve interface'ini import ediyoruz
import { IUser, User } from "./models/user"

// Express uygulamasını oluşturuyoruz ve tip tanımı yapıyoruz
const app:Express=express()

// Sunucunun çalışacağı port numarasını tanımlıyoruz
const port=3000
// JSON formatındaki request body'lerini parse etmek için middleware ekliyoruz
app.use(express.json())

// Request nesnesini genişletmek için custom interface tanımlıyoruz
// startTime özelliği ekleyerek request'in başlangıç zamanını takip edebiliriz
interface CustomRequest extends Request{
 startTime?:number
}

// Middleware: Her request için başlangıç zamanını kaydediyoruz
// Bu middleware tüm route'lardan önce çalışır
app.use((req:CustomRequest,res:Response,next:NextFunction)=>{
    req.startTime=Date.now() // Şu anki zamanı milisaniye cinsinden kaydediyoruz
    next() // Bir sonraki middleware'e geçiyoruz
});

// GET /users endpoint'i: Tüm kullanıcıları veritabanından getiriyoruz
app.get("/users",async(req:Request,res:Response)=>{
   try {
    const users:IUser[]=await User.find() // Mongoose ile tüm kullanıcıları buluyoruz
    res.json(users) // Kullanıcıları JSON formatında döndürüyoruz
    
   } catch (error) {
    res.status(500).json({message:"Error fetching users"}) // Hata durumunda 500 hatası döndürüyoruz
    
   }
})

// User interface'i: POST request için kullanılacak veri yapısını tanımlıyoruz
interface User{
    name:string // Kullanıcı adı
    email:string // Kullanıcı email'i
}

// POST /user endpoint'i: Yeni kullanıcı oluşturuyoruz
app.post("/user",(req:Request<{},{},User>,res:Response)=>{
    const {name,email}=req.body // Request body'den name ve email'i alıyoruz
    
    res.json({
        message:`User created ${name} ${email}`, // Başarı mesajı döndürüyoruz
      
    })
});

// GET /user/:id endpoint'i: Belirli bir kullanıcıyı ID ile getiriyoruz
app.get("/user/:id",(req:Request,res:Response)=>{
    const {id}=req.params // URL parametresinden ID'yi alıyoruz
    res.json({
        message:"User fetched", // Başarı mesajı
        userId:id // Kullanıcı ID'sini döndürüyoruz
    })
});

// Ana sayfa endpoint'i: Basit bir "Hello World" mesajı döndürüyoruz
app.get("/",(req:Request,res:Response)=>{
  res.send("Hello World")
})

// Sunucuyu belirtilen portta başlatıyoruz
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Sunucu başladığında konsola mesaj yazdırıyoruz
});