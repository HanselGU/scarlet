<template>
  <div id="app">
    <MyHeader></MyHeader>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- <MyFooter
      v-show="$route.path !== '/login' && $route.path !== '/register'"
    ></MyFooter> -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./components/Header/index";
import MyFooter from "./components/Footer/index";

export default {
  name: "App",
  components: { MyHeader, MyFooter },
  mounted() {
    //获取商品分类的三级列表
    this.$store.dispatch("categoryList");
    this.$store.dispatch("getUserInfo");
  },
};
</script>

<style>
</style>