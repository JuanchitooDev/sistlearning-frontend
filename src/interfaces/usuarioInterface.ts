import { IPerfil } from "./perfilInterface"
import { ITrabajador } from "./trabajadorInterface"
import { IInstructor } from './instructorInterface'
import { IAlumno } from './alumnoInterface'

export interface IUsuario {
    id?: number
    id_trabajador?: number
    id_perfil?: number
    id_instructor?: number
    id_alumno?: number
    username?: string
    password?: string
    token?: string
    fecha_sesion?: Date
    user_crea?: string
    user_actualiza?: string
    user_elimina?: string
    estado?: boolean
    trabajador?: ITrabajador
    perfil?: IPerfil
    instructor?: IInstructor
    alumno?: IAlumno
}