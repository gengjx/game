import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/customer/NotLogged/Login'
import Base from '../views/customer/NotLogged/Base'
import Register from '../views/customer/NotLogged/Register'
import LBase from '../views/customer/Logged/Base'
import Information     from '../views/customer/Logged/Information'
import ALogin from '../views/admin/Login'
import Ahome  from "../views/admin/Ahome";
import loginLog from "../components/Log/loginLog";
import operLog from "../components/Log/operLog";
import User  from "../components/User/User";
import dept from  '../components/Dept/index';
import post from '../components/post/index';
import Menu from '../components/Menu/index';
import role from '../components/role/index';
import homeIndex from '../components/home/index';
import gameIndex from '../components/game/index';
import consolelist from '../components/game/list';
import News from '../components/News/index'
import Newslist from '../components/News/list'
import  NewsDetail from '../components/News/NewsDetil'
import  NewsDetailNot from '../components/News/NewsDetilNot'
import  NewsCommentindex from '../components/comment/index'
import  ConsoleCommentindex from '../components/comment/consoleindex'
import  GameDetail from '../components/game/GameDetail'
import   GameDetailNot  from '../components/game/GameDetailNot'
import  index from '../views/customer/NotLogged/index'
import  Lindex from '../views/customer/Logged/index'
import GameMethod from '../views/customer/NotLogged/GameMethod'
import GameEvaluateNot from '../views/customer/NotLogged/GameEvaluateNot'
import GameNewsNot from '../views/customer/NotLogged/GameNewsNot'
import GameMethodIndex from '../views/customer/Logged/GameMethod'
import GameEvaluate  from "../views/customer/Logged/GameEvaluate";
import GameNews from "../views/customer/Logged/GameNews";
import GameList from '../views/customer/Logged/GameList';
import GameListNot from  '../views/customer/NotLogged/GameList'
import MyFavorite from "../views/customer/Logged/MyFavorite";
import SearchIndex from "../views/customer/Logged/SearchIndex";
import CommentSearch from '../components/game/CommentSearch'
import NewsCommentSearch from '../components/News/NewsCommentSearch'
import Tuijian from "../views/customer/Logged/Tuijian";
import go from "../views/customer/Logged/go";
import JuLeBu from "../components/game/JuLeBu";
import JuLeBuNot from "../components/game/JuLeBuNot";
import JuLeBuIndex from "../views/customer/Logged/JuLeBuIndex";
import Dict from '../components/dict/index'
import Data from '../components/dict/data'
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
      },{
        path: '/game/gameDetail/not',
        name: GameDetailNot,
        component: GameDetailNot
      },
      {
        path: '/index',
        name: index,
        component: index
      },
      {
        path: '/News/NewDetail/Not',
        name: NewsDetailNot,
        component: NewsDetailNot
      },
      {
        path: '/Not/GameMethod',
        name: GameMethod,
        component: GameMethod

      },{

        path: '/Not/GameEvaluateNot',
        name: GameEvaluateNot,
        component: GameEvaluateNot
      },{

        path: '/Not/GameNewsNot',
        name: GameNewsNot,
        component: GameNewsNot
      },{
        path: '/GameListNot',
        name: GameListNot,
        component: GameListNot
      },
      {
        path: '/JuLeBuNot',
        name: JuLeBuNot,
        component: JuLeBuNot
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
      },
      {
        path: '/News/NewDetail',
        name: NewsDetail,
        component: NewsDetail
      },
      {
        path: '/game/gameDetail',
        name: GameDetail,
        component: GameDetail
      },
      {
        path: '/L/index',
        name: Lindex,
        component: Lindex
      },{
        path: '/GameMethod',
        name: GameMethodIndex,
        component: GameMethodIndex
      },
      {
        path: '/GameEvaluate',
        name: GameEvaluate,
        component: GameEvaluate
      },{
        path: '/GameNews',
        name: GameNews,
        component: GameNews
      },
      {
        path: '/GameList',
        name: GameList,
        component: GameList
      },{
        path: '/MyFavorite',
        name: MyFavorite,
        component: MyFavorite
      }
      ,{
        path: '/SearchIndex',
        name: SearchIndex,
        component: SearchIndex,
      }
      ,{
        path: '/CommentSearch',
        name: CommentSearch,
        component: CommentSearch
      },{
        path: '/NewsCommentSearch',
        name: NewsCommentSearch,
        component: NewsCommentSearch
      },{
        path: '/Tuijian',
        name: Tuijian,
        component: Tuijian
      },{
        path: '/go',
        name: go,
        component: go
      },{
        path: '/JuLeBu',
        name: JuLeBu,
        component: JuLeBu

      },{
        path: '/JuLeBuIndex',
        name: JuLeBuIndex,
        component: JuLeBuIndex,
      }

    ]
  },
  {
    path: '/ALogin',
    name: ALogin,
    component: ALogin

  },
  {
    path: '/Ahome',
    name: Ahome,
    component: Ahome,
    children: [
      {
        path: '/Log/loginLog',
        name: loginLog,
        component:loginLog
      },
      {
        path: '/Log/operLog',
        name: operLog,
        component:operLog

      },{
        path: '/User/index',
        name: User,
        component: User

      },{
        path: '/dept/index',
        name: dept,
        component: dept
      },
      {
        path: '/post/index',
        name: post,
        component: post
      },

      {
        path:'/menu/index',
        name: Menu,
        component: Menu
      },{
        path: '/role/index',
        name: role,
        component: role
      },{
        path: '/home/index',
        name: homeIndex,
        component: homeIndex
      },{
        path: '/game/index',
        name: gameIndex,
        component: gameIndex
      },{
        path: '/game/list',
        name: consolelist,
        component: consolelist
      },
      {
        path: '/News/list',
        name:News,
        component: News
      },
      {
        path: '/News/index',
        name: Newslist,
        component: Newslist
      },
      {
        path: '/news/comment/index',
        name: NewsCommentindex,
        component: NewsCommentindex
      },{
        path: '/console/comment/index',
        name: ConsoleCommentindex,
        component: ConsoleCommentindex
      },{
        path: '/dict/index',
        component: Dict,
        name: Dict
      },
      ,{
        path: '/dict/type/data/',
        component: Data,
        name: Data
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
