import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IAlumno } from '../interfaces/alumnoInterface'

export const useAlumnoStore = defineStore('alumnoStore', {
    state: () => ({
        alumnos: [] as IAlumno[],
        alumno: null,
        loading: false,
        error: null as string | null,
        message: '',
        result: false
    }),
    actions: {
        async fetchAlumnos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/alumno')
                if (response.data.result) {
                    const alumnos = response.data.data
                    this.alumnos = alumnos
                }
            } catch (error) {
                console.error('Error fetching alumnos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getAlumnoById(id: number) {
            try {
                const response = await api.get(`/alumno/${id}`)
                console.log('response getAlumnoById', response)
                if (response.data.result) {
                    this.alumno = response.data.data
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al obtener al alumno"
                console.error('Error al obtener al alumno: ', error)
            } finally {
                this.loading = false
            }
        },
        async createAlumno(alumno: IAlumno) {
            try {
                const response = await api.post('/alumno', alumno)
                this.result = response.data.result
                if (this.result) {
                    this.alumnos.push(response.data.data)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al crear un nuevo alumno"
                this.result = false
                console.error('Error creating alumno: ', error)
            }
        },
        async updateAlumno(idAlumno: number, alumno: IAlumno) {
            try {
                const response = await api.put(`/alumno/${idAlumno}`, alumno)
                this.result = response.data.result
                if (this.result) {
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al actualizar el alumno"
                console.error('Error updating alumno: ', error)
            }
        },
        async deleteAlumno(idAlumno: number) {
            try {
                const response = await api.delete(`/alumno/${idAlumno}`)
                this.result = response.data.result
                if (this.result) {
                    this.alumnos = this.alumnos.filter((a) => a.id !== idAlumno)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = 'Error al eliminar el alumno'
                console.error('Error deleting alumno: ', error)
            }
        }
    }
})