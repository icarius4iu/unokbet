# Users Service (Firestore)

## Propósito

Servicio dedicado a la interacción con la colección `users` en Firestore. Maneja la lógica de perfiles y roles de usuario.

## Funciones

### `getUserRole(uid: string): Promise<UserRole>`

- **Descripción:** Consulta la colección `users` en Firestore para obtener el rol del usuario documentado.
- **Uso:** Verificación de permisos durante el login o navegación.
- **Retorno:** `'admin'`, `'user'`, o `null`.

## Cambios Recientes

- **Fecha:** 2026-01-18
- **Descripción:** Implementación inicial de verificación de roles.

## Ubicación

`src/services/firebaseFirestore/users.ts`
