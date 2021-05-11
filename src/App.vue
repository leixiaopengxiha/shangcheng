<template>
  <div class="skto" v-if="!appState">
    <div class="skto-box">
      <el-skeleton v-if="data.isshow" :rows="16" animated />
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
<script>
import { onMounted, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let data = reactive({
      isshow: true,
    });
    onMounted(() => {
      //  let _this = this;
      if (typeof document.addEventListener === "undefined") {
        console.error("浏览器不支持addEventListener,请升级");
      } else {
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState == "hidden") {
            console.log('visibilitychange___-----')
            // _this.sendCurVideoTime(localStorage.getItem("webviewDuration"));
          }
        });
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("navactive",store.state.navactive);
        });
      }
      let LoginSts = sessionStorage.getItem("LoginSt");
      if (!LoginSts) {
        LoginSts = 1;
      }
      let userList = JSON.parse(sessionStorage.getItem("userList"));
      if (userList) {
        store.dispatch("UserList", userList);
      }
      store.dispatch("LoginSt", LoginSts);
      setTimeout(()=>{
        if (store.state.loginSt == 1) {
          store.dispatch("RouterPath", "/main");
          router.push("/login");
        } else {
          if (route.path == "/404") {
            store.dispatch("RouterPath", "/main");
          } else {
            store.dispatch("RouterPath", route.path);
          }
          router.push("/main");
        }
      },600)
    });
    return {
      data,
      appState:computed(() => store.state.appState)
    };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
ul {
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.skto {
  height: 100vh;
  margin: auto;
  padding: 30px;
  box-sizing: border-box;
  overflow: hidden;
}
.skto-box {
  // top:50%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.cascader-box{
    width: 100%;
}
.bullet-frame {
  width: 100vw;
  height: 100vh;
  background: rgba(000, 000, 000, 0.3);
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 100;
}
</style>
