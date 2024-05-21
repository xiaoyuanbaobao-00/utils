<template>
    <el-container style="height: calc(100vh - 35px)">
        <!-- 左侧菜单 -->
        <el-menu default-active="2" :collapse="isCollapse" class="select-no">
            <el-menu-item index="1" @click="isCollapse = !isCollapse" readonly>
                    <el-icon>
                        <Operation />
                    </el-icon>
                    <span>收起</span>
                </el-menu-item>
                <el-menu-item v-for="(item, index) in menuTables" :key="item.label" :index="String(2 + index)"
                    @click="routerHref(item.path, item.anchor)">
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <template #title>{{ item.label }}</template>
            </el-menu-item>
        </el-menu>
        <el-main>
            <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb-box select-no">
                <el-breadcrumb-item v-for="item in breadcrumStore.breadcrumPath" :to="{ path: item.path }" @click="breadcrumStore.breadcrumPathSplice(item.path)">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="main-box">
                <router-view></router-view>
            </div>
        </el-main>
        <el-backtop :right="100" :bottom="100" />
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { menuTables } from '@/utils/data/menu'
import { ArrowRight } from '@element-plus/icons-vue'
import router from '@/router';
import { usebreadcrumStore } from '@/store/index'

// 菜单栏折叠
let isCollapse = ref(false);

const breadcrumStore = usebreadcrumStore();

onMounted(() => {
    if (location.hash) {
        scrollToAnchor(location.hash.substring(1));
    }
})

// 菜单栏点击
function routerHref(path: string, anchor: string) {
    breadcrumStore.breadcrumPathSplice('/');
    router.push(path + '#' + anchor);
    scrollToAnchor(anchor);
}

// 滚动到锚点位置
function scrollToAnchor(anchor: string) {
    const mainNode = document.querySelector(".feature");
    if (mainNode) {
        let node = document.getElementById(anchor);
        if (node) {
            mainNode.scrollTo({
                top: node.offsetTop - 55,
                behavior: 'smooth'
            });
        }
    }
}

</script>

<style lang="scss" scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.breadcrumb-box {
    font-size: 20px;
    white-space: nowrap;
    padding: 10px 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #DCDFE6;
}

::v-deep(.el-main) {
    padding: 0;
}
.main-box {
    height: calc(100% - 60px);
    padding: 0 20px;
}

::v-deep(.panel) {
    height: 100%;
    overflow: hidden;
    h2 {
        color: #606266;
        padding: 15px 0;
        padding-left: 20px;
        user-select: none;
        white-space: nowrap;
    }
}
</style>