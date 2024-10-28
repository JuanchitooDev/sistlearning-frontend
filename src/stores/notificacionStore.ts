import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificacionStore = defineStore('notificacionStore', () => {
    const message = ref('')
    const type = ref('success')
    const isVisible = ref(false)

    const showNotificacion = (msg: any, msgType = 'success') => {
        message.value = msg
        type.value = msgType
        isVisible.value = true

        setTimeout(() => {
            isVisible.value = false
        }, 3000);
    }

    return {
        message,
        type,
        isVisible,
        showNotificacion
    }
})