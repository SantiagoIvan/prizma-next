This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

En realidad, primero tirate un npm install y despues arrancalo.

Configura las siguientes variables de entorno:
```
NEXT_ENV="dev"
NEXT_BACKEND_BASE_URL_DEV="http://localhost:3000"
NEXT_BACKEND_BASE_URL_PROD="??"
```

Levanta el back con docker-compose y verifica que le este levantado y escuchando en el puerto 3000.
Este proyecto Next se va a levantar en el puerto 8080