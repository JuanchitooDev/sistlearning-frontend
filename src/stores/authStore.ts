import { defineStore } from 'pinia'
import { router } from '@/router'
import { IUsuario } from '../interfaces/usuarioInterface'
import api from '../utils/axios'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        usuario: null,
        returnUrl: null as string | null
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const usuarioItem: IUsuario = {
                    username,
                    password
                }

                console.log('usuarioItem', usuarioItem)

                const response = await api.post('/auth/login', usuarioItem)

                console.log('response login usuario', response)

                if (response.status == 200) {
                    const token = response.data.token
                    const usuario = response.data.usuario
                    const dataLogin = {
                        token,
                        usuario
                    }
                    this.usuario = usuario

                    localStorage.setItem('auth', JSON.stringify(dataLogin))

                    router.push(this.returnUrl || '/')
                }

            } catch (error) {
                console.error('Error de autenticación: ', error)
                throw error;
            }
        },
        logout() {
            this.usuario = null
            localStorage.removeItem('auth')
            router.push('/account/login')
        }
    }
})