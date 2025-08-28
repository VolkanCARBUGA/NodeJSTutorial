require('dotenv').config(); // .env dosyasından ortam değişkenlerini yükle
const connectDB = require('./database/db'); // MongoDB bağlantı yardımcı fonksiyonu
const { ApolloServer } = require('@apollo/server'); // Apollo Server ana sınıfı
const { startStandaloneServer } = require('@apollo/server/standalone'); // Standalone başlatma
const typeDefs = require('./graphql/schema'); // GraphQL şeması
const resolvers = require('./graphql/resolvers'); // Resolver'lar

const port = process.env.PORT || 4000; // Dinlenecek port (varsayılan 4000)

async function startServer() { // Sunucuyu başlatan asenkron fonksiyon
  await connectDB(); // MongoDB'ye bağlan
  const server = new ApolloServer({ typeDefs, resolvers }); // Apollo Server'ı oluştur
  const { url } = await startStandaloneServer(server, {
    listen: { port: port }, // Portu ayarla
  });
  console.log(`🚀 Server is running on ${url}`); // URL'i logla
}

startServer(); // Uygulamayı çalıştır

// Özet: Bu dosya, MongoDB bağlantısını kurduktan sonra Apollo Server'ı başlatır ve GraphQL
// endpoint'ini 4000 portunda sunar.