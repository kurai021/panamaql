import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import path from "path";
import http from "http";
import express from "express";
import cors from "cors";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonDataPath = path.join(__dirname, 'json/panama.json');
const jsonData = fs.readFileSync(jsonDataPath, 'utf-8');
const data = JSON.parse(jsonData);

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const typeDefs = gql`

  type Distrito {
    id: ID!
    name: String!
    cabecera: String
    corregimientos: [String!]!
  }

  type Comarca {
    id: ID!
    name: String!
    capital: String!
    distrito: [Distrito!]!
  }

  type Provincia {
    id: ID!
    name: String!
    capital: String!
    distrito: [Distrito!]!
  }

  type Query {
    provinciaByName(name: String!): Provincia
    comarcaByName(name: String!): Comarca
    distritoByName(name: String!): Distrito
    provincia: [Provincia!]!
    comarca: [Comarca!]!
  }

`;

const resolvers = {
  Query: {
    provinciaByName: (_, { name }) => {
      const provincia = data.panama[0].provincia.find((item) => item.name === name);
      return provincia ? provincia : null;
    },
    comarcaByName: (_, { name }) => {
      const comarca = data.panama[1].comarca.find((item) => item.name === name);
      return comarca ? comarca : null;
    },
    distritoByName: (_, { name }) => {
      let foundDistrito = null;

      // Búsqueda del distrito por nombre en las provincias
      data.panama[0].provincia.forEach((provincia) => {
        provincia.distrito.forEach((distrito) => {
          if (distrito.name === name) {
            foundDistrito = distrito;
          }
        });
      });

      // Si se encontró el distrito en las provincias, devolverlo
      if (foundDistrito) {
        return foundDistrito;
      }

      // Búsqueda del distrito por nombre en las comarcas
      data.panama[1].comarca.forEach((comarca) => {
        comarca.distrito.forEach((distrito) => {
          if (distrito.name === name) {
            foundDistrito = distrito;
          }
        });
      });

      return foundDistrito; // Devolver el distrito encontrado o null si no se encontró
    },
    provincia: () => data.panama[0].provincia,
    comarca: () => data.panama[1].comarca
  }
};

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true, // Habilitar la introspección GraphQL
    playground: true, // Habilitar el explorador GraphQL
    persistedQueries: false
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;