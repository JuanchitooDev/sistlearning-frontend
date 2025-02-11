import { defineStore } from 'pinia'
import api from '../utils/axios'
import { ICertificado } from '../interfaces/certificadoInterface'
import { sanitizeFileName } from '@/utils/string.utils'
import { IAlumno } from '@/interfaces/alumnoInterface'
import { useAlumnoStore } from './alumnoStore'
import { useEventoStore } from './eventoStore'
import { IEvento } from '@/interfaces/eventoInterface'

export const useCertificadoStore = defineStore('certificadoStore', {
    state: () => ({
        certificados: [] as ICertificado[],
        certificado: null,
        loading: false,
        error: null as string | null,
        message: '',
        result: false
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
            } catch (error) {
                console.error('Error fetching certificados: ', error)
            } finally {
                this.loading = false
            }
        },
        async createCertificado(certificado: ICertificado) {
            try {
                const eventoStore = useEventoStore()
                await eventoStore.getEventoById(certificado.id_evento as number)
                const evento = eventoStore.evento as IEvento | null

                if (!evento) {
                    this.result = false
                    this.message = 'Error al obtener el evento'
                    return
                }

                certificado.templateName = evento.plantilla_certificado

                const response = await api.post(`/certificado`, certificado, {
                    responseType: 'blob'
                })

                console.log('response createCertificado', response)

                if (response.status === 200) {
                    this.result = true
                    this.message = "Certificado registrado correctamente"
                    this.certificados.push(certificado)

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
                } else {
                    this.result = false
                    this.message = 'Error al crear el certificado'
                }
            } catch (error) {
                this.result = false
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
                    this.certificado = certificado
                    return certificado
                } else {
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                    return null
                }
            } catch (error) {
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
                    this.message = response.data.message || response.data.error || 'Error desconocido'
                    return null
                }
            } catch (error) {
                this.error = 'Error al obtener el certificado'
            }
        },
        async downloadCertificado(idCertificado: number) {
            try {
                const urlApi = `/certificado/${idCertificado}/download`

                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })

                if (response.status === 200) {
                    this.result = true
                    this.message = "Certificado descargado correctamente"
                    const responseCertificado = await this.getCertificadoById(idCertificado)
                    const alumno = responseCertificado.Alumno
                    const nombreCompleto = alumno?.nombre_capitalized as string
                    const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                    const fileName = `certificado_${sanitizedAlumno}.pdf`

                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${fileName}`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                } else {
                    this.result = false
                    this.message = "Error al descargar el certificado"
                }
            } catch (error) {
                this.result = false
                this.message = "Error para descargar el certificado"
                console.error('Error downloading certificado', error)
            }
        },
        async updateCertificado(idCertificado: number, certificado: ICertificado) {
            try {
                const eventoStore = useEventoStore()
                await eventoStore.getEventoById(certificado.id_evento as number)
                const evento = eventoStore.evento as IEvento | null

                if (!evento) {
                    this.result = false
                    this.message = 'Error al obtener el evento'
                    return
                }

                certificado.templateName = evento.plantilla_certificado
                
                console.log('certificado', certificado)
                const response = await api.put(`/certificado/${idCertificado}`, certificado, {
                    responseType: 'blob'
                })

                console.log('response updateCertificado', response)

                if (response.status == 200) {
                    this.result = true
                    this.message = "Certificado actualizado con éxito"
                    this.certificados.push(certificado)

                    const storeAlumno = useAlumnoStore()

                    await storeAlumno.getAlumnoById(certificado.id_alumno as number)
                    const alumno = storeAlumno.alumno as IAlumno | null
                    console.log('alumno', alumno)
                    const nombreCompleto = alumno?.nombre_capitalized as string
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
                    this.result = false
                    this.message = "Error al actualizar el certificado"
                }
            } catch (error) {
                this.result = false
                this.message = "Error al actualizar el certificado"
                console.error('Error updating certificado: ', error)
            }
        },
        async deleteCertificado(idCertificado: number) {
            try {
                const response = await api.delete(`/certificado/${idCertificado}`)
                this.result = response.data.result
                if (this.result) {
                    this.certificados = this.certificados.filter((c) => c.id !== idCertificado)
                    this.message = response.data.message
                } else {
                    if (response.data.message) {
                        this.message = response.data.message
                    } else {
                        this.message = response.data.error
                    }
                }
            } catch (error) {
                this.result = false
                this.message = 'Error al eliminar el certificado'
                console.error('Error deleting certificado: ', error)
            }
        }
    }
})