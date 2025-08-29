// Mongoose ve gerekli tip tanımlarını import ediyoruz
import mongoose,{Schema,Document} from "mongoose";

// IUser interface'i: Mongoose Document'ini extend ederek kullanıcı veri yapısını tanımlıyoruz
// Document interface'i Mongoose'un sağladığı _id, __v gibi alanları içerir
interface IUser extends Document{
    name:string      // Kullanıcı adı
    email:string     // Kullanıcı email adresi
    age:number       // Kullanıcı yaşı
    createdAt:Date   // Kullanıcının oluşturulma tarihi
}

// Mongoose Schema tanımı: Veritabanı koleksiyonunun yapısını belirliyoruz
// Schema<IUser> generic tipi ile TypeScript tip güvenliği sağlıyoruz
const userSchema = new Schema<IUser>({
  name: String,      // String tipinde name alanı
  email: String,     // String tipinde email alanı
  age: Number,       // Number tipinde age alanı
  createdAt: Date    // Date tipinde createdAt alanı
});

// Mongoose model oluşturuyoruz: "User" koleksiyonu için model tanımlıyoruz
// Bu model veritabanı işlemlerini (CRUD) gerçekleştirmek için kullanılır
const User=mongoose.model<IUser>("User",userSchema)

// Model ve interface'i export ediyoruz
export {User}        // User modelini export ediyoruz
export type {IUser}  // IUser interface'ini type olarak export ediyoruz
