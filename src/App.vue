<template>
  <AppLayout v-if="$route.name && $route.name !== 'Login'" />
  <RouterView v-else />
</template>

<script>
import { defineComponent } from 'vue';
import AppLayout from '@/layout/AppLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
  },
});
</script>
<style src="./assets/css/reset.css"></style>
<style>
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: hsla(220, 4%, 58%, 0.3);
}
</style>
