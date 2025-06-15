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
                const { data } = response
                const { result } = data

                if (result) {
                    const eventos = data.data
                    this.eventos = eventos
                    this.result = result
                }
            } catch (error) {
                this.result = false
                console.error('Error fetching eventos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getEventoById(id: number) {
            try {
                const response = await api.get(`/evento/${id}`)
                const { data } = response
                const { result, message } = data

                if (result) {
                    this.result = result
                    this.evento = data.data
                } else {
                    this.message = message || data.error || 'Error desconocido'
                }
            } catch (error) {
                this.result = false
                this.message = "Error al obtener el evento"
                console.error('Error al obtener el evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async getEventoByTitulo(titulo: string) {
            try {
                const url = `/evento/titulo/${titulo}`
                const response = await api.get(`${url}`)
                const { data } = response
                const { result, message } = data

                if (result) {
                    this.result = result
                    this.evento = data.data
                } else {
                    this.evento = null
                    this.message = message || data.error || 'Error desconocido'
                }
            } catch (error) {
                this.result = false
                this.message = "Error al obtener el evento"
                console.error('Error al obtener el evento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createEvento(evento: IEvento) {
            try {
                const response = await api.post('/evento', evento)
                const { data } = response
                const { result, message } = data

                if (result) {
                    this.result = result
                    this.eventos.push(data.data)
                    this.message = message
                } else {
                    this.message = message || data.error || 'Error desconocido'
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
                const { data } = response
                const { result, message } = data

                if (result) {
                    this.result = result
                    this.message = message
                } else {
                    this.message = message || data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al actualizar el evento"
                this.result = false
                console.error('Error updating evento: ', error)
            }
        },
        async updateEstado(idEvento: number, newEstado: boolean) {
            try {
                const response = await api.put(`/evento/cambiar-estado/${idEvento}`, {
                    estado: newEstado
                })
                const { data } = response
                const { result, message, error } = data

                if (result) {
                    this.result = result
                    this.message = data.message
                } else {
                    this.message = message || error || 'Error desconocido'
                }
            } catch (error) {
                this.result = false
                this.message = "Error al actualizar el estado"
                console.error('Error updating evento: ', error)
            }
        },
        async deleteEvento(idEvento: number) {
            try {
                const response = await api.delete(`/evento/${idEvento}`)
                const { data } = response
                const { result, message, error } = data

                if (result) {
                    this.result = result
                    this.eventos = this.eventos.filter((ev) => ev.id !== idEvento)
                    this.message = message
                } else {
                    this.message = message || error || 'Error desconocido'
                }
            } catch (error) {
                this.message = 'Error al eliminar el evento'
                this.result = false
                console.error('Error deleting evento: ', error)
            }
        }
    }
})