<script lang="ts">
  let title = "";
  let category = "apuesta_gratis";
  let startDate = "";
  let endDate = "";
  let benefit = "";
  let imageUrl = "";

  const CATEGORIES = [
    { id: "apuesta_gratis", label: "Apuesta Gratis" },
    { id: "giros_gratis", label: "Giros Gratis" },
    { id: "supercuotas", label: "Supercuotas" },
  ];

  function handleSubmit() {
    console.log("Nueva Promoción:", {
      title,
      category,
      startDate,
      endDate,
      benefit,
      imageUrl,
    });
    alert("Promoción guardada correctamente (Simulación)");
    // Reset form
    title = "";
    startDate = "";
    endDate = "";
    benefit = "";
    imageUrl = "";
  }
</script>

<div
  class="max-w-4xl mx-auto bg-[#13151A]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
>
  <!-- Decoration -->
  <div
    class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none rounded-r-3xl"
  ></div>
  <h2 class="text-2xl font-bold text-white font-display mb-6">
    Agregar Nueva Promoción
  </h2>

  <form
    on:submit|preventDefault={handleSubmit}
    class="space-y-6 max-w-2xl mx-auto"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="col-span-1 md:col-span-2">
        <label class="block text-gray-300 text-sm font-bold mb-2"
          >Título de la Promoción</label
        >
        <input
          type="text"
          bind:value={title}
          required
          class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="Ej: Reembolso NBA"
        />
      </div>

      <div>
        <label class="block text-gray-300 text-sm font-bold mb-2"
          >Categoría</label
        >
        <select
          bind:value={category}
          class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
        >
          {#each CATEGORIES as cat}
            <option value={cat.id}>{cat.label}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-gray-300 text-sm font-bold mb-2"
          >Beneficio</label
        >
        <input
          type="text"
          bind:value={benefit}
          required
          class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          placeholder="Ej: S/. 50"
        />
      </div>

      <div>
        <label class="block text-gray-300 text-sm font-bold mb-2"
          >Fecha Inicio</label
        >
        <input
          type="date"
          bind:value={startDate}
          required
          class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-300 text-sm font-bold mb-2"
          >Fecha Fin</label
        >
        <input
          type="date"
          bind:value={endDate}
          required
          class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div class="col-span-1 md:col-span-2">
        <label class="block text-gray-300 text-sm font-bold mb-2"
          >URL de Imagen</label
        >
        <input
          type="url"
          bind:value={imageUrl}
          class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          placeholder="https://..."
        />
      </div>
    </div>

    <div class="pt-4 flex justify-end">
      <button
        type="submit"
        class="bg-primary hover:bg-opacity-90 text-secondary font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(12,242,242,0.3)] transition-all transform hover:-translate-y-1"
      >
        Publicar Promoción
      </button>
    </div>
  </form>
</div>
