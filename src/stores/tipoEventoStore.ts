import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ITipoEvento } from '../interfaces/tipoEventoInterface'

export const useTipoEventoStore = defineStore('tipoEventoStore', {
    state: () => ({
        tipos: [] as ITipoEvento[],
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchTipoEventos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/tipo-evento')
                // console.log('response.data', response.data.data)
                this.tipos = response.data.data
            } catch (error) {
                console.error('Error fetching tipo eventos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getTipoEventoById(id: number) {
            try {
                const response = await api.get(`/tipo-evento/${id}`)
                // console.log('response evento by id', response.data.data)
                this.tipos = response.data.data
            } catch (error) {
                console.error('Error al obtener el tipo evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createTipoEvento(tipoEvento: ITipoEvento) {
            try {
                const response = await api.post('/tipo-evento', tipoEvento)
                this.tipos.push(response.data)
            } catch (error) {
                console.error('Error creating tipo evento: ', error)
            }
        },
        async updateTipoEvento(idTipoEvento: number, tipoEvento: ITipoEvento) {
            try {
                await api.put(`/tipo-evento/${idTipoEvento}`, tipoEvento)
                const index = this.tipos.findIndex((tipo) => tipo.id === tipoEvento.id)
                if (index !== -1) {
                    this.tipos[index] = tipoEvento
                }
            } catch (error) {
                console.error('Error updating tipo: ', error)
            }
        },
        async deleteTipoEvento(tipoEventoId: number) {
            try {
                await api.delete(`/tipo-evento/${tipoEventoId}`)
                this.tipos = this.tipos.filter((tipo) => tipo.id !== tipoEventoId)
            } catch (error) {
                console.error('Error deleting tipo evento: ', error)
            }
        }
    }
})