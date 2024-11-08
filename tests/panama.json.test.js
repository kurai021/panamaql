import fs from "fs";
import path from "path";

describe("panama.json", () => {
    let panamaData;

    beforeAll(() => {
        const filePath = path.join(process.cwd(), "api", "json", "panama.json");
        panamaData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    });

    test("should have correct structure", () => {
        expect(panamaData).toHaveProperty("panama");
        expect(Array.isArray(panamaData.panama)).toBe(true);
        expect(panamaData.panama[0]).toHaveProperty("detalles");
        expect(panamaData.panama[0]).toHaveProperty("provincia");
        expect(panamaData.panama[0]).toHaveProperty("comarca");
    });

    test("should have correct details", () => {
        panamaData.panama[0].detalles.forEach((detalles) => {
            expect(detalles).toHaveProperty("nombre");
            expect(detalles).toHaveProperty("capital");
            expect(detalles).toHaveProperty("habitantes");
            expect(detalles).toHaveProperty("superficie");
            expect(detalles).toHaveProperty("mapa");
        });
    });

    test("each provincia should have correct properties", () => {
        panamaData.panama[0].provincia.forEach((provincia) => {
            expect(provincia).toHaveProperty("id");
            expect(provincia).toHaveProperty("nombre");
            expect(provincia).toHaveProperty("capital");
            expect(provincia).toHaveProperty("habitantes");
            expect(provincia).toHaveProperty("superficie");
            expect(provincia).toHaveProperty("mapa");
            expect(provincia).toHaveProperty("distrito");
            expect(Array.isArray(provincia.distrito)).toBe(true);
        });
    });

    test("each region should have correct properties", () => {
        panamaData.panama[0].comarca.forEach((comarca) => {
            expect(comarca).toHaveProperty("id");
            expect(comarca).toHaveProperty("nombre");
            expect(comarca).toHaveProperty("capital");
            expect(comarca).toHaveProperty("habitantes");
            expect(comarca).toHaveProperty("superficie");
            expect(comarca).toHaveProperty("mapa");
            expect(comarca).toHaveProperty("distrito");
            expect(Array.isArray(comarca.distrito)).toBe(true);
        });
    });

    test("each district should have correct properties", () => {
        panamaData.panama[0].provincia.forEach((provincia) => {
            provincia.distrito.forEach((distrito) => {
                expect(distrito).toHaveProperty("id");
                expect(distrito).toHaveProperty("nombre");
                expect(distrito).toHaveProperty("cabecera");
                expect(distrito).toHaveProperty("corregimientos");
                expect(Array.isArray(distrito.corregimientos)).toBe(true);
            });
        });
    });

    test("each township should be a string", () => {
        panamaData.panama[0].provincia.forEach((provincia) => {
            provincia.distrito.forEach((distrito) => {
                distrito.corregimientos.forEach((corregimiento) => {
                    expect(typeof corregimiento).toBe("string");
                });
            });
        });
    });
});
