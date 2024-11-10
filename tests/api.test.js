import { ApolloServer } from "apollo-server-express";

describe("GraphQL API", () => {
    let query;
    let testServer;

    beforeAll(async () => {
        const { typeDefs, resolvers } = await import("../api/index.js");
        testServer = new ApolloServer({ typeDefs, resolvers });
    });

    test("should fetch country data", async () => {
        const GET_COUNTRY = `
		query {
			pais {
    			nombre
    			capital
    			habitantes
    			superficie
    			mapa
  			}
		}
	`;
        const res = await testServer.executeOperation({ query: GET_COUNTRY });
        expect(res.data.pais).toBeDefined();
        expect(res.data.pais.length).toBeGreaterThan(0);
    });

    test("should fetch all provinces", async () => {
        const GET_PROVINCES = `
      query {
        provincia {
          id
          nombre
		  mapa
		  capital
		  habitantes
		  superficie
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_PROVINCES });
        expect(res.data.provincia).toBeDefined();
        expect(res.data.provincia.length).toBeGreaterThan(0);
    });

    test("should fetch a specific province by id", async () => {
        const GET_PROVINCE = `
      query($id: String!) {
        provinciaById(id: $id) {
          id
          nombre
          capital
          distrito {
            id
            nombre
          }
        }
      }
    `;
        const res = await testServer.executeOperation({
            query: GET_PROVINCE,
            variables: { id: "PA-PO" },
        });
        expect(res.data.provinciaById).toBeDefined();
        expect(res.data.provinciaById.id).toBe("PA-PO");
        expect(res.data.provinciaById.distrito).toBeDefined();
    });

    test("should fetch a specific province by name", async () => {
        const GET_PROVINCE = `
      query($name: String!) {
        provinciaByName(nombre: $name) {
          id
          nombre
          capital
          distrito {
            id
            nombre
          }
        }
      }
    `;
        const res = await testServer.executeOperation({
            query: GET_PROVINCE,
            variables: { name: "Panamá" },
        });
        expect(res.data.provinciaByName).toBeDefined();
        expect(res.data.provinciaByName.nombre).toBe("Panamá");
        expect(res.data.provinciaByName.distrito).toBeDefined();
    });

    test("should fetch all regions", async () => {
        const GET_COMARCAS = `
      query {
        comarca {
          id
          nombre
		  mapa
		  capital
		  habitantes
		  superficie
        }
      }
    `;
        const res = await testServer.executeOperation({ query: GET_COMARCAS });
        expect(res.data.comarca).toBeDefined();
        expect(res.data.comarca.length).toBeGreaterThan(0);
    });

    test("should fetch a specific region by id", async () => {
        const GET_COMARCA = `
      query($id: String!) {
        comarcaById(id: $id) {
          id
          nombre
          capital
          distrito {
            id
            nombre
          }
        }
      }
    `;
        const res = await testServer.executeOperation({
            query: GET_COMARCA,
            variables: { id: "PA-GY" },
        });
        expect(res.data.comarcaById).toBeDefined();
        expect(res.data.comarcaById.id).toBe("PA-GY");
        expect(res.data.comarcaById.distrito).toBeDefined();
    });

    test("should fetch a specific region by name", async () => {
        const GET_COMARCA = `
      query($name: String!) {
        comarcaByName(nombre: $name) {
          id
          nombre
          capital
          distrito {
            id
            nombre
          }
        }
      }
    `;
        const res = await testServer.executeOperation({
            query: GET_COMARCA,
            variables: { name: "Guna Yala" },
        });
        expect(res.data.comarcaByName).toBeDefined();
        expect(res.data.comarcaByName.nombre).toBe("Guna Yala");
        expect(res.data.comarcaByName.distrito).toBeDefined();
    });

    test("should fetch a specific district", async () => {
        const GET_DISTRICT = `
      query($name: String!) {
        distritoByName(nombre: $name) {
          id
          nombre
          corregimientos
        }
      }
    `;
        const res = await testServer.executeOperation({
            query: GET_DISTRICT,
            variables: { name: "Panamá" },
        });
        expect(res.data.distritoByName).toBeDefined();
        expect(res.data.distritoByName.nombre).toBe("Panamá");
        expect(res.data.distritoByName.corregimientos).toBeDefined();
        expect(Array.isArray(res.data.distritoByName.corregimientos)).toBe(
            true,
        );
    });
});
