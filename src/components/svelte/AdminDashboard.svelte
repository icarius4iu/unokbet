<script lang="ts">
  import UserManagement from "./UserManagement.svelte";
  import CalendarForm from "./CalendarForm.svelte";
  import BonusesForm from "./BonusesForm.svelte";

  let activeTab: "users" | "calendar" | "bonuses" = "users";

  function setTab(tab: "users" | "calendar" | "bonuses") {
    activeTab = tab;
  }
</script>

<div class="flex-1 p-6 text-white min-h-screen">
  <div
    class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
  >
    <div>
      <h1 class="text-3xl font-display font-bold text-white mb-2">
        Panel de Admin
      </h1>
      <p class="text-gray-400">
        Gestiona usuarios y contenido de la plataforma
      </p>
    </div>

    <div class="flex bg-surface-dark p-1 rounded-lg border border-white/10">
      <button
        on:click={() => setTab("users")}
        class={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "users" ? "bg-primary text-secondary shadow-lg" : "text-gray-400 hover:text-white"}`}
      >
        <i class="fas fa-users mr-2"></i> Usuarios
      </button>
      <button
        on:click={() => setTab("calendar")}
        class={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "calendar" ? "bg-primary text-secondary shadow-lg" : "text-gray-400 hover:text-white"}`}
      >
        <i class="fas fa-calendar-plus mr-2"></i> Calendario
      </button>
      <button
        on:click={() => setTab("bonuses")}
        class={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "bonuses" ? "bg-primary text-secondary shadow-lg" : "text-gray-400 hover:text-white"}`}
      >
        <i class="fas fa-gift mr-2"></i> Bonos
      </button>
    </div>
  </div>

  <div class="mt-6">
    {#if activeTab === "users"}
      <UserManagement />
    {:else if activeTab === "calendar"}
      <CalendarForm />
    {:else}
      <BonusesForm />
    {/if}
  </div>
</div>
