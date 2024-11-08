import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import path from "path";
import http from "http";
import express from "express";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonDataPath = path.join(__dirname, "json/panama.json");
const jsonData = fs.readFileSync(jsonDataPath, "utf-8");
const data = JSON.parse(jsonData);

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

export const typeDefs = gql`
    # Define los distritos de Panamá
    type Distrito {
        id: ID!
        nombre: String!
        cabecera: String
        corregimientos: [String!]!
    }

    # Define las comarcas de Panamá
    type Comarca {
        id: ID!
        nombre: String!
        mapa: String!
        habitantes: String!
        superficie: String!
        capital: String!
        distrito: [Distrito!]!
    }

    # Define las provincias de Panamá
    type Provincia {
        id: ID!
        nombre: String!
        mapa: String!
        habitantes: String!
        superficie: String!
        capital: String!
        distrito: [Distrito!]!
    }

    # Define detalles del país
    type Pais {
        nombre: String!
        capital: String!
        mapa: String!
        provincia: [Provincia!]!
        comarca: [Comarca!]!
    }

    # Los tipos de busqueda que se pueden realizar
    type Query {
        # Busqueda de provincia por nombre
        provinciaByName(nombre: String!): Provincia
        # Busqueda de comarca por nombre
        comarcaByName(nombre: String!): Comarca
        # Busqueda de distrito por nombre
        distritoByName(nombre: String!): Distrito
        # Obtener datos del país
        pais: [Pais!]!
        # Obtener la lista de provincias
        provincia: [Provincia!]!
        # Obtener la lista de comarcas
        comarca: [Comarca!]!
    }
`;

export const resolvers = {
    Query: {
        provinciaByName: (_, { nombre }) => {
            const provincia = data.panama[0].provincia.find(
                (item) => item.nombre === nombre,
            );
            return provincia ? provincia : null;
        },
        comarcaByName: (_, { nombre }) => {
            const comarca = data.panama[0].comarca.find(
                (item) => item.nombre === nombre,
            );
            return comarca ? comarca : null;
        },
        distritoByName: (_, { nombre }) => {
            let foundDistrito = null;

            // Búsqueda del distrito por nombre en las provincias
            data.panama[0].provincia.forEach((provincia) => {
                provincia.distrito.forEach((distrito) => {
                    if (distrito.nombre === nombre) {
                        foundDistrito = distrito;
                    }
                });
            });

            // Si se encontró el distrito en las provincias, devolverlo
            if (foundDistrito) {
                return foundDistrito;
            }

            // Búsqueda del distrito por nombre en las comarcas
            data.panama[0].comarca.forEach((comarca) => {
                comarca.distrito.forEach((distrito) => {
                    if (distrito.nombre === nombre) {
                        foundDistrito = distrito;
                    }
                });
            });

            return foundDistrito; // Devolver el distrito encontrado o null si no se encontró
        },
        pais: () => {
            const panamaDetails = data.panama[0].detalles[0]; // Obtener el país
            const provincias = data.panama[0].provincia; // Obtener las provincias
            const comarcas = data.panama[0].comarca; // Obtener las comarcas

            // Agregar provincias y comarcas al objeto país
            return [
                {
                    ...panamaDetails,
                    provincia: provincias,
                    comarca: comarcas,
                },
            ];
        },
        provincia: () => data.panama[0].provincia,
        comarca: () => data.panama[0].comarca,
    },
};

const startApolloServer = async (app, httpServer) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        introspection: true,
        persistedQueries: false,
    });

    await server.start();
    server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
