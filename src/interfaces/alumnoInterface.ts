export interface IAlumno {
    id?: number
    id_tipodocumento?: number
    apellido_paterno?: string
    apellido_materno?: string
    nombres?: string
    telefono?: string
    direccion?: string
    email?: string
    fecha_nacimiento?: Date
    sexo?: string
    user_crea?: string
    user_actualiza?: string
    user_elimina?: string
    sistema?: boolean
    estado?: boolean
}