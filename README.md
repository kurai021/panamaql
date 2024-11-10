# PanamaQL

**PanamaQL** es una API construida en **GraphQL** para proporcionar información detallada sobre la división administrativa de Panamá, incluyendo provincias, distritos, corregimientos y comarcas. La API permite realizar consultas específicas sobre cada región y obtener detalles precisos como la capital de cada provincia o la cabecera de cada distrito.

## Características

-   **Consulta de Provincias**: Obtén información sobre las provincias, incluyendo sus distritos y capitales.
-   **Consulta de Distritos**: Busca distritos específicos por nombre, tanto en provincias como en comarcas.
-   **Consulta de Comarcas**: Detalla las comarcas con sus distritos y capitales.
-   **GraphQL API**: Una API flexible que permite obtener exactamente los datos que necesitas.

## Requisitos

-   **NVM** ([Node Version Manager](https://github.com/nvm-sh/nvm)) o N ([n – Interactively Manage Your Node.js Versions](https://github.com/tj/n))
-   **Node.js** (v18+)
-   **npm** o **yarn**

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/kurai021/panamaql.git
    ```

2. Entra en el directorio del proyecto:

    ```bash
    cd panamaql
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

    o si prefieres `yarn`:

    ```bash
    yarn install
    ```

4. Ejecuta el servidor:

    ```bash
    npm run dev
    ```

    o, si usas `yarn`:

    ```bash
    yarn dev
    ```

El servidor estará disponible en `http://localhost:3000`.

## Uso

### Ejemplos de Consultas en GraphQL

Una vez que el servidor esté en ejecución, puedes acceder a la interfaz de **GraphQL Playground** en `http://localhost:3000/graphql` para realizar consultas.

1. Obtener todas las provincias con sus distritos y corregimientos:

```graphql
query {
    provincia {
        id
        nombre
        mapa
        capital
        habitantes
        superficie
        distrito {
            id
            nombre
            cabecera
            corregimientos
        }
    }
}
```

2. Buscar una provincia por ID, en la siguiente tabla se muestran los IDs por provincia

| ID    | Provincia      |
| ----- | -------------- |
| PA-BT | Bocas del Toro |
| PA-C  | Coclé          |
| PA-CL | Colón          |
| PA-CH | Chiriquí       |
| PA-D  | Darién         |
| PA-H  | Herrera        |
| PA-LS | Los Santos     |
| PA-P  | Panamá         |
| PA-PO | Panamá Oeste   |
| PA-V  | Veraguas       |

```graphql
query {
    provinciaById(id: "PA-V") {
        id
        nombre
        mapa
        capital
        distrito {
            nombre
        }
    }
}
```

3. Buscar una provincia por nombre

```graphql
query {
    provinciaByName(name: "Panamá") {
        id
        nombre
        mapa
        capital
        distrito {
            nombre
        }
    }
}
```

4. Buscar un distrito por nombre

```graphql
query {
    distritoByName(name: "San Miguelito") {
        id
        nombre
        cabecera
        corregimientos
    }
}
```

5. Obtener todas las comarcas

```graphql
query {
    comarca {
        id
        nombre
        mapa
        capital
        habitantes
        superficie
        distrito {
            nombre
            corregimientos
        }
    }
}
```

5. Buscar una comarca por ID, en la siguiente tabla se muestran los IDs por comarca

| ID     | Comarca        |
| ------ | -------------- |
| PA-EW  | Emberá-Wounaan |
| PA-GY  | Guna Yala      |
| PA-NTD | Naso Tjër Di   |
| PA-NB  | Ngäbe-Buglé    |

```graphql
query {
    comarcaById(id: "PA-NTD") {
        id
        nombre
        capital
        distrito {
            id
            nombre
            cabecera
            corregimientos
        }
    }
}
```

6. Buscar una comarca por nombre

```graphql
query {
    comarcaByName(name: "Ngäbe-Buglé") {
        id
        nombre
        capital
        distrito {
            id
            nombre
            cabecera
            corregimientos
        }
    }
}
```

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm test

# o si usas yarn

yarn test
```

## Contribución

¡Las contribuciones son bienvenidas! Si quieres colaborar, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
