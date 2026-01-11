<script lang="ts">
    let title = "";
    let type = "welcome";
    let amount = "";
    let code = "";
    let expiryDate = "";
    let description = "";

    const BONUS_TYPES = [
        { id: "welcome", label: "Bono de Bienvenida" },
        { id: "reload", label: "Bono de Recarga" },
        { id: "cashback", label: "Cashback" },
        { id: "vip", label: "Bono VIP" },
        { id: "referral", label: "Referidos" },
    ];

    function handleSubmit() {
        console.log("Nuevo Bono:", {
            title,
            type,
            amount,
            code,
            expiryDate,
            description,
        });
        alert("Bono guardado correctamente (Simulación)");
        // Reset form
        title = "";
        amount = "";
        code = "";
        expiryDate = "";
        description = "";
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
        Agregar Nuevo Bono
    </h2>

    <form
        on:submit|preventDefault={handleSubmit}
        class="space-y-6 max-w-2xl mx-auto"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-1 md:col-span-2">
                <label
                    for="bonus-title"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Nombre del Bono</label
                >
                <input
                    id="bonus-title"
                    type="text"
                    bind:value={title}
                    required
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Ej: Bono de Bienvenida 100%"
                />
            </div>

            <div>
                <label
                    for="bonus-type"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Tipo de Bono</label
                >
                <select
                    id="bonus-type"
                    bind:value={type}
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                >
                    {#each BONUS_TYPES as t}
                        <option value={t.id}>{t.label}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label
                    for="bonus-amount"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Monto / Porcentaje</label
                >
                <input
                    id="bonus-amount"
                    type="text"
                    bind:value={amount}
                    required
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="Ej: S/. 100 o 100%"
                />
            </div>

            <div>
                <label
                    for="bonus-code"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Código Promocional</label
                >
                <input
                    id="bonus-code"
                    type="text"
                    bind:value={code}
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="Ej: BIENVENIDA2025"
                />
            </div>

            <div>
                <label
                    for="bonus-expiry"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Fecha de Expiración</label
                >
                <input
                    id="bonus-expiry"
                    type="date"
                    bind:value={expiryDate}
                    required
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                />
            </div>

            <div class="col-span-1 md:col-span-2">
                <label
                    for="bonus-description"
                    class="block text-gray-300 text-sm font-bold mb-2"
                    >Descripción / Términos</label
                >
                <textarea
                    id="bonus-description"
                    bind:value={description}
                    rows="3"
                    class="w-full bg-surface-dark text-white border border-gray-600 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="Detalles del bono y condiciones importantes..."
                ></textarea>
            </div>
        </div>

        <div class="pt-4 flex justify-end">
            <button
                type="submit"
                class="bg-primary hover:bg-opacity-90 text-secondary font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(12,242,242,0.3)] transition-all transform hover:-translate-y-1"
            >
                Guardar Bono
            </button>
        </div>
    </form>
</div>
