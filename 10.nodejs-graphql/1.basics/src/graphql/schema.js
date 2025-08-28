const gql = require('graphql-tag'); // gql template literal etiketi
const typeDefs = gql`
  type Product { // Ürün tip tanımı
    id: ID
    title: String
    category: String
    price: Float
    inStock: Boolean
  }

  type Query { // Okuma operasyonları
    products: [Product!]! // Ürün listesini döndürür (boş olabilir ama null olamaz)
    product(id: ID!): Product // ID ile tek bir ürünü döndürür
  }

  type Mutation { // Yazma/Güncelleme operasyonları
    createProduct(title: String!, category: String!, price: Float!, inStock: Boolean!): Product
    updateProduct(id: ID!, title: String, category: String, price: Float, inStock: Boolean): Product
    deleteProduct(id: ID!): Boolean
  }

`;

module.exports = typeDefs; // Şeme dışa aktarımı

// Özet: GraphQL şeması Product tipi, Query ve Mutation alanlarını tanımlar.