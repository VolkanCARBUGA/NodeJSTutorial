const { ApolloServer } = require('@apollo/server'); // Apollo Server ana sınıfını içe aktar
const { startStandaloneServer } = require('@apollo/server/standalone'); // Standalone modda sunucuyu başlatma yardımcıları
const typeDefs = require('./graphql/schema'); // GraphQL şema tanımları (typeDefs)
const resolvers = require('./graphql/resolvers'); // GraphQL resolver fonksiyonları

async function startServer() { // Sunucuyu başlatan asenkron fonksiyon
  const server = new ApolloServer({ typeDefs, resolvers }); // Şema ve resolver'larla Apollo örneği oluştur
  const { url } = await startStandaloneServer(server, { // Standalone server'ı ayağa kaldır
    listen: { port: 4000 }, // 4000 portunu dinle
  });
  console.log(`🚀 Server is running on ${url}`); // Başlatma bilgisini logla
}

startServer(); // Uygulamayı çalıştır

// Özet: Bu dosya Apollo Server'ı standalone modda 4000 portunda başlatır. Şemayı ve
// resolver'ları yükleyerek GraphQL endpoint'ini hazır hale getirir.