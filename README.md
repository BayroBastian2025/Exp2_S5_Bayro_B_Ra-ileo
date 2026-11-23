# ✦ Nómade – Planificador de viajes

Proyecto de la **Semana 5 – Integrando nuestro frontend con backend**
Asignatura: Desarrollo Frontend II (PFY2202) · Autor: _Bayro Rañileo_

📁 **Repositorio:** `https://github.com/TU-USUARIO/viajes-bayro-ranileo-PFY2202`
🌐 **Sitio publicado (gh-pages):** `https://bayrobastian2025.github.io/Exp2_S5_Bayro_B_Ra-ileo/`

Nómade es una aplicación para planificar viajes: el usuario explora destinos del mundo, elige uno y revisa los
**vuelos** y **hoteles** disponibles con sus precios, fechas y cupos. Después arma su itinerario, ajusta los pasajeros
y lo confirma obteniendo un código de reserva.

## Requerimientos del caso y dónde se cumplen

| Requerimiento | Dónde está |
| --- | --- |
| **API REST mock** que lista los destinos (país y actividades populares) | `src/mocks/handlers.js` (`GET /api/destinos?region=` y `GET /api/destinos/:id`) · cliente en `src/api/rest.js` · hook `src/hooks/useFetch.js` |
| **API GraphQL mock** para vuelos y hoteles de cada destino (precios, fechas, disponibilidad) | `src/mocks/handlers.js` (`OfertasDestino` y `GuardarItinerario`) · consultas en `src/api/operaciones.js` |
| Seleccionar un destino y ver sus vuelos y hoteles | `src/pages/Explorar.jsx` → `src/pages/DestinoLayout.jsx` con las pestañas Resumen / Vuelos / Hoteles |
| **React Router** | `src/routes/AppRoutes.jsx`: rutas anidadas, ruta dinámica, parámetros de búsqueda (`useSearchParams`), `NavLink`, 404 |
| Interfaz funcional y **responsiva** | CSS propio con variables, grillas fluidas y barra de pestañas inferior en móvil |
| **Manejo de estado** (`useState` + `useEffect`) | `useFetch.js` (carga/error/reintento), filtros y contadores (`useState`), `ItinerarioContext.jsx` (estado compartido + persistencia con `useEffect`) |
| Código **modular y reutilizable** | `components/` (tarjetas, medidor, estados), `pages/`, `api/`, `hooks/`, `context/`, `mocks/`, `styles/` |
| Publicación en **GitHub + gh-pages** | Scripts `predeploy` / `deploy` y sección "Publicación" |

## Cómo funciona el backend mock

Se usa **MSW (Mock Service Worker)**: un Service Worker intercepta las peticiones del navegador y responde con datos
simulados (con una pequeña latencia para ver los estados de carga). No hace falta levantar ningún servidor.

**REST** – destinos, consumidos con `fetch`:

```http
GET api/destinos                → todos los destinos
GET api/destinos?region=Europa  → destinos filtrados en el "servidor"
GET api/destinos/tokio          → detalle (404 si no existe)
```

**GraphQL** – vuelos y hoteles con **Apollo Client**, en un único endpoint `/graphql`. Una sola consulta trae ambos
listados (ventaja frente a REST, que requeriría dos endpoints):

```graphql
query OfertasDestino($destinoId: ID!) {
  ofertasDestino(destinoId: $destinoId) {
    vuelos  { id aerolinea codigo salida regreso precio cupos capacidad }
    hoteles { id nombre categoria precioNoche disponibleDesde disponibleHasta habitaciones }
  }
}

mutation GuardarItinerario($input: ItinerarioInput!) {
  guardarItinerario(input: $input) { id estado noches total }
}
```

La mutation valida la disponibilidad, descuenta cupos y devuelve el total. También se controlan **errores**
(servidor caído, destino inexistente, sin cupos) con mensajes claros y botón **Reintentar**.

## Tecnologías

- **React 18** + **Vite**
- **React Router v6**: rutas anidadas con `<Outlet context>`, ruta dinámica `/destino/:destinoId`, `useSearchParams`, `React.lazy`, `HashRouter`
- **Apollo Client** + **GraphQL** · **MSW 2** para el backend mock
- **CSS puro** organizado en `src/styles/` (variables, base, layout, componentes), tema oscuro y diseño _mobile-first_
- **Vitest + Testing Library**

## Estructura del proyecto

```
src/
├── api/          # Cliente REST, cliente Apollo y operaciones GraphQL
├── components/   # Layout, Navbar, TarjetaDestino/Vuelo/Hotel, Medidor, BarraItinerario, estados de UI
├── context/      # ItinerarioContext (destino + vuelo + hotel + pasajeros)
├── hooks/        # useFetch y useDestinos
├── mocks/        # Datos, handlers MSW (REST + GraphQL), worker y server de pruebas
├── pages/        # Inicio, Explorar, DestinoLayout (+ Resumen, Vuelos, Hoteles), Itinerario, NoEncontrada
├── routes/       # AppRoutes
├── styles/       # CSS modular
├── test/         # Pruebas automáticas
└── utils/        # Formato de dinero y fechas
```

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio con buscador y destinos destacados |
| `/explorar?region=&q=&orden=` | Listado de destinos con filtros guardados en la URL |
| `/destino/:destinoId` | Resumen del destino (REST) con las mejores ofertas (GraphQL) |
| `/destino/:destinoId/vuelos` | Vuelos disponibles |
| `/destino/:destinoId/hoteles` | Hoteles disponibles |
| `/itinerario` | Resumen de costos, pasajeros y confirmación |
| `*` | Página 404 |

## Cómo ejecutarlo en local

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install      # instala dependencias
npm start        # levanta el sitio en http://localhost:5173
npm test         # ejecuta las pruebas automáticas
npm run build    # genera la versión de producción en /dist
```

> `public/mockServiceWorker.js` lo genera MSW (`npx msw init public`) y debe mantenerse en el repositorio.

## Publicación en GitHub Pages

```bash
git init
git add .
git commit -m "Proyecto Nómade - Semana 5"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/viajes-bayro-ranileo-PFY2202.git
git push -u origin main

npm run deploy   # compila y sube /dist a la rama gh-pages
```

En GitHub: **Settings → Pages → Source: Deploy from a branch → rama `gh-pages` / carpeta `/ (root)`**.
Vite usa `base: './'` y la app usa `HashRouter`, por lo que funciona con cualquier nombre de repositorio.

## Pruebas

### Automáticas (`npm test`)
11 pruebas: listado REST, filtro por región (con parámetro en la petición) y por texto, buscador del inicio, error con
reintento, resumen con datos REST + GraphQL, vuelos y hoteles con precios/fechas/cupos, orden y filtros, destino
inexistente, 404 y el flujo completo *vuelo → hotel → total → pasajeros → mutation*.

### Navegadores

| Navegador | Resultado | Observaciones |
| --- | --- | --- |
| Chromium / Google Chrome (escritorio y móvil 390 px) | ✅ Correcto | Service Worker activo, flujo completo hasta el código de reserva, sitio servido bajo subcarpeta como en gh-pages |
| Mozilla Firefox | ✅ _completar_ | |
| Microsoft Edge | ✅ _completar_ | |
| Breave| ✅ _completar_ | |

Lista de verificación para cada navegador: inicio y buscador · filtros de Explorar · pestañas Resumen/Vuelos/Hoteles ·
elegir vuelo y hotel · barra del itinerario · confirmar · barra inferior en móvil · recargar la página.
