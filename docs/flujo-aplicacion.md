# Flujo de la aplicación

Diagrama de navegación, autenticación y simulación de compra de la tienda híbrida.

## Flujo principal

```mermaid
flowchart TD
  start[Apertura de la app] --> catalog[Catalogo de productos]
  catalog -->|Agregar al carrito| cart[Carrito]
  catalog -->|Icono usuario| login[Login]
  login -->|Enlace registro| register[Registro]
  register -->|Cuenta creada| session[Sesion en LocalStorage]
  login -->|Credenciales validas| session
  session -->|returnUrl carrito| cart
  session -->|returnUrl catalogo| catalog
  cart -->|Finalizar compra sin sesion| login
  cart -->|Finalizar compra con sesion| confirmAlert[Confirmar simulacion de pago]
  confirmAlert -->|Pedido guardado| confirmation[Confirmacion de compra]
  confirmation --> catalog
```

## Persistencia

```mermaid
flowchart LR
  ui[Pantallas Ionic] --> services[Servicios Angular]
  services --> storage[StorageService]
  storage --> ls[localStorage]
  ls --> users[users]
  ls --> currentUser[currentUser]
  ls --> cartKey[cart]
  ls --> orders[orders]
  ls --> lastOrder[lastOrder]
```

## Checkout y guard

```mermaid
sequenceDiagram
  actor Usuario
  participant Cart as Carrito
  participant Auth as AuthService
  participant Login as Login
  participant Orders as OrderService
  participant Confirm as Confirmacion

  Usuario->>Cart: Finalizar compra
  Cart->>Auth: isAuthenticated
  alt No hay sesion
    Cart->>Login: redirect returnUrl=/cart
    Usuario->>Login: Email y contraseña
    Login->>Auth: login
    Login->>Cart: navegar a returnUrl
  else Hay sesion
    Cart->>Orders: placeOrder
    Orders->>Orders: Guardar en orders y lastOrder
    Orders->>Cart: Vaciar carrito
    Cart->>Confirm: Navegar
  end
```

La ruta `/confirmation` también está protegida por `AuthGuard`: si no hay `currentUser`, se envía a `/login`.
