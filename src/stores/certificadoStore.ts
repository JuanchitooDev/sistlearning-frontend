import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ICertificado } from '../interfaces/certificadoInterface'
import { sanitizeFileName } from '@/utils/string.utils'
import { IAlumno } from '@/interfaces/alumnoInterface'

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
                console.log('fileName', fileName)

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
                const urlApi = `/certificado/${idCertificado}/download`
                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `certificado_${idCertificado}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                console.error('Error downloading certificado', error)
            }
        },
        async updateCertificado(idCertificado: number, certificado: ICertificado) {
            try {
                await api.put(`/certificado/${idCertificado}`, certificado)
                const index = this.certificados.findIndex((c) => c.id === certificado.id)
                if (index !== -1) {
                    this.certificados[index] = certificado
                }
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