require("dotenv").config();
const { ApolloServer } = require("@apollo/server");

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("connecting to MongoDB");
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("failed to connecting to MongoDB:", error));

const typeDefs = require("./types/types");
const resolvers = require("./resolvers/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;
