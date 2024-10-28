export interface IEvento {
    id?: number
    id_parent?: number
    id_tipoevento?: number
    id_trabajador?: number
    titulo?: string
    titulo_url?: string
    precio?: number
    descripcion?: string
    modalidad?: string
    user_crea?: string
    user_actualiza?: string
    user_elimina?: string
    estado?: boolean
}