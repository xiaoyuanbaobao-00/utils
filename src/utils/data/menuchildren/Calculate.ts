// 计算工具组
import {
    Calendar,
    Connection,
} from '@element-plus/icons-vue'
import { Menu } from '@/utils/data/interface/DateInterface';
import { defineComponent } from 'vue'

const calculate: Menu.MenuChildren[] = [
    {
        label: '日期计算器',
        path:'/calculator/date',
        key: 'date',
        icon: Calendar,
        component: () => defineComponent(import('@/views/homechildren/DateCalulator.vue'))
    },
    {
        label: '进制转换',
        path: '/calculator/conversion',
        key: 'conversion',
        icon: Connection,
        component: () => defineComponent(import('@/views/homechildren/ConversionNumber.vue'))
    }
];

export default calculate;