export interface ITrabajador {
    id?: number
    id_perfil?: number
    id_tipodocumento?: number
    numero_documento?: string
    apellido_paterno?: string
    apellido_materno?: string
    nombres?: string
    telefono?: string
    direccion?: string
    email?: string
    linkedin?: string
    fecha_nacimiento?: Date
    biografia?: string
    sexo?: string
    firma?: string
    foto_perfil?: string
    user_crea?: string
    user_actualiza?: string
    user_elimina?: string
    sistema?: boolean
    estado?: boolean
}