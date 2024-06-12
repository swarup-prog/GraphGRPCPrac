import express from "express";
import { createHandler } from "graphql-http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

(async () => {
  await server.start();
  app.all(
    "/graphql",
    express.json(),
    expressMiddleware(server),
    createHandler({
      schema,
      rootValue: resolvers,
    })
  );
})();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
