import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Base from '../views/Base'
import Register from '../views/Register'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
