# Tienda Ionic — Prueba técnica Full Stack

Aplicación móvil híbrida de e-commerce básico construida con **Ionic + Angular (TypeScript) + Cordova**. Permite ver un catálogo de 3 productos, armar un carrito, registrarse / iniciar sesión y simular una compra. La persistencia es **local** (`localStorage`); no hay backend ni pagos reales.

## Decisiones

| Tema | Enfoque |
|---|---|
| Backend | No aplica. Mock + LocalStorage |
| Usuarios | Clave `users` y sesión `currentUser` |
| Carrito | Clave `cart` |
| Pedidos | Clave `orders` y último pedido `lastOrder` |
| Productos | 3 ítems en código + imágenes SVG dummy en `src/assets/products` |
| Auth avanzada | No. Contraseñas en claro solo para la simulación. Registro exige 6+ caracteres, mayúscula, minúscula y número |
| Módulo de puntos por cuota | Fuera de la app: ver [docs/analisis-puntos-cuota.md](docs/analisis-puntos-cuota.md) |

Flujo de pantallas: [docs/flujo-aplicacion.md](docs/flujo-aplicacion.md). Plan de construcción: [PlanAccion.md](PlanAccion.md).

## Requisitos

- Node.js 20+ (el proyecto se generó con Node 22)
- npm
- Ionic CLI (`npm i -g @ionic/cli`) — opcional; también sirve `npx ionic`

Para generar APK además:

- JDK 17
- Android SDK / Android Studio
- Gradle (lo resuelve Cordova al construir)
- Variable `ANDROID_HOME` (o `ANDROID_SDK_ROOT`) apuntando al SDK

## Instalación y ejecución (navegador)

```bash
npm install
npx ionic serve
```

Equivalente:

```bash
npm start
```

La app queda en `http://localhost:4200` (o el puerto que asigne Ionic). Pantalla inicial: **Catálogo**.

### Cuentas

No hay usuario semilla. Crea uno en **Registro** (nombre, email y contraseña con 6+ caracteres, mayúscula, minúscula y número) y úsalo en **Login**. En login no se muestra el checklist de color de la contraseña.

## Navegación

- `/catalog` — listado de productos y agregar al carrito
- `/cart` — ítems, cantidades, total y finalizar compra
- `/login` y `/register` — autenticación
- `/confirmation` — compra exitosa (requiere sesión)

Si se pulsa **Finalizar compra** sin sesión, la app redirige a Login y, al autenticarse, vuelve al carrito.

## Cordova y APK

El enunciado pide Ionic + Cordova. La integración está en `ionic.config.json` y `config.xml`.

```bash
npm install -g cordova
npm run cordova:android
```

Ese script compila la web en `www/` con `base href` relativo y luego ejecuta `cordova build android`.

APK de debug generado:

`platforms/android/app/build/outputs/apk/debug/app-debug.apk` (unos 3.8 MB)

Para repetir el build hace falta:

- `ANDROID_HOME` (y `ANDROID_SDK_ROOT`) apuntando al SDK. Aquí: `C:\Users\ACER\AppData\Local\Android\Sdk`.
- `JAVA_HOME` a un JDK 17 o 21. El `java` del PATH es un lanzador de Java 8 roto, y el JBR de Android Studio es Java 25, que Gradle 8.14 no admite. Este build usó Temurin 21 en `%LOCALAPPDATA%\jdks\jdk-21.0.12.1+1`.
- Plataforma Android 36 (`platforms/android-36`). Compile y target SDK están en 36 en `config.xml`.
- Gradle 8.14 en el PATH solo la primera vez, para crear el wrapper (aquí: `%LOCALAPPDATA%\gradle\gradle-8.14.2\bin`). Después Cordova usa el wrapper de `platforms/android`.

Cordova está deprecado frente a Capacitor; se usa porque el enunciado lo exige.

### Notas de build nativo

- `www/` es la salida de `ng build` (configurada en `angular.json`).
- Min SDK Android 24, compile y target SDK 36 (`config.xml`).
- Iconos/splash de marca no están personalizados; Cordova usará los por defecto de la plataforma.

## Scripts npm

| Script | Uso |
|---|---|
| `npm start` | Servir en desarrollo |
| `npm run build` | Compilar a `www/` |
| `npm run cordova:android` | Generar el proyecto Android y el APK (requiere SDK) |

## Estructura relevante

```
src/app/pages/       login, register, catalog, cart, confirmation
src/app/services/    auth, products, cart, orders, storage
src/app/models/      User, Product, CartItem, Order
src/app/guards/      AuthGuard (pantalla de confirmación)
src/assets/products/ imágenes dummy
docs/                flujo Mermaid y análisis de puntos
```
