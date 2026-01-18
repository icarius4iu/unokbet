# AdminDashboard (Svelte)

## Propósito

Componente principal del tablero de administración implementado en Svelte. Gestiona la navegación entre pestañas para mostrar diferentes módulos de gestión (Usuarios, Calendario, Bonos).

## Props

Este componente no acepta props.

## Estado

- **isAuthenticated:** Booleano. Controla si se muestra el login (`false`) o el dashboard (`true`).
- **isCheckingAuth:** Booleano. Indica si se está verificando la sesión inicial con Firebase. Muestra un loader mientras es `true`.
- **activeTab:** Controla qué pestaña está visible.
  - Valores posibles: `'users'`, `'calendar'`, `'bonuses'`.
  - Valor inicial: `'users'`.
- **Métodos:**
  - `setTab(tab)`: Cambia la pestaña activa.
  - `handleLoginSuccess()`: Actualiza `isAuthenticated` a `true`.
  - `onMount`: Suscribe a `onAuthStateChanged` para persistencia de sesión y chequeo de rol.

## Cambios Recientes

- **Fecha:** 2026-01-18
- **Descripción:** Implementación de persistencia de sesión y verificación de roles en `onMount`.

## Dependencias

- `firebase/auth`: `onAuthStateChanged`.
- `../../services/firebaseAuthentication/auth`: `auth`.
- `../../services/firebaseFirestore/users`: `getUserRole`.
- `./UserManagement.svelte`
- `./CalendarForm.svelte`
- `./BonusesForm.svelte`
- `./AdminLogin.svelte`
