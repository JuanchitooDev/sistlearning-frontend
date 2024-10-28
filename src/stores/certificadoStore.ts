import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useCertificadoStore = defineStore('certificadoStore', {
    state: () => ({
        certificados: null,
        certificado: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async createCertificado(alumno: String, curso: String) {
            try {
                const response = await api.post('/certificado', {
                    nombreAlumno: alumno,
                    nombreCurso: curso
                }, {
                    responseType: 'blob'
                })

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'certificado.pdf')
                document.body.appendChild(link)
                link.click()
                link.remove()
            } catch(error) {
                console.error('Error generando el certificado', error)
            }
        }
    }
})