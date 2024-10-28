import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IPerfil } from '../interfaces/perfilInterface'

export const usePerfilStore = defineStore('perfilStore', {
    state: () => ({
        perfiles: [] as IPerfil[],
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchPerfiles() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/perfil')
                this.perfiles = response.data
            } catch (error) {
                console.error('Error fetching perfiles: ', error)
            } finally {
                this.loading = false
            }
        },
        async getPerfilById(id: number) {
            try {
                const response = await api.get(`/perfil/${id}`)
                const perfil = response.data.data
                const index = this.perfiles.findIndex((p) => p.id === perfil.id)
                if (index !== -1) {
                    this.perfiles[index] = perfil
                } else {
                    this.perfiles.push(perfil)
                }
            } catch (error) {
                console.error(`Error al obtener el perfil: ${error}`)
                this.error = error instanceof Error ? error.message : 'Error desconocido'
            }
        },
        async createPerfil(perfil: IPerfil) {
            try {
                const response = await api.post('/perfil', perfil)
                this.perfiles.push(response.data)
            } catch (error) {
                console.error('Error creating perfil: ', error)
            }
        },
        async updatePerfil(idPerfil: number, perfil: IPerfil) {
            try {
                await api.put(`/perfil/${idPerfil}`, perfil)
                const index = this.perfiles.findIndex((p) => p.id === perfil.id)
                if (index !== -1) {
                    this.perfiles[index] = perfil
                }
            } catch (error) {
                console.error('Error updating perfil: ', error)
            }
        },
        async deletePerfil(idPerfil: number) {
            try {
                await api.delete(`/perfil/${idPerfil}`)
                this.perfiles = this.perfiles.filter((p) => p.id !== idPerfil)
            } catch (error) {
                console.error('Error deleting perfil: ', error)
            }
        }
    }
})