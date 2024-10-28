import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ITipoEvento } from '../interfaces/tipoEventoInterface'

export const useTipoEventoStore = defineStore('tipoEventoStore', {
    state: () => ({
        tipos: [] as ITipoEvento[],
        tipoEvento: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchTipoEventos(estado: boolean | null = null) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/tipo-evento')
                // console.log('response.data', response.data.data)
                // this.tipos = response.data.data
                const tipos = response.data.data
                if (estado !== null) {
                    this.tipos = tipos.filter((tipo:ITipoEvento) => tipo.estado === estado)
                } else {
                    this.tipos = tipos
                }
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
                console.error('Error updating tipo evento: ', error)
            }
        },
        async deleteTipoEvento(idTipoEvento: number) {
            try {
                await api.delete(`/tipo-evento/${idTipoEvento}`)
                this.tipos = this.tipos.filter((tipo) => tipo.id !== idTipoEvento)
            } catch (error) {
                console.error('Error deleting tipo evento: ', error)
            }
        },
        setTipoEvento(tipoEvento: any) {
            this.tipoEvento = tipoEvento
        },
        cancelEdit() {
            this.tipoEvento = null
        }
    }
})