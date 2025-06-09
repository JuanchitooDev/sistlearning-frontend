import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

export const usePlantillaStore = defineStore('plantillaStore', {
    state: () => ({
        plantillas: [
            {
                id: 'plantilla_a',
                titulo: 'Plantilla A',
                imagen: `${BASE_URL}/img/plantillas/plantilla_a.png`
            },
            {
                id: 'plantilla_b',
                titulo: 'Plantilla B',
                imagen: `${BASE_URL}/img/plantillas/plantilla_b.png`
            },
            {
                id: 'plantilla_c',
                titulo: 'Plantilla C',
                imagen: `${BASE_URL}/img/plantillas/plantilla_c.png`
            },
            {
                id: 'plantilla_d',
                titulo: 'Plantilla D',
                imagen: `${BASE_URL}/img/plantillas/plantilla_d.png`
            },
            {
                id: 'plantilla_e',
                titulo: 'Plantilla E',
                imagen: `${BASE_URL}/img/plantillas/plantilla_e.png`
            },
            {
                id: 'plantilla_f',
                titulo: 'Plantilla F',
                imagen: `${BASE_URL}/img/plantillas/plantilla_f.png`
            },
            {
                id: 'plantilla_g',
                titulo: 'Plantilla G',
                imagen: `${BASE_URL}/img/plantillas/plantilla_g.png`
            }
        ]
    }),
    getters: {
        getById: (state) => (id: number) => state.plantillas.find(p => (+p.id) === id)
    }
})