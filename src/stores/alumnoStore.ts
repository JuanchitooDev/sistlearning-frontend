import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IAlumno } from '../interfaces/alumnoInterface'

export const useAlumnoStore = defineStore('alumnoStore', {
    state: () => ({
        alumnos: [] as IAlumno[],
        alumno: null,
        loading: false,
        error: null as string | null,
        message: ''
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
                if (response.data.result) {
                    this.alumno = response.data.data
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
                // if (response.data.result) {
                //     const alumno = response.data.data
                //     const index = this.alumnos.findIndex((a) => a.id === alumno.id)
                //     if (index !== -1) {
                //         this.alumnos[index] = alumno
                //     } else {
                //         this.alumnos.push(alumno)
                //     }
                //     return alumno
                // } else {
                //     this.message = response.data.message || response.data.error || 'Error desconocido'
                //     return null
                // }
            } catch (error) {
                this.message = "Error al obtener el alumno"
            } finally {
                this.loading = false
            }
        },
        async createAlumno(alumno: IAlumno) {
            try {
                const response = await api.post('/alumno', alumno)
                if (response.data.result) {
                    this.alumnos.push(response.data.data)
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al crear un nuevo alumno"
                console.error('Error creating evento: ', error)
            }
        },
        async updateAlumno(idAlumno: number, alumno: IAlumno) {
            try {
                const response = await api.put(`/alumno/${idAlumno}`, alumno)
                if (response.data.result) {
                    this.message = response.data.message
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
                // if (response.data.result) {
                //     const index = this.alumnos.findIndex((a) => a.id === alumno.id)
                //     if (index !== -1) {
                //         this.alumnos[index] = alumno
                //         this.message = response.data.message
                //     }
                // } else {
                //     this.message = response.data.message || response.data.error || 'Error desconocido'
                // }
            } catch (error) {
                this.message = "Error al actualizar el alumno"
                console.error('Error updating alumno: ', error)
            }
        },
        async deleteAlumno(idAlumno: number) {
            try {
                const response = await api.delete(`/alumno/${idAlumno}`)
                if (response.data.result) {
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