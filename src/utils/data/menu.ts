// 算半个路由

import {
    Cpu,
    Calendar,
    Connection,
    PictureRounded,
    Folder
} from '@element-plus/icons-vue'

// 计算工具组
const calculate = [
    {
        label: '日期计算器',
        path:'/calculator/date',
        key: 'date',
        icon: Calendar,
        component: () => import('@/views/homechildren/DateCalulator.vue')
    },
    {
        label: '进制转换',
        path: '/calculator/conversion',
        key: 'conversion',
        icon: Connection,
        component: () => import('@/views/homechildren/ConversionNumber.vue')
    }
];

// 文件操作
const fileOperation = [
    {
        label: '图片格式转换',
        path: '/file/conversion',
        key: 'operation',
        icon: PictureRounded,
        component: () => import('@/views/filechildren/ImageConversion.vue')
    }
]

// 导入菜单数据
const menuTables = [
    {
        label: '计算工具',
        icon: Cpu,
        path:'/',
        anchor:'calculate',
        children: calculate
    },
    {
        label: '文件操作',
        icon: Folder,
        path: '/',
        anchor: 'file',
        children: fileOperation
    }
];

export {
    menuTables
}