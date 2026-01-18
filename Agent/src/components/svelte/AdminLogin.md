# AdminLogin (Svelte)

## Propósito

Componente de autenticación para el panel de administración. Proporciona un formulario de inicio de sesión con validación simple y efectos visuales modernos.

## Props

Este componente no acepta props de entrada.

## Eventos Disparados

- **login:** Se emite cuando el usuario se autentica exitosamente.

## Estado

- **email:** Almacena el valor del campo de email/usuario.
- **password:** Almacena la contraseña.
- **isLoading:** Booleano que indica si se está procesando el inicio de sesión (muestra spinner).
- **error:** Mensaje de error para mostrar si las credenciales son inválidas.

## Lógica de Negocio

- **handleLogin():**
  - Utiliza `signInWithEmailAndPassword` de Firebase Auth.
  - Verifica el rol del usuario utilizando `getUserRole(uid)`.
  - Si el rol es `admin`, emite el evento `login`.
  - Si no es `admin`, cierra la sesión y muestra error de acceso denegado.
  - Maneja errores de Firebase (credenciales inválidas, usuario no encontrado, etc.).

## Cambios Recientes

- **Fecha:** 2026-01-18
- **Descripción:** Integración con Firebase Auth y verificación de roles (RBAC).

## Dependencias

- `firebase/auth`: `signInWithEmailAndPassword`, `signOut`.
- `../../services/firebaseAuthentication/auth`: `auth`.
- `../../services/firebaseFirestore/users`: `getUserRole`.
- `svelte/transition`: Para animaciones `fade`, `fly`, `scale`.
- `svelte`: `createEventDispatcher`.
