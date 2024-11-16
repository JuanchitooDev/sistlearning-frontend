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
        error: null as string | null,
        message: ''
    }),
    actions: {
        async fetchCertificados() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/certificado')
                if (response.data.result) {
                    const certificados = response.data.data
                    this.certificados = certificados
                }
                // this.certificados = response.data.data
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

                console.log('response createCertificado', response)

                if (response.data.result) {
                    this.certificados.push(response.data.data)
                    this.message = response.data.message

                    const alumno = certificado.alumno as IAlumno
                    const nombreCompleto = alumno.nombre_capitalized as string
                    const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                    const fileName = `certificado_${sanitizedAlumno}.pdf`
                    const url = window.URL.createObjectURL(new Blob([response.data.data]))
                    const link = document.createElement('a')

                    link.href = url
                    link.setAttribute('download', fileName)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                } else {
                    // if (response.data.message) {
                    //     this.message = response.data.message
                    // } else {
                    //     this.message = response.data.console.error();
                    // }
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
            } catch (error) {
                this.message = "Error al crear el certificado"
                console.error('Error creating certificado', error)
            }
        },
        async getCertificadoById(id: number) {
            try {
                const response = await api.get(`/certificado/${id}`)
                if (response.data.result) {
                    const certificado = response.data.data
                    const index = this.certificados.findIndex((c) => c.id === certificado.id)
                    if (index !== -1) {
                        this.certificados[index] = certificado
                    } else {
                        this.certificados.push(certificado)
                    }
                    return certificado
                } else {
                    // if (response.data.message) {
                    //     this.message = response.data.message
                    // } else {
                    //     this.message = response.data.error
                    // }
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                    return null
                }
                // const certificado = response.data.data
                // const index = this.certificados.findIndex((c) => c.id === certificado.id)
                // if (index !== -1) {
                //     this.certificados[index] = certificado
                // } else {
                //     this.certificados.push(certificado)
                // }
                // return certificado
            } catch (error) {
                console.error(`Error al obtener el certificado: ${error}`)
                this.message = "Error al obtener el certificado"
                this.error = error instanceof Error ? error.message : 'Error desconocido'
            }
        },
        async getCertificadoByCodigo(codigo: string) {
            this.loading = true
            this.error = null
            try {
                const urlApi = `/certificado/codigo/${codigo}`
                const response = await api.get(urlApi)
                if (response.data.result) {
                    const certificado = response.data.data
                    const index = this.certificados.findIndex((c) => c.id === certificado.id)
                    if (index !== -1) {
                        this.certificados[index] = certificado
                    } else {
                        this.certificados.push(certificado)
                    }
                    this.certificado = certificado
                    return certificado
                } else {
                    // if (response.data.message) {
                    //     this.message = response.data.message
                    // } else {
                    //     this.message = response.data.error
                    // }
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                    return null
                }
                // this.certificado = response.data.data
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

                if (response.data.result) {
                    this.message = response.data.message
                    const certificado = await this.getCertificadoById(idCertificado) as ICertificado
                    const alumno = certificado.alumno
                    const nombreCompleto = alumno?.nombre_capitalized as string
                    const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                    const fileName = `certificado_${sanitizedAlumno}.pdf`

                    const url = window.URL.createObjectURL(new Blob([response.data.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${fileName}`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                } else {
                    // if (response.data.message) {
                    //     this.message = response.data.message
                    // } else {
                    //     this.message = response.data.console.error();
                    // }
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
                // const certificado = await this.getCertificadoById(idCertificado) as ICertificado
                // const alumno = certificado.alumno
                // const nombreCompleto = alumno?.nombre_capitalized as string
                // const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                // const fileName = `certificado_${sanitizedAlumno}.pdf`
                // const urlApi = `/certificado/${idCertificado}/download`
                // const response = await api.get(urlApi, {
                //     responseType: 'blob'
                // })
                // const url = window.URL.createObjectURL(new Blob([response.data]));
                // const link = document.createElement('a');
                // link.href = url;
                // link.setAttribute('download', `${fileName}`);
                // document.body.appendChild(link);
                // link.click();
                // link.remove();
            } catch (error) {
                this.message = "Error para descargar el certificado"
                console.error('Error downloading certificado', error)
            }
        },
        async updateCertificado(idCertificado: number, certificado: ICertificado) {
            try {
                const response = await api.put(`/certificado/${idCertificado}`, certificado, {
                    responseType: 'blob'
                })

                console.log('response updateCertificado', response)
                console.log('response updateCertificado data', response.data)

                if (response.data.result) {
                    this.message = response.data.message
                    this.certificados.push(response.data.data)
                    const alumno = await useAlumnoStore().getAlumnoById(certificado.id_alumno as number)
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
                } else {
                    // if (response.data.message) {
                    //     this.message = response.data.message
                    // } else {
                    //     this.message = response.data.console.error();
                    // }
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                }
                // const alumno = await useAlumnoStore().getAlumnoById(certificado.id_alumno as number)
                // const response = await api.put(`/certificado/${idCertificado}`, certificado, {
                //     responseType: 'blob'
                // })

                // this.certificados.push(response.data)

                // const nombreCompleto = alumno.nombre_capitalized as string
                // const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                // const fileName = `certificado_${sanitizedAlumno}.pdf`
                // const url = window.URL.createObjectURL(new Blob([response.data]))
                // const link = document.createElement('a')

                // link.href = url
                // link.setAttribute('download', fileName)
                // document.body.appendChild(link)
                // link.click()
                // link.remove()
            } catch (error) {
                this.message = "Error para actualizar el certificado"
                console.error('Error updating certificado: ', error)
            }
        },
        async deleteCertificado(idCertificado: number) {
            try {
                const response = await api.delete(`/certificado/${idCertificado}`)
                if (response.data.result) {
                    this.certificados = this.certificados.filter((c) => c.id !== idCertificado)
                    this.message = response.data.message
                } else {
                    if (response.data.message) {
                        this.message = response.data.message
                    } else {
                        this.message = response.data.error
                    }
                }
                // this.certificados = this.certificados.filter((c) => c.id !== idCertificado)
            } catch (error) {
                this.message = 'Error al eliminar el certificado'
                console.error('Error deleting certificado: ', error)
            }
        }
    }
})