// 算半个路由
import {
    Cpu,
    Folder
} from '@element-plus/icons-vue'

import Calculate from './menuchildren/Calculate';
import FileOperation from './menuchildren/FileOperation';
import { Menu } from '@/utils/data/interface/DateInterface';

// 导入菜单数据
const MenuTables: Menu.MenuTable[] = [
    {
        label: '计算工具',
        icon: Cpu,
        path:'/',
        anchor:'calculate',
        children: Calculate
    },
    {
        label: '文件操作',
        icon: Folder,
        path: '/',
        anchor: 'file',
        children: FileOperation
    }
];

export default MenuTables;