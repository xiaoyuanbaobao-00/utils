import { defineStore } from 'pinia';
import { ref } from 'vue';

// 面包屑导航存储
const usebreadcrumStore = defineStore('breadcrum', () => {
  // 定义面包屑导航
  const breadcrumPath = ref([
    { 
      path: '/', 
      label: '主页' 
    }
  ])
  
  // 移除不需要到面包屑导航
  const breadcrumPathSplice = (path: string) => {
    const index = breadcrumPath.value.findIndex(item => item.path === path);
    breadcrumPath.value.splice(index + 1);
  }

  // 添加新的面包屑导航
  const breadcrumPathPush = (obj:{ path: string, label: string }) => {
    breadcrumPath.value.push(obj);
  }

  return {
    breadcrumPath,
    breadcrumPathSplice,
    breadcrumPathPush
  }
})

export {
  usebreadcrumStore
}