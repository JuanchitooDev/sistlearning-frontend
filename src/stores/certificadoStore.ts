import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ICertificado } from '../interfaces/certificadoInterface'
import { sanitizeFileName } from '@/utils/string.utils'
import { IAlumno } from '@/interfaces/alumnoInterface'
import { useAlumnoStore } from './alumnoStore'

export const useCertificadoStore = defineStore('certificadoStore', {
    state: () => ({
        certificados: [] as ICertificado[],
        certificado: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchCertificados() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/certificado')
                this.certificados = response.data.data
            } catch (error) {
                console.error('Error fetching certificados: ', error)
            } finally {
                this.loading = false
            }
        },
        async createCertificado(certificado: ICertificado) {
            try {
                const response = await api.post('/certificado', certificado, {
                    responseType: 'blob'
                })

                this.certificados.push(response.data)

                const alumno = certificado.alumno as IAlumno
                const nombreCompleto = alumno.nombre_capitalized as string
                const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                const fileName = `certificado_${sanitizedAlumno}.pdf`
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')

                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.remove()
            } catch (error) {
                console.error('Error creating certificado', error)
            }
        },
        async getCertificadoById(id: number) {
            try {
                const response = await api.get(`/certificado/${id}`)
                const certificado = response.data.data
                const index = this.certificados.findIndex((c) => c.id === certificado.id)
                if (index !== -1) {
                    this.certificados[index] = certificado
                } else {
                    this.certificados.push(certificado)
                }
                return certificado
            } catch (error) {
                console.error(`Error al obtener el certificado: ${error}`)
                this.error = error instanceof Error ? error.message : 'Error desconocido'
            }
        },
        async getCertificadoByCodigo(codigo: string) {
            this.loading = true
            this.error = null
            try {
                const urlApi = `/certificado/codigo/${codigo}`
                const response = await api.get(urlApi)
                this.certificado = response.data.data
            } catch (error) {
                console.error('Error al obtener el certificado: ', error)
                this.error = 'Error al obtener el certificado'
            }
        },
        async downloadCertificado(idCertificado: number) {
            try {
                const certificado = await this.getCertificadoById(idCertificado) as ICertificado
                const alumno = certificado.alumno
                const nombreCompleto = alumno?.nombre_capitalized as string
                const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                const fileName = `certificado_${sanitizedAlumno}.pdf`
                const urlApi = `/certificado/${idCertificado}/download`
                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${fileName}`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                console.error('Error downloading certificado', error)
            }
        },
        async updateCertificado(idCertificado: number, certificado: ICertificado) {
            try {
                const alumno = await useAlumnoStore().getAlumnoById(certificado.id_alumno as number)
                const response = await api.put(`/certificado/${idCertificado}`, certificado, {
                    responseType: 'blob'
                })

                this.certificados.push(response.data)

                const nombreCompleto = alumno.nombre_capitalized as string
                const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                const fileName = `certificado_${sanitizedAlumno}.pdf`
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')

                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.remove()
            } catch (error) {
                console.error('Error updating certificado: ', error)
            }
        },
        async deleteCertificado(idCertificado: number) {
            try {
                await api.delete(`/certificado/${idCertificado}`)
                this.certificados = this.certificados.filter((c) => c.id !== idCertificado)
            } catch (error) {
                console.error('Error deleting certificado: ', error)
            }
        }
    }
})