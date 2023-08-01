// server.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const prisma = new PrismaClient();
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});
