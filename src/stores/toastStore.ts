import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface IToast {
    id: number
    message: string
    type: ToastType
}

export const useToastStore = defineStore('toastStore', {
    state: () => ({
        toasts: [] as IToast[]
    }),
    actions: {
        addToast(message: string, type: ToastType = 'success', duration: number = 4000) {
            const id = Date.now()
            this.toasts.push({ id, message, type })

            setTimeout(() => {
                this.removeToast(id)
            }, duration)
        },
        removeToast(id: number) {
            this.toasts = this.toasts.filter(toast => toast.id !== id)
        }
    }
})