# 🐾 Fluffy — Frontend

Aplicación web del sistema de adopción de mascotas Fluffy, desarrollada para la materia Desarrollo de Software (UTN FRRo).

Consume la API REST del backend de Fluffy y permite a los adoptantes buscar mascotas y solicitar su adopción, a los publicadores (refugios, rescatistas y hogares de tránsito) gestionar sus publicaciones y las solicitudes recibidas, y a los administradores gestionar el sistema.

## 📑 Índice

- [Tecnologías](#-tecnologías)
- [Funcionalidades por rol](#-funcionalidades-por-rol)
- [Arquitectura](#-arquitectura)
- [Decisiones de diseño](#-decisiones-de-diseño)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#️-instalación)
- [Ejecución](#️-ejecución)
- [Scripts disponibles](#-scripts-disponibles)
- [Autenticación y rutas protegidas](#-autenticación-y-rutas-protegidas)
- [Mapa de rutas](#-mapa-de-rutas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Manejo de errores](#-manejo-de-errores)

## 🛠 Tecnologías

| Categoría | Herramienta |
|---|---|
| Lenguaje | TypeScript |
| Framework | React 19 |
| Bundler | Vite |
| Ruteo | React Router |
| Estado del servidor (fetching y caché) | TanStack Query |
| Formularios | React Hook Form |
| Validación | Zod (+ `@hookform/resolvers`) |
| Estilos | Tailwind CSS 4 (con modo claro/oscuro) |
| Notificaciones | Sonner |
| Linter | ESLint (+ typescript-eslint) |
| Gestor de paquetes | pnpm |

## 👥 Funcionalidades por rol

- **Visitante**: ver la página de inicio, registrarse como adoptante o como publicador, e iniciar sesión.
- **Adopter**: explorar las mascotas disponibles para adopción, ver el detalle de cada una, crear solicitudes de adopción, filtrarlas por estado (pendiente, aprobada o rechazada) y eliminarlas.
- **Publisher**: publicar, editar y gestionar sus mascotas, y resolver las solicitudes de adopción recibidas (aprobarlas o rechazarlas).
- **Admin**: gestionar los catálogos (especies, provincias y localidades), los usuarios (publicadores y adoptantes) y las mascotas, y consultar las solicitudes (solo lectura: no las crea, resuelve ni elimina).

## 🏗 Arquitectura

El front se organiza por **features** (una carpeta por entidad del dominio), con un módulo `shared` para lo que usan todas. Dentro de cada feature, una acción del usuario atraviesa estas capas:

```
Página (pages/)
    │
    ▼
Componentes (components/)  ── formularios, tablas, tarjetas
    │
    ▼
Hook (use<Entidad>.ts)     ── consultas y mutaciones con TanStack Query
    │
    ▼
Servicio (<entidad>.service.ts)  ── único lugar que llama al backend
    │
    ▼
httpClient (shared/api)    ── cliente HTTP común (cookies, errores)
    │
    ▼
API REST (backend de Fluffy)
```

Responsabilidad de cada pieza de un feature:

- **`pages/`**: pantallas asociadas a una ruta. Componen componentes y hooks.
- **`components/`**: componentes propios del feature (formulario, tabla, tarjeta).
- **`use<Entidad>.ts`**: hooks de TanStack Query (listar, obtener, crear, editar, eliminar).
- **`<entidad>.service.ts`**: funciones que llaman al backend. Los componentes nunca hacen `fetch` directamente.
- **`<entidad>.keys.ts`**: claves de caché de TanStack Query, centralizadas para invalidar correctamente después de cada mutación.
- **`<entidad>.model.ts`**: tipos de TypeScript y schemas de Zod de la entidad.

## 💡 Decisiones de diseño

### Organización por features
Cada entidad (`pet`, `application`, `species`, etc.) tiene su propia carpeta con todo lo que necesita: modelo, servicio, hooks, componentes y páginas. Esto mantiene el código relacionado junto, facilita encontrar y modificar una funcionalidad, y evita carpetas globales enormes de `components` o `services`.

### Cliente HTTP centralizado
Todas las llamadas al backend pasan por `httpClient` (en `shared/api`), que concentra la URL base, el envío de cookies y el manejo de errores de la API. Si algo cambia (una ruta, un formato de error), se corrige en un solo lugar.

### TanStack Query para el estado del servidor
Los datos que vienen del backend (mascotas, solicitudes, catálogos) se manejan con TanStack Query, que aporta caché, estados de carga y error, y recarga automática tras las mutaciones. Las claves de caché (`*.keys.ts`) están centralizadas por feature.

### Formularios con React Hook Form + Zod
Los formularios usan React Hook Form con schemas de Zod, igual que el backend. Ventajas:

- El schema es la única fuente de verdad: define las reglas y de él se infiere el tipo TypeScript (`z.infer`).
- Se valida en el cliente antes de enviar, para dar feedback inmediato al usuario.
- La validación real sigue ocurriendo en el backend: el front mejora la experiencia, no reemplaza la seguridad.

### Sesión con cookie httpOnly
El token JWT viaja en una cookie httpOnly, por lo que el JavaScript del front nunca lo ve ni lo guarda (más seguro frente a XSS que `localStorage`). El front solo envía las peticiones con credenciales y consulta `GET /api/auth/me` para saber quién está logueado. El estado de la sesión se comparte con un `AuthContext` y se lee con el hook `useAuth`.

### Rutas protegidas por rol
El componente `ProtectedRoute` recibe los roles permitidos (`allowedRoles`) y redirige si no hay sesión o si el rol no corresponde. Esto mejora la experiencia, pero la autorización real la aplica el backend en cada endpoint.

### Carga de imágenes
Las fotos de las mascotas se suben mediante `upload.service.ts` y el componente `PhotoUpload`, que se comunican con el endpoint de subida de archivos del backend.

### Tema claro / oscuro
Un `ThemeProvider` y el hook `useTheme` permiten alternar entre modo claro y oscuro con el componente `ThemeToggle`.

### Idioma: código en inglés, interfaz en español
El código (componentes, variables, rutas) está en inglés, y los textos que ve el usuario están en español. Los valores de enum del backend se mantienen en inglés y el front los traduce para mostrarlos.

## ✅ Requisitos previos

- Node.js 20 o superior.
- pnpm — si no lo tenés: `npm install -g pnpm`
- El [backend de Fluffy](https://github.com/dsw-2026/backend) corriendo (por defecto en `http://localhost:3000`).

## ⚙️ Instalación

### Instalar dependencias

```bash
pnpm install
```

## ▶️ Ejecución

```bash
pnpm dev
```

La aplicación queda corriendo en `http://localhost:5173`.

> Ese origen debe coincidir con `CORS_ORIGIN` en el `.env` del backend; de lo contrario el navegador bloqueará las peticiones y la cookie de sesión.

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Levanta el servidor de desarrollo de Vite. |
| `pnpm build` | Verifica los tipos (`tsc -b`) y genera el build de producción en `dist/`. |
| `pnpm preview` | Sirve localmente el build de producción. |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto. |

## 🔐 Autenticación y rutas protegidas

- **Login** (`POST /api/auth/login`): el backend responde con el token en una cookie httpOnly; el navegador la guarda automáticamente.
- **Restaurar sesión**: al cargar la app se consulta `GET /api/auth/me` para saber si hay un usuario logueado y de qué tipo es.
- **Peticiones autenticadas**: se envían con las credenciales incluidas para que el navegador adjunte la cookie.
- **Rutas protegidas**: `ProtectedRoute` restringe cada grupo de rutas según el rol del usuario (`Admin`, `Publisher`, `Adopter`).

## 🗺 Mapa de rutas

### Públicas

| Ruta | Pantalla |
|---|---|
| `/` | Página de inicio (landing) |
| `/login` | Inicio de sesión |
| `/register` | Elección del tipo de cuenta |
| `/register/adopter` | Registro de adoptante |
| `/register/publisher` | Registro de publicador |

### Solo Admin

| Ruta | Pantalla |
|---|---|
| `/species`, `/species/new`, `/species/:id/edit` | Gestión de especies |
| `/provinces`, `/provinces/new`, `/provinces/:id/edit` | Gestión de provincias |
| `/localities`, `/localities/new`, `/localities/:id/edit` | Gestión de localidades |
| `/publishers`, `/publishers/:id/edit` | Gestión de publicadores |
| `/adopters`, `/adopters/:id/edit` | Gestión de adoptantes |

### Publisher y Admin

| Ruta | Pantalla |
|---|---|
| `/pets`, `/pets/new`, `/pets/:id/edit` | Gestión de mascotas |

### Adopter, Publisher y Admin

| Ruta | Pantalla |
|---|---|
| `/adopt` | Catálogo de mascotas en adopción |
| `/adopt/:id` | Detalle de una mascota |
| `/applications` | Listado de solicitudes de adopción |
| `/applications/new` | Nueva solicitud |
| `/applications/:id` | Detalle de una solicitud |

Cualquier otra ruta muestra la pantalla de "no encontrado".

## 📂 Estructura del proyecto

```
src/
├── features/                       # un módulo por entidad del dominio
│   ├── <entidad>/
│   │   ├── <entidad>.model.ts      # tipos y schemas de Zod
│   │   ├── <entidad>.keys.ts       # claves de caché (TanStack Query)
│   │   ├── <entidad>.service.ts    # llamadas HTTP al backend
│   │   ├── use<Entidad>.ts         # hooks de consultas y mutaciones
│   │   ├── components/             # formulario, tabla, tarjeta, etc.
│   │   └── pages/                  # pantallas del feature
│   ├── adopter/  application/  locality/  pet/
│   ├── province/  publisher/  species/
│   ├── auth/                       # servicio de auth, registro, login y ProtectedRoute
│   └── landing/                    # página de inicio y página 404
├── shared/
│   ├── api/                        # httpClient, AuthContext, useAuth, upload.service
│   ├── components/
│   │   ├── layout/                 # Layout, LayoutPublic, NavBar
│   │   └── ui/                     # Button, PhotoUpload, ThemeToggle, etc.
│   └── context/                    # ThemeProvider y useTheme
├── routes/
│   └── AppRoutes.tsx               # definición de todas las rutas
├── assets/                         # logo e imágenes
├── App.tsx
├── main.tsx                        # punto de entrada
└── index.css                       # estilos globales (Tailwind)
```

## 🚨 Manejo de errores

El backend responde con un formato estándar:

```json
{
  "success": false,
  "message": "Mensaje en español",
  "details": [{ "field": "campo", "message": "detalle del error" }]
}
```

El front lo consume así:

- `httpClient` convierte las respuestas con error en una excepción `ApiError`, que lleva el `message` enviado por el backend.
- Al **cargar datos**, el error se muestra en un aviso dentro de la página.
- Al **ejecutar una acción** (aprobar, rechazar, eliminar), se informa al usuario con el mensaje del backend, o con un mensaje genérico si el error no vino de la API.
- Las acciones destructivas piden confirmación antes de ejecutarse.
