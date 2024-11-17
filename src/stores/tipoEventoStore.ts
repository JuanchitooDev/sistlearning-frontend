import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ITipoEvento } from '../interfaces/tipoEventoInterface'

export const useTipoEventoStore = defineStore('tipoEventoStore', {
    state: () => ({
        tipos: [] as ITipoEvento[],
        tipoEvento: null,
        loading: false,
        error: null as string | null,
        message: ''
    }),
    actions: {
        async fetchTipoEventos(estado: boolean | null = null) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/tipo-evento')
                if (response.data.result) {
                    const tipos = response.data.data
                    if (estado) {
                        this.tipos = tipos.filter((tipo: ITipoEvento) => tipo.estado === estado)
                    } else {
                        this.tipos = tipos
                    }
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
                if (response.data.result) {
                    this.tipos = response.data.data
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al obtener el tipo de evento"
                console.error('Error al obtener el tipo evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createTipoEvento(tipoEvento: ITipoEvento) {
            try {
                const response = await api.post('/tipo-evento', tipoEvento)
                if (response.data.result) {
                    this.tipos.push(response.data.data)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al crear un nuevo tipo de evento"
                console.error('Error creating tipo evento: ', error)
            }
        },
        async updateTipoEvento(idTipoEvento: number, tipoEvento: ITipoEvento) {
            try {
                const response = await api.put(`/tipo-evento/${idTipoEvento}`, tipoEvento)
                if (response.data.result) {
                    const index = this.tipos.findIndex((tipo) => tipo.id === tipoEvento.id)
                    if (index !== -1) {
                        this.tipos[index] = tipoEvento
                        this.message = response.data.message
                    }
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al actualizar el tipo de evento"
                console.error('Error updating tipo evento: ', error)
            }
        },
        async deleteTipoEvento(idTipoEvento: number) {
            try {
                const response = await api.delete(`/tipo-evento/${idTipoEvento}`)
                if (response.data.result) {
                    this.tipos = this.tipos.filter((tipo) => tipo.id !== idTipoEvento)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = 'Error al eliminar el tipo de evento'
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