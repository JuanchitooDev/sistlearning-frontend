import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IUsuario } from '../interfaces/usuarioInterface'

export const useUsuarioStore = defineStore('usuarioStore', {
    state: () => ({
        usuarios: [] as IUsuario[],
        usuario: null,
        loading: false,
        error: null as string | null,
        message: ''
    }),
    actions: {
        async fetchUsuarios() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/usuario')
                if (response.data.result) {
                    const usuarios = response.data.data
                    this.usuarios = usuarios
                }
            } catch (error) {
                console.error('Error fetching usuarios: ', error)
            } finally {
                this.loading = false
            }
        },
        async getUsuarioById(id: number) {
            try {
                const response = await api.get(`/usuario/${id}`)
                if (response.data.result) {
                    this.usuarios = response.data.data
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = 'Error al obtener el usuario'
                console.error('Error al obtener el usuario: ', error)
            } finally {
                this.loading = false
            }
        }
    }
})