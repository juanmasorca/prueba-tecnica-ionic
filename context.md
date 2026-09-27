Prueba Desarrollador Full Stack
Prueba técnica
Instrucciones Generales:
1. Diseñar e implementar una aplicación móvil híbrida tipo e-commerce básica, que
permita realizar las siguientes operaciones:
• Visualizar un catálogo de productos.
• Agregar productos a un carrito de compras.
• Registro e inicio de sesión de usuarios.
• Simular el proceso de compra.
2. La aplicación debe contar como mínimo con las siguientes pantallas:
• Login
o Email y contraseña.
o Enlace a registro.
• Registro
o Nombre, email y contraseña.
o Validaciones básicas.
• Catálogo de productos (3 productos)
o Listado de productos con nombre, imagen (dummy) y precio.
o Opción para agregar al carrito.
• Carrito de compras
o Productos agregados.
o Total de la compra.
o Opción para finalizar compra.
o Si el usuario no está autenticado, redirigir a Login.
• Confirmación de compra
o Mensaje de compra exitosa.
o Guardado del pedido (mock o local).

3. El desarrollo debe realizarse utilizando Ionic + Cordova, cumpliendo con:
• Uso de TypeScript y Angular.
o Navegación funcional entre pantallas.
o Entrega de una APK funcional.

4. El backend es opcional y queda a libre elección del candidato. Se puede utilizar:
• Servicios mock.
• LocalStorage.
• JSON local.
• Firebase.
• API propia (se valorará si está hecha en .NET).
5. La aplicación debe manejar información básica de:
• Usuarios.
• Productos.
La persistencia puede ser local o mediante backend. No se requiere
autenticación avanzada ni pagos reales.
6. Interfaz gráfica:
• Uso de componentes de Ionic.
• UI simple, clara y consistente.
7. Entregables:
• Repositorio Git con el código fuente.
• Archivo APK generado.

Prueba de análisis
Describe como estructurarías un módulo que simule los puntos que podrá ganar un usuario
por cumplir los objetivos de cuota de venta en pesos y cuota de venta por unidades de
producto.

Tener en cuenta que:
• El usuario ingresa la cuota trimestral que lleva ejecutada de acuerdo a su cuota total
• Un punto equivale a $1.500
Cuota de venta trimestral en pesos colombianos y en porcentaje.
• La cuota total trimestral es de $11.000.000
• Podrán ganar de acuerdo al cumplimiento:
o 80% - 100% del cumplimiento = 100 puntos
o 50% - 79% del cumplimiento = 70 puntos

o 30% - 49% del cumplimiento = 40 puntos
o 10% - 29% del cumplimiento = 20 puntos
o -10% del cumplimiento = 0 puntos

Cuota de volumen de ventas trimestral de producto por unidad y en porcentaje
• La cuota de venta total trimestral es de 6.000 unidades de producto
• Podrán ganar de acuerdo al cumplimiento:
o +6.000 productos a 4.000 productos vendidos = 150 puntos
o 3.999 productos a 2.000 productos vendidos = 100 puntos
o 2.999 productos a 1.000 productos vendidos = 50 puntos
o -999 productos vendidos = 100 puntos

Al final del ejercicio el usuario debe conocer:
• Cuantos puntos gana por cumplimiento de ventas en pesos
• Cuantos puntos puede ganar por cumplimiento de ventas por productos
• Cuantos puntos gana por cumplimiento de ventas en pesos y por productos