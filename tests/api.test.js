import { ApolloServer } from 'apollo-server-express';

describe('GraphQL API', () => {
    let query;
    let testServer;

    beforeAll(async () => {
        const { typeDefs, resolvers } = await import('../api/index.js');
        testServer = new ApolloServer({ typeDefs, resolvers });
    });

    test('should fetch all provinces', async () => {
        const GET_PROVINCES = `
      query {
        provincia {
          id
          name
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_PROVINCES });
        expect(res.data.provincia).toBeDefined();
        expect(res.data.provincia.length).toBeGreaterThan(0);
    });

    test('should fetch a specific province', async () => {
        const GET_PROVINCE = `
      query($name: String!) {
        provinciaByName(name: $name) {
          id
          name
          capital
          distrito {
            id
            name
          }
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_PROVINCE, variables: { name: "Panamá" } });
        expect(res.data.provinciaByName).toBeDefined();
        expect(res.data.provinciaByName.name).toBe("Panamá");
        expect(res.data.provinciaByName.distrito).toBeDefined();
    });

    test('should fetch all comarcas', async () => {
        const GET_COMARCAS = `
      query {
        comarca {
          id
          name
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_COMARCAS });
        expect(res.data.comarca).toBeDefined();
        expect(res.data.comarca.length).toBeGreaterThan(0);
    });

    test('should fetch a specific comarca', async () => {
        const GET_COMARCA = `
      query($name: String!) {
        comarcaByName(name: $name) {
          id
          name
          capital
          distrito {
            id
            name
          }
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_COMARCA, variables: { name: "Guna Yala" } });
        expect(res.data.comarcaByName).toBeDefined();
        expect(res.data.comarcaByName.name).toBe("Guna Yala");
        expect(res.data.comarcaByName.distrito).toBeDefined();
    });

    test('should fetch a specific district', async () => {
        const GET_DISTRICT = `
      query($name: String!) {
        distritoByName(name: $name) {
          id
          name
          corregimientos
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_DISTRICT, variables: { name: "Panamá" } });
        expect(res.data.distritoByName).toBeDefined();
        expect(res.data.distritoByName.name).toBe("Panamá");
        expect(res.data.distritoByName.corregimientos).toBeDefined();
        expect(Array.isArray(res.data.distritoByName.corregimientos)).toBe(true);
    });
});
