# Microservicio 

Este microservicio permite gestionar transacciones, porporcionando CRUD completo, generación 
y descarga de reporte de trasacciones.

# Rutas

las rutas proporcionas para consumir se encuentran en la carpta src/routes/index.ts

Método	Endpoint	             Descripción
GET	     /api/transactions	      Obtener todas las transacciones
GET	     /api/transactions/:id	  Obtener una transacción por ID
POST	 /api/transactions        Crear una nueva transacción
PUT	     /api/transactions/:id	  Actualizar una transacción existente
DELETE	 /api/transactions/:id	  Desactivar una transacción
GET	     /api/report/downloadreport  Generar y descargar un reporte en XLSX


# Variables de ambiente

pide las variables de ambiente puedes encontrar un ejemplo en el archivo .env.example

# Docker-compose

antes de correr tu pryecto verifica que esten levantados tus servicios de database para evitar problemas de coneccion

si deseas correr el backend y frontend en docker, verificar los dockerfile que se encuentran en la raiz de cada repositorio

## Installation

1. Install npm:

```
npm --version
```

2. Install deps

```
yarn install
```

3. correr proyecto

```
npm run dev

```