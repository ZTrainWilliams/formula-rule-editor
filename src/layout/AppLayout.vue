<template>
  <el-container class="app-layout">
    <el-aside class="app-aside" width="200px"><Sidebar /></el-aside>
    <el-container class="app-main">
      <el-header class="app-header">
        <div class="user-info" @mouseover="userMenuShow = true" @mouseleave="userMenuShow = false">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar" />user
          <div v-show="userMenuShow" class="user-menu">
            <div class="user-menu-item" @click="logout">登出</div>
          </div>
        </div>
      </el-header>
      <el-main class="app-content"><RouterView /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/layout/Sidebar.vue';

export default defineComponent({
  name: 'Index',
  components: {
    Sidebar,
  },
  setup() {
    const router = useRouter();
    const userMenuShow = ref(false);

    const methods = {
      logout() {
        router.push({
          path: '/login',
        });
      },
    };

    return {
      userMenuShow,
      ...methods,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;
  background: #ffffff;
}

.app-aside {
  background: #2c3e50;
  color: #ecf0f1;
  border-right: 1px solid #bdc3c7;
}

.app-header {
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .user-info {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    padding: 0 12px;
    color: #2c3e50;
    font-weight: 500;
    transition: all 0.3s ease;
    
    img {
      margin-right: 10px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid #3498db;
    }
    
    .user-menu {
      min-width: 140px;
      position: absolute;
      padding: 8px 0;
      right: 0;
      top: calc(100% + 10px);
      text-align: center;
      font-size: 14px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      line-height: 36px;
      color: #2c3e50;
      z-index: 1000;
      
      .user-menu-item {
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: #f8f9fa;
          color: #3498db;
        }
      }
    }
    
    &:hover {
      background: #f8f9fa;
      transform: translateY(-1px);
    }
  }
}

.app-content {
  padding: 24px;
  overflow: auto;
  background: #fafafa;
}
</style>
