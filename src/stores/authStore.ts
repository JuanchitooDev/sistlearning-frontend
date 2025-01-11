import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../utils/axios'
import { IUsuario } from '../interfaces/usuarioInterface'
import { router } from '@/router'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const token = ref(null)
    const isAuthenticated = ref(false)
    const returnUrl = ref(null)

    const login = async (username: string, password: string) => {
        try {
            const usuarioItem: IUsuario = {
                username,
                password
            }

            const response = await api.post('/auth/login', usuarioItem)

            console.log('response login usuario', response)

            if (response.data.result) {
                token.value = response.data.token
                isAuthenticated.value = true
                localStorage.setItem('token', String(token.value))
                router.push(returnUrl.value || '/')
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.error('Error de autenticación: ', error)
            throw error;
        }
    }

    const register = async (username: string, password: string) => {
        try {
            const usuarioItem: IUsuario = {
                username,
                password
            }
            const response = await api.post('/auth/register', usuarioItem)
            console.log('response create usuario', response)

            if (response.data.result) {
                user.value = response.data.data
            } else {
                throw new Error(response.data.error)
            }
        } catch (error) {
            console.error('Error al crear al usuario', error)
            throw error
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        isAuthenticated.value = false
        localStorage.removeItem('token')
        router.push('/account/login')
    }

    return {
        login,
        register,
        logout
    }
})