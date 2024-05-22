<template>
    <div class="toolbar">
        <div v-for="(item, index) in MenuTables" :id="item.anchor" :key="index">
            <h4 class="title">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.label }}</span>
            </h4>
            <div class="context">
                <div class="toolbar-item" v-for="children in item.children" :key="children.key"
                    @click="childrenRouter(children.path, children.label)">
                    <el-icon>
                        <component :is="children.icon"></component>
                    </el-icon>
                    <span>{{ children.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MenuTables from '@/utils/data/Menu'
import router from '@/router';
import { usebreadcrumStore } from '@/store/index'

const breadcrumStore = usebreadcrumStore();
function childrenRouter(path: string, label: string) {
    breadcrumStore.breadcrumPathPush({ path, label })
    router.push(path);
}

</script>

<style scoped lang="scss">
.toolbar {
    --padding-edge-fifteen: 15px;

    &>div {
        transition: var(--shadow-transition);
        padding: var(--padding-edge-fifteen) 25px;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    &>div:hover {
        box-shadow: var(--box-shadow);
    }

    &>div:nth-last-child(1) {
        margin-bottom: 0;
    }

    .title {
        display: flex;
        align-items: center;
        padding-bottom: var(--padding-edge-fifteen);

        &>span {
            padding-left: 5px;
        }
    }

    .context {
        display: flex;
    }

    /* 需要调整margin right、bottom */
    .toolbar-item {
        --toolbar-width: 160px;
        --padding-edge: 10px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: var(--toolbar-width);
        height: 45px;
        border-radius: 3px;
        margin-right: var(--padding-edge-fifteen);
        margin-bottom: var(--padding-edge-fifteen);
        padding-left: var(--padding-edge);
        padding-right: var(--padding-edge);
        transition: var(--shadow-transition);
        border: var(--el-border);

        &>span {
            display: block;
            overflow: hidden;
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: calc(var(--toolbar-width) - 2 * var(--padding-edge) - var(--padding-edge-fifteen) - 17px);
            color: #183153;
            font-size: 14px;
            font-weight: bold;
            padding-left: 5px;
            user-select: none;
        }

        &:hover {
            box-shadow: var(--box-shadow);
        }
    }
}
</style>