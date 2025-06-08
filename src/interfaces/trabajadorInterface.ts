import { ITipoDocumento } from './tipoDocumentoInterface'
import { ICargo } from './cargoInterface'

export interface ITrabajador {
    id?: number
    id_cargo?: number
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
    tipoDocumento?: ITipoDocumento
    cargo?: ICargo
}