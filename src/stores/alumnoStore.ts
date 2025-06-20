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
        async fetchAlumnos(estado: boolean | null = null) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/alumno')
                const { data } = response
                const { result } = data

                if (result) {
                    const alumnos = data.data
                    if (estado) {
                        this.alumnos = alumnos.filter((alumno: IAlumno) => alumno.estado === estado)
                    } else {
                        this.alumnos = alumnos
                    }
                    this.result = result
                }
            } catch (error) {
                this.result = false
                console.error('Error fetching alumnos: ', error)
            } finally {
                this.loading = false
            }
        },
        async getAlumnoById(id: number) {
            try {
                const response = await api.get(`/alumno/${id}`)
                const { data } = response
                const { result, message } = data

                if (result) {
                    this.result = result
                    this.alumno = data.data
                } else {
                    this.message = message || data.error || 'Error desconocido'
                }
            } catch (error) {
                this.result = false
                this.message = "Error al obtener al alumno"
                console.error('Error al obtener al alumno: ', error)
            } finally {
                this.loading = false
            }
        },
        async getAlumnoByTipoDocNumDoc(idTipoDoc: number, numDoc: string) {
            try {
                this.alumno = null
                this.message = ""

                const url = `/alumno/tipo-documento/${idTipoDoc}/numero-documento/${numDoc}`
                const response = await api.get(`${url}`)

                const { data } = response
                const { result, message } = data

                if (result) {
                    this.result = result
                    this.alumno = data.data
                    this.message = message
                } else {
                    this.alumno = null
                    this.message = message || data.error || 'Error desconocido'
                }
            } catch (error) {
                this.result = false
                this.message = "Error al obtener al alumno"
                this.alumno = null
                console.error('Error al obtener al alumno: ', error)
            } finally {
                this.loading = false
            }
        },
        async createAlumno(alumno: IAlumno) {
            try {
                const response = await api.post('/alumno', alumno)
                const { data } = response
                const { result, message, error } = data

                if (result) {
                    this.result = result
                    this.alumnos.push(response.data.data)
                    this.message = response.data.message
                } else {
                    this.message = message || error || 'Error desconocido'
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
                const { data } = response
                const { result, message, error } = data

                if (result) {
                    this.result = result
                    this.message = response.data.message
                } else {
                    this.message = message || error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al actualizar el alumno"
                this.result = false
                console.error('Error updating alumno: ', error)
            }
        },
        async updateEstado(idAlumno: number, newEstado: boolean) {
            try {
                const response = await api.put(`/alumno/cambiar-estado/${idAlumno}`, {
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
                console.error('Error updating alumno: ', error)
            }
        },
        async deleteAlumno(idAlumno: number) {
            try {
                const response = await api.delete(`/alumno/${idAlumno}`)
                const { data } = response
                const { result, message, error } = data

                if (result) {
                    this.result = result
                    this.alumnos = this.alumnos.filter((a) => a.id !== idAlumno)
                    this.message = message
                } else {
                    this.message = message || error || 'Error desconocido'
                }
            } catch (error) {
                this.message = 'Error al eliminar el alumno'
                this.result = false
                console.error('Error deleting alumno: ', error)
            }
        }
    }
})