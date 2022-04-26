<template>
  <template v-for="child in route" :key="child.id">
    <el-submenu  :style="bgColor" :index="child.path" v-if="child.children">
      <template #title >
        <i :class="child.icon?child.icon:'el-icon-location'"></i>
        <span>{{ child.title }}</span>
      </template>
      <!--递归调用组件自身 -->
      <MenuItem :route="child.children"></MenuItem>
    </el-submenu>
    <el-menu-item  :index="child.path" v-else >
        <i :class="child.icon?child.icon:'el-icon-menu'"></i>
      <template #title>{{ child.title }}</template>
    </el-menu-item>
  </template>
</template>
<script>
import { ref,computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "MenuItem",
  props: {
    route: {
      type: Array,
    },
    bgColor:{
      type: Object,
    }
  },
  setup(props) {
     const store = useStore();
    const route = ref(props.route);
    return {
      navactive: computed(() => store.state.user.navactive),
      route,
    };
  },
};
</script>
