import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IEvento } from '../interfaces/eventoInterface'

export const useEventoStore = defineStore('eventoStore', {
    state: () => ({
        eventos: [] as IEvento[],
        evento: null,
        loading: false,
        error: null as string | null,
        message: '',
        result: false
    }),
    actions: {
        async fetchEventos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/evento')
                if (response.data.result) {
                    const eventos = response.data.data
                    this.eventos = eventos
                }
            } catch (error) {
                console.error('Error fetching eventos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getEventoById(id: number) {
            try {
                const response = await api.get(`/evento/${id}`)
                if (response.data.result) {
                    this.evento = response.data.data
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al obtener el evento"
                console.error('Error al obtener el evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createEvento(evento: IEvento) {
            try {
                const response = await api.post('/evento', evento)
                this.result = response.data.result 
                if (this.result) {
                    this.eventos.push(response.data.data)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al crear un nuevo evento"
                this.result = false
                console.error('Error creating evento: ', error)
            }
        },
        async updateEvento(idEvento: number, evento: IEvento) {
            try {
                const response = await api.put(`/evento/${idEvento}`, evento)
                this.result = response.data.result 
                if (this.result) {
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al actualizar el evento"
                console.error('Error updating evento: ', error)
            }
        },
        async deleteEvento(idEvento: number) {
            try {
                const response = await api.delete(`/evento/${idEvento}`)
                this.result = response.data.result 
                if (this.result) {
                    this.eventos = this.eventos.filter((ev) => ev.id !== idEvento)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = 'Error al eliminar el evento'
                console.error('Error deleting evento: ', error)
            }
        }
    }
})