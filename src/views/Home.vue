<template>
  <div>
    <el-container>
      <el-header height="100px" class="header">
        欢迎使用订单系统
        <div>
          <el-dropdown>
                <span class="el-dropdown-link">
                        用户您好<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
              <el-dropdown-item @click.native="update">个人信息设置</el-dropdown-item>
              <el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu  class="el-menu-vertical-demo"
                    router
                    default-active="2"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
          >

            <!--                        <template v-for="(item,i) in adminmenu">-->
            <!--                            &lt;!&ndash;index 没有用但是必需字段且为 string &ndash;&gt;-->
            <!--                            <el-submenu :key="i" :index="i + ''" style="text-align: left">-->
            <!--                            <span slot="title" style="font-size: 17px;">-->
            <!--                                    {{item.name}}</span>-->
            <!--                                <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">-->
            <!--                                    {{ child.name }}-->
            <!--                                </el-menu-item>-->
            <!--                            </el-submenu>-->
            <!--                        </template>-->

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理模块</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Good/Goods">商品管理</el-menu-item>
                <!--                                <el-menu-item index="/User/Role">角色管理</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理模块</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Order/Orders">订单信息</el-menu-item>

              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>下单管理模块</span>
              </template>
              <el-menu-item-group>

                <el-menu-item index="/addOrder/addOrder">下单</el-menu-item>
                <el-menu-item index="/addOrder/MyOrder">我的订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",

    data(){
      return{

      }
    },
    mounted(){
    },
    methods:{
      logout(){
        this.loginUser =null;
        window.sessionStorage.setItem("LoginUser",null);
        this.$getRequest('/system/logout')
        this.$router.push("/")

      },

    }
  }
</script>

<style scoped>
  .header{
    background-color: #909399;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .aside{
    height: 870px;
    background-color: #545c64;
  }
  .el-menu-vertical-demo{
    width: 200px;
  }
</style>
