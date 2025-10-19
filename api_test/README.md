# PetStore API Testing - Cypress

## 📋 Descripción del Proyecto

Este proyecto contiene pruebas automatizadas de API REST para la aplicación **PetStore** (https://petstore.swagger.io/) utilizando **Cypress.io** como framework de testing.

El objetivo es validar las operaciones CRUD (Crear, Leer, Actualizar) sobre el recurso de mascotas (pets) a través de peticiones HTTP.

---

## 🎯 Casos de Prueba Implementados

El proyecto incluye 4 casos de prueba principales:

1. **Añadir una mascota a la tienda**
   - Método: `POST /v2/pet`
   - Valida la creación exitosa de una mascota con datos aleatorios
   - Verifica que la respuesta contenga el ID y los datos correctos

2. **Consultar mascota por ID (Búsqueda por ID)**
   - Método: `GET /v2/pet/{petId}`
   - Crea una mascota y luego la consulta por su ID
   - Valida que los datos recuperados coincidan con los enviados

3. **Actualizar nombre y estatus de mascota a "sold"**
   - Método: `PUT /v2/pet`
   - Crea una mascota con estatus "available"
   - Actualiza el nombre y cambia el estatus a "sold"
   - Verifica que los cambios se aplicaron correctamente

4. **Consultar mascotas por estatus (Búsqueda por estatus)**
   - Método: `GET /v2/pet/findByStatus?status=sold`
   - Crea una mascota con estatus "sold"
   - Consulta todas las mascotas vendidas
   - Valida que la mascota creada aparezca en los resultados

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Cypress.io** - Framework de testing E2E y API
- **JavaScript** - Lenguaje de programación

---

## 📁 Estructura del Proyecto

```
api_test/
│
├── cypress/
│   ├── e2e/
│   │   └── petstore-api.cy.js    # Tests de la API
│   └── support/
│       ├── commands.js            # Comandos personalizados
│       └── e2e.js                 # Configuración global
│
├── node_modules/                  # Dependencias
├── cypress.config.js              # Configuración de Cypress
├── package.json                   # Dependencias del proyecto
├── README.md                      # Este archivo
└── CONCLUSIONS.md                 # Hallazgos y conclusiones
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js v14 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd api_test
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Verificar instalación de Cypress**
   ```bash
   npx cypress verify
   ```

---

## 🚀 Ejecución de las Pruebas

### Modo Headless (Recomendado para CI/CD)

Ejecutar todos los tests sin interfaz gráfica:

```bash
npm run test
```

O directamente con Cypress:

```bash
npx cypress run
```

### Modo Interactivo (Con interfaz gráfica)

Para desarrollo y debugging:

```bash
npx cypress open
```

Luego seleccionar el archivo `petstore-api.cy.js` desde la interfaz.

### Ejecutar un test específico

```bash
npx cypress run --spec "cypress/e2e/petstore-api.cy.js"
```

### Ejecutar con un navegador específico

```bash
npx cypress run --browser chrome
```

---

## 📊 Reportes y Resultados

### Videos

Los videos de las ejecuciones se guardan automáticamente en:
```
cypress/videos/
```

### Screenshots

En caso de fallos, los screenshots se guardan en:
```
cypress/screenshots/
```

### Resultados en Terminal

Después de ejecutar `npm run test`, verás un resumen con:
- ✅ Tests pasados
- ❌ Tests fallidos
- ⏱️ Tiempo de ejecución
- 📹 Ubicación de videos y screenshots

## 🔍 Funciones Helper

El proyecto incluye funciones reutilizables para mantener el código DRY:

- `crearMascota(nombre, estatus)` - Crea una nueva mascota
- `consultarMascotaPorId(id)` - Consulta una mascota por ID
- `actualizarMascota(mascotaData)` - Actualiza una mascota existente
- `consultarMascotasPorEstatus(estatus)` - Busca mascotas por estatus

---

## 🐛 Troubleshooting

### Error: "Can't run because no spec files were found"

**Solución:** Verifica que el archivo de test esté en `cypress/e2e/` y tenga la extensión `.cy.js`

### Error de conexión a la API

**Solución:** Verifica que la URL en `cypress.config.js` sea `https://petstore.swagger.io` (con HTTPS)

### Tests fallan aleatoriamente

**Solución:** Aumenta el `defaultCommandTimeout` en `cypress.config.js` a 15000 o 20000

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de las pruebas técnicas de QA Automation.

---

## 📄 Licencia

Este proyecto es de uso educativo y de evaluación técnica.

---

## 📚 Recursos Adicionales

- [Documentación de Cypress](https://docs.cypress.io/)
- [PetStore API Documentation](https://petstore.swagger.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)