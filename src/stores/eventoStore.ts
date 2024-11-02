import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IEvento } from '../interfaces/eventoInterface'

export const useEventoStore = defineStore('eventoStore', {
    state: () => ({
        eventos: [] as IEvento[],
        evento: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchEventos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/evento')
                this.eventos = response.data.data
            } catch (error) {
                console.error('Error fetching eventos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getEventoById(id: number) {
            // try {
            //     const response = await api.get(`/evento/${id}`)
            //     const evento = response.data.data
            //     const index = this.eventos.findIndex((e) => e.id === evento.id)
            //     if (index !== -1) {
            //         this.eventos[index] = evento
            //     } else {
            //         this.eventos.push(evento)
            //     }
            // } catch (error) {
            //     console.error(`Error al obtener el evento: ${error}`)
            //     this.error = error instanceof Error ? error.message : 'Error desconocido'
            // }
            try {
                const response = await api.get(`/evento/${id}`)
                // console.log('response evento by id', response.data.data)
                this.eventos = response.data.data
            } catch (error) {
                console.error('Error al obtener el evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createEvento(evento: IEvento) {
            try {
                const response = await api.post('/evento', evento)
                this.eventos.push(response.data)
            } catch (error) {
                console.error('Error creating evento: ', error)
            }
        },
        async updateEvento(idEvento: number, evento: IEvento) {
            try {
                await api.put(`/evento/${idEvento}`, evento)
                const index = this.eventos.findIndex((ev) => ev.id === evento.id)
                if (index !== -1) {
                    this.eventos[index] = evento
                }
            } catch (error) {
                console.error('Error updating evento: ', error)
            }
        },
        async deleteEvento(idEvento: number) {
            try {
                await api.delete(`/evento/${idEvento}`)
                this.eventos = this.eventos.filter((evento) => evento.id !== idEvento)
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