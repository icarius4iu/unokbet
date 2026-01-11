<script lang="ts">
  import UserManagement from "./UserManagement.svelte";
  import CalendarForm from "./CalendarForm.svelte";
  import BonusesForm from "./BonusesForm.svelte";
  import AdminLogin from "./AdminLogin.svelte"; // [NEW] Import
  import { fade, fly } from "svelte/transition";

  // Auth State
  let isAuthenticated = false; // Default to locked

  let activeTab: "users" | "calendar" | "bonuses" = "users";

  function setTab(tab: "users" | "calendar" | "bonuses") {
    activeTab = tab;
  }

  function handleLoginSuccess() {
    isAuthenticated = true;
  }

  const tabs: {
    id: "users" | "calendar" | "bonuses";
    label: string;
    icon: string;
  }[] = [
    { id: "users", label: "Usuarios", icon: "fas fa-users" },
    { id: "calendar", label: "Calendario", icon: "fas fa-calendar-alt" },
    { id: "bonuses", label: "Bonos", icon: "fas fa-gift" },
  ];

  // Mock Stats
  const stats = [
    {
      label: "Usuarios Totales",
      value: "1,234",
      trend: "+12%",
      icon: "fas fa-users",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Promociones Activas",
      value: "8",
      trend: "+2",
      icon: "fas fa-tag",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Visitas Hoy",
      value: "4.5k",
      trend: "+18%",
      icon: "fas fa-chart-line",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Ingresos (Est.)",
      value: "S/. 12k",
      trend: "+5%",
      icon: "fas fa-wallet",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];
</script>

<div class="flex-1 p-6 lg:p-10 text-white min-h-screen">
  {#if !isAuthenticated}
    <!-- Login View -->
    <div class="flex items-center justify-center h-full pt-10">
      <AdminLogin on:login={handleLoginSuccess} />
    </div>
  {:else}
    <!-- Header & Stats -->
    <div class="mb-10 animate-fade-in-down" in:fade={{ duration: 500 }}>
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8"
      >
        <div>
          <h1
            class="text-4xl font-display font-bold text-white mb-2 tracking-tight"
          >
            Admin Dashboard
          </h1>
          <p class="text-gray-400 text-lg">
            Bienvenido de nuevo. Aquí tienes el resumen de hoy.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <span
            class="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse"
          >
            <i class="fas fa-circle text-[8px] mr-1"></i> Sistema Operativo
          </span>
          <span class="text-gray-500 text-sm font-mono">v2.4.0</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each stats as stat, i}
          <div
            in:fly={{ y: 20, delay: i * 100, duration: 800 }}
            class="bg-[#13151A]/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-all hover:-translate-y-1 group"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <i class={`${stat.icon} text-xl`}></i>
              </div>
              <span
                class="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/10"
              >
                {stat.trend}
              </span>
            </div>
            <h3
              class="text-2xl font-bold font-mono text-white mb-1 group-hover:text-primary transition-colors"
            >
              {stat.value}
            </h3>
            <p class="text-gray-400 text-sm font-medium">{stat.label}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div
      class="mb-8 overflow-x-auto pb-2 sticky top-5 z-20"
      in:fade={{ delay: 200, duration: 500 }}
    >
      <div
        class="flex bg-[#0B0D11]/90 p-1.5 rounded-2xl border border-white/10 w-fit backdrop-blur-xl shadow-2xl mx-auto"
      >
        {#each tabs as tab}
          <button
            on:click={() => setTab(tab.id)}
            class={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 outline-none focus:ring-2 focus:ring-primary/20 ${
              activeTab === tab.id
                ? "text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {#if activeTab === tab.id}
              <div
                class="absolute inset-0 bg-primary/20 border border-primary/20 rounded-xl"
                transition:fade={{ duration: 200 }}
              ></div>
            {/if}
            <i
              class={`${tab.icon} relative z-10 ${activeTab === tab.id ? "text-primary" : ""}`}
            ></i>
            <span class="relative z-10">{tab.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Content Area -->
    <div class="relative min-h-[500px]">
      {#if activeTab === "users"}
        <div
          in:fly={{ y: 10, duration: 400, delay: 100 }}
          out:fade={{ duration: 100 }}
        >
          <UserManagement />
        </div>
      {:else if activeTab === "calendar"}
        <div
          in:fly={{ y: 10, duration: 400, delay: 100 }}
          out:fade={{ duration: 100 }}
        >
          <CalendarForm />
        </div>
      {:else}
        <div
          in:fly={{ y: 10, duration: 400, delay: 100 }}
          out:fade={{ duration: 100 }}
        >
          <BonusesForm />
        </div>
      {/if}
    </div>
  {/if}
</div>
