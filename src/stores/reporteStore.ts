import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useReporteStore = defineStore('reporteStore', {
    state: () => ({
        loading: false,
        error: null as string | null,
        message: '',
        result: false
    }),
    actions: {
        async downloadCumpleaniosExcel() {
            this.loading = true
            this.error = null

            try {
                const urlApi = `/reporte/alumnos-cumpleanios`

                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })

                const { status, data } = response

                if (status === 200) {
                    this.result = true
                    this.message = "Reporte descargado correctamente"

                    const fileName = `listado-cumpleanios.xlsx`
                    const url = window.URL.createObjectURL(new Blob([data]))
                    const link = document.createElement('a')

                    link.href = url
                    link.setAttribute('download', `${fileName}`)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                } else {
                    this.result = false
                    this.message = "Error al descargar el listado de cumpleaños"
                }
            } catch (error) {
                this.result = false
                this.message = "Error para descargar el listado de cumpleaños"
                console.error('Error para descargar el listado de cumpleaños', error)
            }
        },
        async downloadAlumnosExcel() {
            this.loading = true
            this.error = null

            try {
                const urlApi = `/reporte/alumnos`

                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })

                const { status, data } = response

                if (status === 200) {
                    this.result = true
                    this.message = "Reporte descargado correctamente"

                    const fileName = `listado-alumnos.xlsx`
                    const url = window.URL.createObjectURL(new Blob([data]))
                    const link = document.createElement('a')

                    link.href = url
                    link.setAttribute('download', `${fileName}`)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                } else {
                    this.result = false
                    this.message = "Error al descargar el listado de alumnos"
                }
            } catch (error) {
                this.result = false
                this.message = "Error para descargar el listado de alumnos"
                console.error('Error para descargar el listado de alumnos', error)
            }
        },
        async downloadPersonasExcel() {
            this.loading = true
            this.error = null

            try {
                const urlApi = `/reporte/personas`

                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })

                const { status, data } = response

                if (status === 200) {
                    this.result = true
                    this.message = "Reporte descargado correctamente"

                    const fileName = `listado-personas.xlsx`
                    const url = window.URL.createObjectURL(new Blob([data]))
                    const link = document.createElement('a')

                    link.href = url
                    link.setAttribute('download', `${fileName}`)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                } else {
                    this.result = false
                    this.message = "Error al descargar el listado de personas"
                }
            } catch (error) {
                this.result = false
                this.message = "Error para descargar el listado de personas"
                console.error('Error para descargar el listado de personas', error)
            }
        }
    }
})