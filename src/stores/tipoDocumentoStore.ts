import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ITipoDocumento } from '../interfaces/tipoDocumentoInterface'

export const useTipoDocumentoStore = defineStore('tipoDocumentoStore', {
    state: () => ({
        tipos: [] as ITipoDocumento[],
        tipoDocumento: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchTipos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/tipo-documento')
                // console.log('response.data', response.data.data)
                this.tipos = response.data.data
            } catch (error) {
                console.error('Error fetching tipo documentos: ', error)
            } finally {
                this.loading = false
            }
        },
        async fetchTiposPorCategoria(categoria: String) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get(`/tipo-documento/categoria/${categoria}`)
                // console.log('response.data tipodocs', response.data.data)
                this.tipos = response.data.data
                return this.tipos
            } catch (error) {
                console.error('Error fetching tipo documentos por categoria: ', error)
                return [];
            } finally {
                this.loading = false
            }
        },
        async getTipoDocumentoById(id: number) {
            try {
                const response = await api.get(`/tipo-documento/${id}`)
                // console.log('response evento by id', response.data.data)
                this.tipos = response.data.data
            } catch (error) {
                console.error('Error al obtener el tipo documento: ', error)
            } finally {
                this.loading = false
            }
        },
        async createTipoDocumento(tipoDocumento: ITipoDocumento) {
            try {
                const response = await api.post('/tipo-documento', tipoDocumento)
                this.tipos.push(response.data)
            } catch (error) {
                console.error('Error creating tipo documento: ', error)
            }
        },
        async updateTipoDocumento(idTipoDocumento: number, tipoDocumento: ITipoDocumento) {
            try {
                await api.put(`/tipo-documento/${idTipoDocumento}`, tipoDocumento)
                const index = this.tipos.findIndex((tipo) => tipo.id === tipoDocumento.id)
                if (index !== -1) {
                    this.tipos[index] = tipoDocumento
                }
            } catch (error) {
                console.error('Error updating tipo documento: ', error)
            }
        },
        async deleteTipoDocumento(idTipoDocumento: number) {
            try {
                await api.delete(`/tipo-documento/${idTipoDocumento}`)
                this.tipos = this.tipos.filter((tipo) => tipo.id !== idTipoDocumento)
            } catch (error) {
                console.error('Error deleting tipo documento: ', error)
            }
        },
        setTipoDocumento(tipoDocumento: any) {
            this.tipoDocumento = tipoDocumento
        },
        cancelEdit() {
            this.tipoDocumento = null
        }
    }
})