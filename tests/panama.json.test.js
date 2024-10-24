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
        expect(panamaData.panama[0]).toHaveProperty("provincia");
        expect(panamaData.panama[1]).toHaveProperty("comarca");
    });

    test("each province should have correct properties", () => {
        panamaData.panama[0].provincia.forEach((province) => {
            expect(province).toHaveProperty("id");
            expect(province).toHaveProperty("name");
            expect(province).toHaveProperty("capital");
            expect(province).toHaveProperty("distrito");
            expect(Array.isArray(province.distrito)).toBe(true);
        });
    });

    test("each district should have correct properties", () => {
        panamaData.panama[0].provincia.forEach((province) => {
            province.distrito.forEach((district) => {
                expect(district).toHaveProperty("id");
                expect(district).toHaveProperty("name");
                expect(district).toHaveProperty("cabecera");
                expect(district).toHaveProperty("corregimientos");
                expect(Array.isArray(district.corregimientos)).toBe(true);
            });
        });
    });

    test("each corregimiento should be a string", () => {
        panamaData.panama[0].provincia.forEach((province) => {
            province.distrito.forEach((district) => {
                district.corregimientos.forEach((corregimiento) => {
                    expect(typeof corregimiento).toBe("string");
                });
            });
        });
    });
});
