<template>
    <div class="fixed top-4 right-4 space-y-2 z-50 w-80">
        <TransitionGroup name="toast" tag="div">
            <div v-for="toast in toastStore.toasts" :key="toast.id"
                class="flex items-start gap-3 px-4 py-3 rounded shadow-lg border text-sm animate-slide-in-right"
                :class="toastStyles[toast.type] || toastStyles.info">
                <span class="text-xl">
                    <component :is="icons[toast.type] || icons.info" />
                </span>
                <div class="flex-1">{{ toast.message }}</div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { useToastStore } from "@/stores"

export default {
    name: 'ToastContainer',
    setup() {
        // Estilos por tipo
        const toastStyles = {
            success: 'bg-green-100 border-green-400 text-green-800',
            error: 'bg-red-100 border-red-400 text-red-800',
            warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
            info: 'bg-blue-100 border-blue-400 text-blue-800',
        }

        // Íconos por tipo (puedes usar SVG, componentes, emojis o Heroicons)
        const icons = {
            success: () => '✅',
            error: () => '❌',
            warning: () => '⚠️',
            info: () => 'ℹ️',
        }

        const toastStore = useToastStore()

        return {
            toastStyles,
            icons,
            toastStore
        }
    }
}
</script>

<style scoped>
@keyframes slide-in-right {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
}
</style>