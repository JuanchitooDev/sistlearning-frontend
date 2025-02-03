import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IUsuario } from '../interfaces/usuarioInterface'

export const useUsuarioStore = defineStore({
    id: 'users',
    state: () => ({
        usuarios: {},
        usuario: {}
    }),
    actions: {
        async register(username: string, password: string) {
            try {
                const usuarioItem: IUsuario = {
                    username,
                    password
                }
                const response = await api.post('/auth/register', usuarioItem)

                if (response.data.result) {
                    this.usuario = response.data.data
                } else {
                    throw new Error(response.data.error)
                }
            } catch (error) {
                console.error('Error al crear al usuario', error)
                throw error
            }
        },
        async getAll() {
            this.usuarios = { loading: false }
            try {
                const response = await api.get('/usuario')
                if (response.data.result) {
                    const usuarios = response.data.data
                    this.usuarios = usuarios
                }
            } catch (error) {
                console.error('Error fetching usuarios: ', error)
                this.usuarios = { error }
            }
        },
        async getById(id: number) {
            this.usuario = { loading: true }
            try {
                const response = await api.get(`/usuario/${id}`)
                if (response.data.result) {
                    this.usuario = response.data.data
                }
            } catch (error) {
                this.usuario = { error }
            }
        }
    }
})