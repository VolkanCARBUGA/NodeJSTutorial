const mongoose = require('mongoose'); // Mongoose bağlantı kütüphanesi

const connectDB = async () => { // MongoDB'ye bağlanan yardımcı fonksiyon
    try {
        await mongoose.connect(process.env.MONGO_URL); // .env içindeki MONGO_URL'i kullan
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error); // Hata logla
        process.exit(1); // Uygulamayı hatada kapat
    }

};

module.exports = connectDB; // Dışa aktarım

// Özet: Bu modül, Mongoose ile MongoDB bağlantısını kurar.