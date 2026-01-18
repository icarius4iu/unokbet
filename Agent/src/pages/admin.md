# Admin Page (Astro)

## Propósito

Página principal del panel de administración. Sirve como contenedor para el componente interactivo `AdminDashboard`.

## Componentes

- **MainLayout:** Proporciona la estructura base y estilos globales.
- **AdminDashboard (`client:load`):** El componente SPA principal que maneja toda la lógica del dashboard. Se carga en el cliente inmediatamente.

## Estilos y Diseño

- Fondo con cuadrícula tecnológica sutil (`linear-gradient`) y orbes de luz (`glow orbs`) usando Tailwind CSS para un aspecto moderno y oscuro.
- `bg-[#0B0D11]` como color base.

## Cambios Recientes

- **Fecha:** 2026-01-18
- **Descripción:** Integración de AdminDashboard y ajustes de estilo de fondo.

## Dependencias

- `../layouts/MainLayout.astro`
- `../components/svelte/AdminDashboard.svelte`
