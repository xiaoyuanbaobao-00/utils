// 计算工具组
import {
    Calendar,
    Connection,
} from '@element-plus/icons-vue'
import { Menu } from '@/utils/data/interface/DateInterface';

const calculate: Menu.MenuChildren[] = [
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

export default calculate;