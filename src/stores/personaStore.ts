import { defineStore } from 'pinia'
import api from '../utils/axios'
import { IPersona } from '../interfaces/personaInterface'

export const usePersonaStore = defineStore('personaStore', {
    state: () => ({
        personas: [] as IPersona[],
        persona: null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async getDocumentoInfo(idTipoDocumento: number, numeroDocumento: string) {
            try {
                const url = `/documento/infodoc/${idTipoDocumento}/numdoc/${numeroDocumento}`
                const response = await api.get(`${url}`)
                console.log('response data documento info', response)
                const persona = response.data.data

                // Actualiza la propiedad persona en el estado
                this.persona = persona
                
                const index = this.personas.findIndex((p) => p.id === persona.id)
                if (index !== -1) {
                    this.personas[index] = persona
                } else {
                    this.personas.push(persona)
                }
            } catch (error) {
                console.error(`Error al obtener la persona: ${error}`)
                this.error = error instanceof Error ? error.message : 'Error desconocido'
            }
        }
    }
})