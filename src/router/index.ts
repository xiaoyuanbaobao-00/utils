import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../views/homechildren/Home.vue";
import MenuTables from '../utils/data/Menu'
import { defineAsyncComponent } from 'vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        // 嵌套路由
        children: [
            {
                name: 'childrenHome',
                path: '/',
                component: Home
            }
        ]
    }
]

// 路由挂载
MenuTables.forEach(item => {
    item.children.forEach(children => {
        routes[0].children.push({
            name: item.anchor + children.key,
            path: children.path,
            component: defineAsyncComponent(children.component)
        })
    })
})

const route = {
    history: createWebHistory(),
    routes
};

const router = createRouter(route);

export default router;