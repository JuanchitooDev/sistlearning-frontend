import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ICargo } from '../interfaces/cargoInterface'

export const useCargoStore = defineStore('cargoStore', {
    state: () => ({
        cargos: [] as ICargo[],
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchCargos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/cargo')
                this.cargos = response.data.data
            } catch (error) {
                console.error('Error fetching cargos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getCargoById(id: number) {
            try {
                const response = await api.get(`/cargo/${id}`)
                const cargo = response.data.data
                const index = this.cargos.findIndex((c) => c.id === cargo.id)
                if (index !== -1) {
                    this.cargos[index] = cargo
                } else {
                    this.cargos.push(cargo)
                }
            } catch (error) {
                console.error(`Error al obtener el cargo: ${error}`)
                this.error = error instanceof Error ? error.message : 'Error desconocido'
            }
        },
        async createCargo(cargo: ICargo) {
            try {
                const response = await api.post('/cargo', cargo)
                this.cargos.push(response.data)
            } catch (error) {
                console.error('Error creating cargo: ', error)
            }
        },
        async updateCargo(idCargo: number, cargo: ICargo) {
            try {
                await api.put(`/cargo/${idCargo}`, cargo)
                const index = this.cargos.findIndex((c) => c.id === cargo.id)
                if (index !== -1) {
                    this.cargos[index] = cargo
                }
            } catch (error) {
                console.error('Error updating cargo: ', error)
            }
        },
        async deleteCargo(idCargo: number) {
            try {
                await api.delete(`/cargo/${idCargo}`)
                this.cargos = this.cargos.filter((cargo) => cargo.id !== idCargo)
            } catch (error) {
                console.error('Error deleting cargo: ', error)
            }
        }
    }
})