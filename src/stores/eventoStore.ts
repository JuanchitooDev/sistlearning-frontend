import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IEvento } from '../interfaces/eventoInterface'

export const useEventoStore = defineStore('eventoStore', {
    state: () => ({
        eventos: [] as IEvento[],
        evento: null,
        loading: false,
        error: null as string | null,
        message: ''
    }),
    actions: {
        async fetchEventos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/evento')
                // if (response.data.result) {
                //     const eventos = response.data.data
                //     this.eventos = eventos
                // }
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
                    this.eventos = response.data.data
                } else {
                    if (response.data.message) {
                        this.message = response.data.message
                    } else {
                        this.message = response.data.error
                    }
                }
            } catch (error) {
                console.error('Error al obtener el evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createEvento(evento: IEvento) {
            try {
                const response = await api.post('/evento', evento)
                if (response.data.result) {
                    this.eventos.push(response.data.data)
                    this.message = response.data.message
                } else {
                    if (response.data.message) {
                        this.message = response.data.message
                    } else {
                        this.message = response.data.error
                    }
                }
            } catch (error) {
                console.error('Error creating evento: ', error)
            }
        },
        async updateEvento(idEvento: number, evento: IEvento) {
            try {
                const response = await api.put(`/evento/${idEvento}`, evento)
                if (response.data.result) {
                    const index = this.eventos.findIndex((ev) => ev.id === evento.id)
                    if (index !== -1) {
                        this.eventos[index] = evento
                        this.message = response.data.message
                    }
                } else {
                    if (response.data.message) {
                        this.message = response.data.message
                    } else {
                        this.message = response.data.error
                    }
                }
            } catch (error) {
                console.error('Error updating evento: ', error)
            }
        },
        async deleteEvento(idEvento: number) {
            try {
                const response = await api.delete(`/evento/${idEvento}`)
                if (response.data.result) {
                    this.eventos = this.eventos.filter((ev) => ev.id !== idEvento)
                    this.message = response.data.message
                } else {
                    if (response.data.message) {
                        this.message = response.data.message
                    } else {
                        this.message = response.data.error
                    }
                }
            } catch (error) {
                console.error('Error deleting evento: ', error)
            }
        },
        setEvento(evento: any) {
            this.evento = evento
        },
        cancelEdit() {
            this.evento = null
        }
    }
})