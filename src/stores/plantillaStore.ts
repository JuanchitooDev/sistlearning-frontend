import { defineStore } from 'pinia'

export const usePlantillaStore = defineStore('plantillaStore', {
    state: () => ({
        plantillas: [
            {
                id: 'plantilla_a',
                titulo: 'Plantilla A',
                imagen: `plantilla_a.png`
            },
            {
                id: 'plantilla_b',
                titulo: 'Plantilla B',
                imagen: `plantilla_b.png`
            },
            {
                id: 'plantilla_c',
                titulo: 'Plantilla C',
                imagen: `plantilla_c.png`
            },
            {
                id: 'plantilla_d',
                titulo: 'Plantilla D',
                imagen: `plantilla_d.png`
            },
            {
                id: 'plantilla_e',
                titulo: 'Plantilla E',
                imagen: `plantilla_e.png`
            },
            {
                id: 'plantilla_f',
                titulo: 'Plantilla F',
                imagen: `plantilla_f.png`
            },
            {
                id: 'plantilla_g',
                titulo: 'Plantilla G',
                imagen: `plantilla_g.png`
            },
            {
                id: 'congreso_internacional_cuy_2025',
                titulo: 'Plantilla Congreso Internacional Cuy 2025',
                imagen: `congreso_internacional_cuy_2025.png`
            }
        ]
    }),
    getters: {
        getById: (state) => (id: number) => state.plantillas.find(p => (+p.id) === id)
    }
})