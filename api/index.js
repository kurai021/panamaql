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

export const typeDefs = gql`

  # Define los distritos de Panamá
  type Distrito {
    id: ID!
    name: String!
    cabecera: String
    corregimientos: [String!]!
  }

  # Define las comarcas de Panamá
  type Comarca {
    id: ID!
    name: String!
    capital: String!
    distrito: [Distrito!]!
  }

  # Define las provincias de Panamá
  type Provincia {
    id: ID!
    name: String!
    capital: String!
    distrito: [Distrito!]!
  }

  # Los tipos de busqueda que se pueden realizar
  type Query {
    # Busqueda de provincia por nombre
    provinciaByName(name: String!): Provincia
    # Busqueda de comarca por nombre
    comarcaByName(name: String!): Comarca
    # Busqueda de distrito por nombre
    distritoByName(name: String!): Distrito
    # Obtener la lista de provincias
    provincia: [Provincia!]!
    # Obtener la lista de comarcas
    comarca: [Comarca!]!
  }

`;

export const resolvers = {
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
        introspection: true,
        persistedQueries: false
    });

    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;
