import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IAlumno } from '../interfaces/alumnoInterface'

export const useAlumnoStore = defineStore('alumnoStore', {
    state: () => ({
        alumnos: [] as IAlumno[],
        alumno: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchAlumnos() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/alumno')
                this.alumnos = response.data.data
            } catch (error) {
                console.error('Error fetching alumnos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getAlumnoById(id: number) {
            try {
                const response = await api.get(`/alumno/${id}`)
                const alumno = response.data.data
                console.log('alumno response', alumno)
                const index = this.alumnos.findIndex((a) => a.id === alumno.id)
                if (index !== -1) {
                    this.alumnos[index] = alumno
                } else {
                    this.alumnos.push(alumno)
                }
                return alumno
            } catch (error) {
                console.error(`Error al obtener el alumno: ${error}`)
                this.error = error instanceof Error ? error.message : 'Error desconocido'
            }
        },
        async createAlumno(alumno: IAlumno) {
            try {
                const response = await api.post('/alumno', alumno)
                this.alumnos.push(response.data)
            } catch (error) {
                console.error('Error creating alumno: ', error)
            }
        },
        async updateAlumno(idAlumno: number, alumno: IAlumno) {
            try {
                await api.put(`/alumno/${idAlumno}`, alumno)
                const index = this.alumnos.findIndex((a) => a.id === alumno.id)
                if (index !== -1) {
                    this.alumnos[index] = alumno
                }
            } catch (error) {
                console.error('Error updating alumno: ', error)
            }
        },
        async deleteAlumno(idAlumno: number) {
            try {
                await api.delete(`/alumno/${idAlumno}`)
                this.alumnos = this.alumnos.filter((a) => a.id !== idAlumno)
            } catch (error) {
                console.error('Error deleting alumno: ', error)
            }
        }
    }
})