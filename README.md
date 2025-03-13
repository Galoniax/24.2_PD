# 24.2_PD - SoundWave

# Creación de React
- pnpm create vite
- pnpm install react-router-dom
- npm install axios

## Scripts para levantar
- npm run dev: Inicia la aplicación en modo desarrollo usando Vite. Usar comando en carpetas backend y frontend.
  // npm run json-server: Inicia el servidor JSON Server para simular una API REST, observando el archivo db.json en el directorio ../backend/db en el puerto 3001.
  // npm run start: Inicia ambos comandos (json-server & run dev) con Concurrently.
- docker-compose up: Levanta docker y la base de datos.
- npx prisma db seed: Levanta los datos necesarios para agregar variedad (admin).

## Dependencias 
### Principales
- axios (^1.7.7): Para realizar peticiones HTTP.
- react (^18.3.1): Biblioteca principal de la aplicación.
- react-dom (^18.3.1): Biblioteca de React para manejar el DOM.
- react-router-dom (^6.27.0): Para manejar el enrutamiento de la aplicación.
- react-toastify (^10.0.6): Para mostrar notificaciones emergentes.

## Backend
- prisma (^5.22.0): Base de datos con postgres.
- bcrypt (^5.1.1): Encriptador de contraseñas.
- cors (^2.8.5)
- express (^4.21.1): Entorno Backend
- Morgar, Joi, Zod: Validadores y Middlewares.
- JWT (^9.0.2): Generador de tokens.
- Nodemon (^3.1.7): Actualizador de cambios

### Comandos
- npm init -y
- npm install @prisma/client bcrypt cors dotenv express joi jsonwebtoken morgan zod
- npm install --save-dev nodemon prisma
- npx prisma init
- npx prisma migrate dev

## Dependencias de Desarrollo
- @eslint/js (^9.13.0): Configuración de ESLint en JavaScript.
- @types/react (^18.3.12): Tipos de TypeScript para React.
- @types/react-dom (^18.3.1): Tipos de TypeScript para React DOM.
- @vitejs/plugin-react-swc (^3.5.0): Plugin de Vite para usar SWC con React.
- autoprefixer (^10.4.20): Añade prefijos a CSS para compatibilidad.
- eslint (^9.13.0): Herramienta de análisis de código para JavaScript.
- eslint-plugin-react (^7.37.2): Reglas de ESLint para React.
- eslint-plugin-react-hooks (^5.0.0): Reglas de ESLint para los hooks de React.
- eslint-plugin-react-refresh (^0.4.14): Reglas para optimizar el recargado en caliente.
- globals (^15.11.0): Listado de variables globales en JavaScript.
- postcss (^8.4.47): Procesador de CSS para transformar estilos.
- vite (^5.4.10): Empaquetador y servidor de desarrollo rápido.
- concurrently (^9.1.0): Iniciador de comandos simultáneos.
  
- fontawesome/fontawesome-svg-core (^6.6.0): Es el núcleo de Font Awesome para trabajar con íconos en formato SVG. Proporciona las herramientas necesarias para integrar íconos en aplicaciones modernas.
- fontawesome/free-brands-svg-icons (^6.7.1): Colección de íconos de marcas disponibles en Font Awesome, como logos de empresas (GitHub, Facebook, etc.).
- fontawesome/free-solid-svg-icons (^6.6.0): Colección de íconos sólidos (sin contorno) ofrecidos por Font Awesome.
- fontawesome/react-fontawesome (^0.2.2):Integración específica de Font Awesome con React, permitiendo el uso sencillo de sus íconos como componentes de React.

## Estilos
- Este proyecto utiliza Tailwind CSS para el estilo y diseño
- npm/pnpm install -D tailwindcss
- npx tailwindcss init -p
- pnpm i --save @fortawesome/fontawesome-svg-core

### Prettier
- Prettier para formateo/arreglo de código
- npm install --save-dev prettier

### Concurrently
- ("scripts")
- "start": "concurrently \"npm run dev\" \"npm run json-server\"" (Comandos que se correrán)

### Opcional
- Implementar 'npm install crypto' para manejar en un futuro la encriptación de datos sensibles como tablas como MetodoPago.
- Como mejora implementar Multer o Cloudinary para insertar imágenes a la base de datos.

 
