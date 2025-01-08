import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../utils/axios'
import { IUsuario } from '../interfaces/usuarioInterface'

export const useUsuarioStore = defineStore('usuarioStore', () => {
    const usuario = ref({})
    const token = ref(localStorage.getItem("token") || null)
    const isAuthenticated = ref(!!token.value)

    // Crear un usuario
    const createUsuario = async (username: string, password: string) => {
        try {
            const usuarioItem: IUsuario = {
                username: username,
                password: password
            }
            const response = await api.post('/usuario/create', usuarioItem)

            console.log('response createUsuario', response)

            if (response.data.result) {
                return response.data
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            // throw new Error(error.response?.data?.message || 'Error al crear el usuario')
            console.error('Error fetching eventos: ', error)
        }
    }

    const loginUsuario = async (username: string, password: string) => {
        try {
            const usuarioItem: IUsuario = {
                username: username,
                password: password
            }
            const response = await api.post('/usuario/login', usuarioItem)
            if (response.data.token) {
                token.value = response.data.token;
                isAuthenticated.value = true;
                usuario.value = { username, token: response.data.token };
                localStorage.setItem('token', token.value as string);
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching eventos: ', error)
        }
    }

    const verifyToken = async () => {
        if (!token.value) return false;

        try {
            const response = await api.get('/usuario/verify', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            if (response.data.valid) {
                return true
            } else {
                logout();
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    const logout = () => {
        usuario.value = {}
        token.value = null
        isAuthenticated.value = false
        localStorage.removeItem('token')
    }

    return {
        usuario,
        token,
        isAuthenticated,
        createUsuario,
        loginUsuario,
        verifyToken,
        logout
    }
})