import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/NotLogged/Login'
import Base from '../views/NotLogged/Base'
import Register from '../views/NotLogged/Register'
import LBase from '../views/Logged/Base'
import Information     from '../views/Logged/Information'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name:'Base',
    component: Base,
    children:[
      {
        path: '/Login',
        name: '',
        component:Login
      },{
      path: '/Register',
        name:'',
        component: Register,
      }
    ]
  },
  {
    path: '/LBase',
    name: 'LBase',
    component: LBase,
    children:[
      {
        path: '/Information',
        name: '',
        component:Information
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
