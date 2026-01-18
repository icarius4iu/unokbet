# Feature: Implementación de Roles (Admin vs User) con Firestore

## 🎯 Objetivo

Separar la lógica de acceso para usuarios Administradores y usuarios Normales utilizando Firebase Authentication como base y Firestore como validador de roles.

## 🛠️ Especificaciones Técnicas

- **Autenticación:** Firebase Auth (ya configurado y funcional).
- **Base de Datos:** Firestore.
- **Estructura de Datos:** - Colección: `users`
  - ID del documento: `uid` (proporcionado por Firebase Auth).
  - Campos: `{ email: string, role: 'admin' | 'user' }`.

## 📋 Tareas para el Agente de Código

1. **Gestión de Git:**
   - Crear una nueva rama local llamada `feature/auth-roles-distinction`.

2. **Lógica de Verificación de Rol:**
   - Crear un servicio o función centralizada que, tras un login exitoso, realice una consulta a `firestore.collection('users').doc(user.uid)`.
   - Si el documento no existe o el campo `role` no coincide con el acceso esperado (ej. un 'user' intentando entrar al panel de 'admin'), se debe cerrar la sesión y mostrar un error de acceso denegado.

3. **Protección de Rutas (Frontend):**
   - Implementar un Guard o Middleware que verifique el estado del usuario.
   - Si el usuario está autenticado pero su rol en el estado global no es `admin`, denegar acceso a las rutas `/admin/*`.

4. **Persistencia del Rol:**
   - Almacenar el rol recuperado en el estado global (Redux, Context, o Service) para evitar lecturas constantes a Firestore en cada navegación.

## 🔒 Reglas de Seguridad Sugeridas (Firestore)

Considerar que las reglas en la consola deben actualizarse a:

```javascript
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if false; // Nadie edita roles desde el cliente
}
```
