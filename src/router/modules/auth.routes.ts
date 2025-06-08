import LoginView from "@/views/Account/Login.vue"

export default [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { title: 'Login' }
    }
]