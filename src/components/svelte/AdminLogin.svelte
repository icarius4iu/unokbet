<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { auth } from "../../services/firebaseAuthentication/auth";
  import { signInWithEmailAndPassword, signOut } from "firebase/auth";
  import { getUserRole } from "../../services/firebaseFirestore/users";

  const dispatch = createEventDispatcher();

  let email = "";
  let password = "";
  let isLoading = false;
  let error = "";

  async function handleLogin() {
    error = "";
    isLoading = true;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const role = await getUserRole(user.uid);

      if (role === "admin") {
        dispatch("login");
      } else {
        await signOut(auth);
        error = "Acceso denegado: No tienes permisos de administrador.";
        isLoading = false;
      }
    } catch (e: any) {
      console.error("Login failed", e);
      isLoading = false;
      // Map Firebase error codes to user-friendly messages
      switch (e.code) {
        case "auth/invalid-credential":
          error = "Credenciales incorrectas.";
          break;
        case "auth/user-not-found":
          error = "Usuario no encontrado.";
          break;
        case "auth/wrong-password":
          error = "Contraseña incorrecta.";
          break;
        case "auth/too-many-requests":
          error = "Demasiados intentos falidos. Intente más tarde.";
          break;
        default:
          error = "Error al iniciar sesión: " + e.message;
      }
    }
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-[60vh] relative z-10 w-full max-w-md mx-auto"
>
  <!-- Login Card -->
  <div
    in:fly={{ y: 20, duration: 600 }}
    class="w-full bg-[#13151A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
  >
    <!-- Top Decoration -->
    <div
      class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
    ></div>
    <div
      class="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none"
    ></div>

    <div class="mb-10 text-center relative">
      <div
        class="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500 relative"
      >
        <div
          class="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
        ></div>
        <i class="fas fa-shield-alt text-2xl text-primary relative z-10"></i>
      </div>
      <h1
        class="text-3xl font-display font-bold text-white tracking-tight mb-2"
      >
        Acceso Admin
      </h1>
      <p class="text-gray-500 text-sm">
        Introduce tus credenciales para continuar
      </p>
    </div>

    <form on:submit|preventDefault={handleLogin} class="space-y-6">
      <div class="space-y-2">
        <label
          class="block text-gray-400 text-xs font-bold uppercase tracking-wider ml-1"
          for="email">Usuario / Email</label
        >
        <div class="relative group/input">
          <div
            class="absolute inset-0 bg-primary/20 blur opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-xl"
          ></div>
          <input
            id="email"
            type="text"
            bind:value={email}
            class="relative w-full bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="ej. admin"
          />
          <i
            class="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          ></i>
        </div>
      </div>

      <div class="space-y-2">
        <label
          class="block text-gray-400 text-xs font-bold uppercase tracking-wider ml-1"
          for="password">Contraseña</label
        >
        <div class="relative group/input">
          <div
            class="absolute inset-0 bg-primary/20 blur opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-xl"
          ></div>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="relative w-full bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="••••••••"
          />
          <i
            class="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          ></i>
        </div>
      </div>

      {#if error}
        <div
          transition:fade
          class="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <i class="fas fa-exclamation-circle"></i>
          {error}
        </div>
      {/if}

      <button
        type="submit"
        disabled={isLoading}
        class="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(12,242,242,0.4)] relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
      >
        {#if isLoading}
          <i class="fas fa-circle-notch fa-spin"></i>
        {:else}
          <span class="relative z-10 flex items-center justify-center gap-2">
            Ingresar al Panel <i
              class="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"
            ></i>
          </span>
        {/if}
      </button>
    </form>

    <div class="mt-8 text-center">
      <a
        href="/"
        class="text-gray-500 text-xs hover:text-white transition-colors"
        >Volver al sitio principal</a
      >
    </div>
  </div>

  <div
    class="mt-6 text-gray-600 text-[10px] uppercase tracking-widest font-mono"
  >
    Secured by Caja Fuerte 2.0
  </div>
</div>
