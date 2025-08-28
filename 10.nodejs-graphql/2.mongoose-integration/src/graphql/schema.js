const gql = require('graphql-tag'); // gql template literal etiketi
const typeDefs = gql`
  type Product { // Mongoose modeline paralel GraphQL tipi
    id: ID
    title: String
    category: String
    price: Float
    inStock: Boolean
  }

  type Query { // Okuma istekleri
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation { // Yazma/Güncelleme/Silme istekleri
    createProduct(title: String!, category: String!, price: Float!, inStock: Boolean!): Product
    updateProduct(id: ID!, title: String, category: String, price: Float, inStock: Boolean): Product
    deleteProduct(id: ID!): Boolean
  }

`;

module.exports = typeDefs; // Şema dışa aktarımı

// Özet: GraphQL şeması Product tipi ile Query ve Mutation alanlarını tanımlar.