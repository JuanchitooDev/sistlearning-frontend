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
        message: '',
        result: false
    }),
    actions: {
        async fetchCertificados() {
            this.loading = true
            this.error = null

            try {
                const response = await api.get('/certificado')
                const { data } = response
                const { result } = data
                
                if (result) {
                    const certificados = data.data.map((c: any) => ({
                        ...c,
                        alumno: c.Alumno,
                        evento: c.Evento
                    }))
                    this.result = result
                    this.certificados = certificados
                }
            } catch (error) {
                this.result = false
                console.error('Error fetching certificados: ', error)
            } finally {
                this.loading = false
            }
        },
        async fetchCertificadosByAlumno() {
            this.loading = true
            this.error = null

            try {
                let idLogueado = null

                const auth = JSON.parse(localStorage.getItem('auth') || '{}')
                const { usuario } = auth
                console.log('usuario fetchCertificadosByAlumno', usuario)

                const { id_alumno, id_instructor, id_trabajador, id_perfil } = usuario

                if (id_perfil === 2) {
                    idLogueado = id_alumno
                } else if (id_perfil === 3) {
                    idLogueado = id_instructor
                }

                const response = await api.get(`/certificado/alumno`, {
                    params: {
                        id_alumno: idLogueado
                    }
                })

                console.log('response fetchCertificadosByAlumno', response)

                const { data } = response

                const { result } = data

                if (result) {
                    this.certificados = data.data.map((c: any) => ({
                        ...c,
                        alumno: c.Alumno,
                        evento: c.Evento
                    }))

                    this.result = result
                    this.message = 'Certificados obtenidos correctamente'
                } else {
                    this.result = false
                    this.message = data.message || 'Error al obtener certificados'
                }

            } catch (error) {
                this.result = false
                this.message = 'Error al obtener certificados por alumno'
                console.error('Error fetching certificados bu alumno', error)
            } finally {
                this.loading = false
            }
        },
        async createCertificado(certificado: ICertificado) {
            try {
                const response = await api.post(`/certificado`, certificado, {
                    responseType: 'blob'
                })

                console.log('response createCertificado', response)
                const { status, data } = response

                if (status === 200) {
                    this.result = true
                    this.message = "Certificado registrado correctamente"
                    this.certificados.push(certificado)

                    const alumno = certificado.alumno as IAlumno
                    const nombreCompleto = alumno.nombre_capitalized as string
                    const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                    const fileName = `certificado_${sanitizedAlumno}.pdf`
                    const url = window.URL.createObjectURL(new Blob([data]))
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
                const { data } = response
                const { message, error } = data
                if (response.data.result) {
                    const certificado = data.data
                    const index = this.certificados.findIndex((c) => c.id === certificado.id)
                    
                    if (index !== -1) {
                        this.certificados[index] = certificado
                    } else {
                        this.certificados.push(certificado)
                    }

                    this.certificado = certificado
                    return certificado
                } else {
                    this.message = message || error || 'Error desconocido'
                    return null
                }
            } catch (error) {
                this.result = false
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
                const { data } = response
                const { result, message, error } = data
            
                if (result) {
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
                    this.message = message || error || 'Error desconocido'
                    return null
                }
            } catch (error) {
                this.result = false
                this.error = 'Error al obtener el certificado'
            }
        },
        async downloadCertificado(idCertificado: number) {
            try {
                const urlApi = `/certificado/${idCertificado}/download`

                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })

                const { status, data } = response

                if (status === 200) {
                    this.result = true
                    this.message = "Certificado descargado correctamente"
                    
                    const responseCertificado = await this.getCertificadoById(idCertificado)
                    const alumno = responseCertificado.Alumno
                    const nombreCompleto = alumno?.nombre_capitalized as string
                    const sanitizedAlumno = sanitizeFileName(nombreCompleto)
                    const fileName = `certificado_${sanitizedAlumno}.pdf`

                    const url = window.URL.createObjectURL(new Blob([data]));
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
                const response = await api.put(`/certificado/${idCertificado}`, certificado, {
                    responseType: 'blob'
                })

                console.log('response updateCertificado', response)
                const { status, data } = response

                if (status == 200) {
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
                    const url = window.URL.createObjectURL(new Blob([data]))
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
        async updateEstado(idCertificado: number, newEstado: boolean) {
            try {
                const response = await api.put(`/certificado/cambiar-estado/${idCertificado}`, {
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
                console.error('Error updating certificado: ', error)
            }
        },
        async deleteCertificado(idCertificado: number) {
            try {
                const response = await api.delete(`/certificado/${idCertificado}`)
                const { data } = response
                const { result, message, error } = data

                if (result) {
                    this.result = result
                    this.certificados = this.certificados.filter((c) => c.id !== idCertificado)
                    this.message = message
                } else {
                    if (message) {
                        this.message = message
                    } else {
                        this.message = error
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