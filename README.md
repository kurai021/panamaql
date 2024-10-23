# PanamaQL

**PanamaQL** es una API construida en **GraphQL** para proporcionar información detallada sobre la división administrativa de Panamá, incluyendo provincias, distritos, corregimientos y comarcas. La API permite realizar consultas específicas sobre cada región y obtener detalles precisos como la capital de cada provincia o la cabecera de cada distrito.

## Características

-   **Consulta de Provincias**: Obtén información sobre las provincias, incluyendo sus distritos y capitales.
-   **Consulta de Distritos**: Busca distritos específicos por nombre, tanto en provincias como en comarcas.
-   **Consulta de Comarcas**: Detalla las comarcas con sus distritos y capitales.
-   **GraphQL API**: Una API flexible que permite obtener exactamente los datos que necesitas.

## Requisitos

-   **Node.js** (v14+)
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
		name
		capital
		distrito {
			id
			name
			cabecera
			corregimientos
		}
	}
}
```

2. Buscar una provincia por nombre

```graphql
query {
	provinciaByName(name: "Panamá") {
		id
		name
		capital
		distrito {
			name
		}
	}
}
```

3. Buscar un distrito por nombre

```graphql
query {
	distritoByName(name: "San Miguelito") {
		id
		name
		cabecera
		corregimientos
	}
}
```

4. Obtener todas las comarcas

```graphql
query {
	comarca {
		id
		name
		capital
		distrito {
			name
			corregimientos
		}
	}
}
```

5. Buscar una comarca por nombre

```graphql
query {
	comarcaByName(name: "Ngäbe-Buglé") {
		id
		name
		capital
		distrito {
			id
			name
			cabecera
			corregimientos
		}
	}
}
```

## Contribución

¡Las contribuciones son bienvenidas! Si quieres colaborar, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
