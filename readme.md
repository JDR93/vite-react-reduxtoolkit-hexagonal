# Vite + React + Redux Toolkit (Arquitectura Hexagonal)

Este proyecto está dividido en **dos apartados principales**:

- **client/** → Frontend construido con Vite + React + Redux Toolkit +Tremor UI 
- **server/** → Backend (API) construido con **Node.js** **Express**

---

## ▶️ Inicializar el servidor

### 1️⃣ Acceder a la carpeta del servidor

```bash
cd server
```

### 2️⃣ Instalar dependencias

Con npm:

```bash
npm install
```

O con pnpm:

```bash
pnpm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` dentro de la carpeta `server` (si no existe):

```env
PORT=3000
```

> Ajusta las variables según tu entorno (base de datos, credenciales, etc.).

### 4️⃣ Ejecutar el servidor

Modo desarrollo:

```bash
npm run dev
```

O:

```bash
pnpm dev
```

El servidor quedará disponible por defecto en:

```
http://localhost:3000
```

---

## ▶️ Inicializar el cliente&#x20;

### 1️⃣ Acceder a la carpeta del cliente

```bash
cd client
```

### 2️⃣ Instalar dependencias

Con npm:

```bash
npm install
```

O con pnpm:

```bash
pnpm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` dentro de `client`:

```env
VITE_API_URL=http://localhost:3000/api
```

> Esta variable indica la URL base del backend.

### 4️⃣ Ejecutar el cliente

Modo desarrollo:

```bash
npm run dev
```

O:

```bash
pnpm dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🧠 Arquitectura

Este proyecto aplica **Arquitectura Hexagonal (Ports & Adapters)**:

- **Dominio**: reglas de negocio puras
- **Aplicación**: casos de uso
- **Infraestructura**: adaptadores HTTP, base de datos, frameworks

---

## ✍️ Autor

**JDR93**

---

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.

