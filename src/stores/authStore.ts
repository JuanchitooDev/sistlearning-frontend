import { defineStore } from 'pinia'
import { router } from '@/router'
import { IAuth } from '@/interfaces/authInterface'
import api from '../utils/axios'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        usuario: {
            id: null,
            id_alumno: null,
            id_instructor: null,
            id_trabajador: null,
            id_perfil: null,
            username: '',
            usuario: '',
            slug_perfil: '',
            nombre_perfil: ''
        },
        returnUrl: null as string | null,
        error: null as string | null,
        message: '',
        result: false
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const userAgent = "web"

                const authItem: IAuth = {
                    username,
                    password,
                    userAgent
                }

                const response = await api.post('/auth/login', authItem)

                const { data } = response

                const { result, message, token } = data

                if (result) {

                    this.result = result

                    const {
                        id,
                        idAlumno,
                        idInstructor,
                        idPerfil,
                        idTrabajador,
                        nombrePerfil,
                        slugPerfil,
                        username,
                        usuario
                    } = data.usuario

                    this.usuario.id = id
                    this.usuario.id_alumno = idAlumno
                    this.usuario.id_instructor = idInstructor
                    this.usuario.id_trabajador = idTrabajador
                    this.usuario.id_perfil = idPerfil
                    this.usuario.nombre_perfil = nombrePerfil
                    this.usuario.slug_perfil = slugPerfil
                    this.usuario.username = username
                    this.usuario.usuario = usuario

                    const dataLogin = {
                        token,
                        usuario: this.usuario
                    }

                    const urlRedireccion = (slugPerfil === 'estudiante' || slugPerfil === 'instructor')
                        ? '/certificado'
                        : '/dashboard'

                    // this.usuario = usuario
                    // Object.assign(this.usuario, usuario)
                    this.message = message
                    localStorage.setItem('auth', JSON.stringify(dataLogin))
                    router.push(this.returnUrl || urlRedireccion)
                } else {
                    this.message = message || data.error || 'Error desconocido'
                }

            } catch (error) {
                this.message = 'Error de autenticación'
                this.result = false
                console.error('Error de autenticación: ', error)
            }
        },

        logout() {
            this.usuario = {
                id: null,
                id_alumno: null,
                id_instructor: null,
                id_trabajador: null,
                id_perfil: null,
                username: '',
                usuario: '',
                slug_perfil: '',
                nombre_perfil: ''
            }
            this.message = '¡Cierre de sesión exitosa'
            this.result = true
            localStorage.removeItem('auth')
            router.push('/login')
        }
    }
})