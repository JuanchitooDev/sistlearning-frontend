import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ITrabajador } from '../interfaces/trabajadorInterface'

export const useTrabajadorStore = defineStore('trabajadorStore', {
    state: () => ({
        trabajadores: [] as ITrabajador[],
        trabajador: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchTrabajadores() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/trabajador')
                // console.log('response.data', response.data.data)
                this.trabajadores = response.data.data
            } catch (error) {
                console.error('Error fetching trabajadores: ', error)
            } finally {
                this.loading = false
            }
        },
        async getTrabajadorById(id: number) {
            try {
                const response = await api.get(`/trabajador/${id}`)
                // console.log('response evento by id', response.data.data)
                this.trabajadores = response.data.data
            } catch (error) {
                console.error('Error al obtener el trabajador: ', error)
            } finally {
                this.loading = false
            }
        },
        async createTrabajador(trabajador: ITrabajador) {
            try {
                const response = await api.post('/trabajador', trabajador)
                this.trabajadores.push(response.data)
            } catch (error) {
                console.error('Error creating trabajador: ', error)
            }
        },
        async updateTrabajador(idTrabajador: number, trabajador: ITrabajador) {
            try {
                await api.put(`/trabajador/${idTrabajador}`, trabajador)
                const index = this.trabajadores.findIndex((t) => t.id === trabajador.id)
                if (index !== -1) {
                    this.trabajadores[index] = trabajador
                }
            } catch (error) {
                console.error('Error updating trabajador: ', error)
            }
        },
        async deleteTrabajador(idTrabajador: number) {
            try {
                await api.delete(`/trabajador/${idTrabajador}`)
                this.trabajadores = this.trabajadores.filter((t) => t.id !== idTrabajador)
            } catch (error) {
                console.error('Error deleting trabajador: ', error)
            }
        },
        setTrabajador(trabajador: any) {
            this.trabajador = trabajador
        },
        cancelEdit() {
            this.trabajador = null
        }
    }
})