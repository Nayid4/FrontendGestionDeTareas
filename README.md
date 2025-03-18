# Frontend - Gestor de Tareas

Este es el frontend de la aplicación de gestión de tareas desarrollado en **Angular 19**. El proyecto está estructurado para facilitar el mantenimiento y la escalabilidad, cuenta con un diseño moderno usando **TailwindCSS** y está dockerizado para su despliegue en diferentes entornos.

## 🌐 Demo
El frontend está desplegado en GitHub Pages y se puede acceder en el siguiente enlace:
🔗 [Frontend Gestion De Tareas](https://nayid4.github.io/FrontendGestionDeTareas/)

## 📂 Estructura del Proyecto

El proyecto sigue una estructura modular para organizar mejor los archivos y la lógica del código:

```
FRONTENDGESTIONDETAREAS/
│-- .github/workflows/        # Configuraciones para CI/CD en GitHub Actions
│   ├── deploy.yaml           # Configuración para despliegue en GitHub Pages
│
│-- config/                   # Archivos de configuración
│   ├── default.conf
│
│-- src/
│   ├── app/
│   │   ├── assets/          # Recursos estáticos (imágenes, fuentes, etc.)
│   │   ├── core/            # Código principal y servicios
│   │   │   ├── guards/      # Guards de autenticación y rutas
│   │   │   ├── interceptors/# Interceptores HTTP
│   │   │   ├── models/      # Modelos de datos
│   │   │   ├── services/    # Servicios de API y lógica de negocio
│   │   ├── pages/           # Páginas principales del frontend
│   │   ├── shared/          # Componentes reutilizables
│   │   │   ├── components/  # Componentes compartidos
│   │   │   │   ├── agregar-lista-de-tarea/
│   │   │   │   ├── agregar-tarea/
│   │   │   │   ├── alerta/  # Alertas para mensajes
│   │   │   │   ├── lista-de-tareas/
│   │   │   │   ├── tarea/
│   │   ├── directives/      # Directivas personalizadas
│   │   ├── pipes/           # Pipes personalizados
│   │   ├── environments/    # Configuración de entornos (Desarrollo, Docker, Producción)
│   │   │   ├── environment.development.ts
│   │   │   ├── environment.docker.ts
│   │   │   ├── environment.ts
│   │   ├── app.routes.ts    # Rutas de la aplicación
│   │   ├── app.config.ts    # Configuración general
│   │   ├── app.component.*  # Componente principal
│   │
│   ├── index.html           # Archivo principal de la aplicación
│   ├── main.server.ts       # Configuración del servidor en Angular Universal
```

## 🛠️ Tecnologías Utilizadas
- **Angular 19** - Framework frontend
- **TailwindCSS** - Para estilos y diseño moderno
- **Docker** - Para la contenedorización de la aplicación
- **GitHub Actions** - Para CI/CD y despliegue en GitHub Pages
- **Icons** - Tomados de [Google Fonts Icons](https://fonts.google.com/icons)

## 🚀 Despliegue y Configuración

### 🔹 Ejecución en Local

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/nayid4/FrontendGestionDeTareas.git
   cd FrontendGestionDeTareas
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar el proyecto en desarrollo:
   ```sh
   ng serve
   ```
   La aplicación se iniciará en `http://localhost:4200/`

### 🔹 Ejecución con Docker
1. Construir y ejecutar los contenedores:
   ```sh
   docker-compose up --build
   ```
2. Acceder a `http://localhost:4200/`

### 🔹 Despliegue en Producción (GitHub Pages)
El despliegue en GitHub Pages está automatizado con **GitHub Actions**. Cada vez que se hace un push a la rama `main`, la aplicación se compila y se publica automáticamente en GitHub Pages.

## 🔍 Validaciones y Funcionalidades
- Se han implementado **validaciones** en los formularios para evitar datos incorrectos.
- Se utilizan **alertas** para notificar errores y acciones realizadas.
- Se manejan los ciclos de vida de los componentes como **OnInit** para inicializaciones y **OnDestroy** para liberar recursos y evitar fugas de memoria.

## 📌 Contribución
Si deseas contribuir, por favor sigue estos pasos:
1. Realiza un fork del repositorio
2. Crea una nueva rama con tu funcionalidad (`git checkout -b nueva-funcionalidad`)
3. Realiza los cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Sube los cambios (`git push origin nueva-funcionalidad`)
5. Crea un Pull Request

---

Este proyecto está en constante mejora, cualquier sugerencia es bienvenida. 🚀

