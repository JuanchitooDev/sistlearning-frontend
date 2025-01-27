import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useReporteStore = defineStore('reporteStore', {
    state: () => ({
        loading: false,
        error: null as string | null,
        message: ''
    }),
    actions: {
        async downloadCumpleanios() {
            this.loading = true
            this.error = null
            try {
                const urlApi = `/reporte/alumnos-cumpleanios`
                const response = await api.get(urlApi, {
                    responseType: 'blob'
                })

                if (response.status === 200) {
                    this.message = "Reporte descargado correctamente"
                    const fileName = `listado_cumpleanios.xlsx`
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', `${fileName}`)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                } else {
                    this.message = "Error al descargar el certificado"
                }
            } catch (error) {
                this.message = "Error para descargar el listado de cumpleanios"
                console.error('Error downloading list birthday', error)
            }
        }
    }
})