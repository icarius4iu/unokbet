# Blueprint de Aplicación Web Astro

## Resumen del Proyecto

Este proyecto es una aplicación web multifuncional construida con Astro.js, diseñada para servir como página de aterrizaje (landing page), visualizador de línea de tiempo/cronograma, panel de administración, sección de cursos educativos y calculadora de rutas. La arquitectura aprovecha la "Arquitectura de Islas" de Astro para crear una experiencia de usuario modular y de alto rendimiento.

## Esquema del Proyecto

### Características Implementadas:

- **Enrutamiento Basado en Archivos:** La aplicación utiliza el enrutamiento de Astro para crear las siguientes páginas:
  - `/` (Página de Aterrizaje)
  - `/admin` (Panel de Administración Protegido)
  - `/timeline` (Línea de Tiempo/Cronograma)
  - `/courses` (Cursos Educativos)
  - `/calculator` (Calculadora de Rutas)
- **Panel de Administración (SPA híbrida):**
  - **Tecnología:** Svelte para interactividad compleja (`client:load`).
  - **Autenticación (RBAC):**
    - Integración real con Firebase Auth.
    - Control de Acceso Basado en Roles (Solo rol 'admin' permitido).
    - Verificación contra colección `users` en Firestore.
    - Persistencia de sesión con `onAuthStateChanged`.
  - **Módulos:**
    - Gestión de Usuarios (`UserManagement`)
    - Calendario (`CalendarForm`)
    - Bonos (`BonusesForm`)
  - **Estilos:** Diseño Glassmorphism oscuro con animaciones Tailwind CSS avanzadas.

### Diseño y Estilo:

- **Layout:** Se utiliza un diseño principal (`MainLayout.astro`) consistente.
- **Estilos Globales:** Tailwind CSS con variables personalizadas para colores primarios/secundarios.

## Tarea Actual

### Plan Completado:

1.  **Dashboard Interactivo:** Implementación de `AdminDashboard.svelte` con navegación por pestañas.
2.  **Autenticación:** Implementación de `AdminLogin.svelte` para proteger el acceso.
3.  **Estilos:** Ajustes de centrado y diseño visual (Glassmorphism).

### Próximos Pasos:

1.  **Integración con Backend:** Reemplazar datos simulados con llamadas reales a API/Firebase.
2.  **Validación de Formularios:** Mejorar la validación en los formularios de gestión.
