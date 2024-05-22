// 文件操作
import {
    PictureRounded
} from '@element-plus/icons-vue'
import { Menu } from '@/utils/data/interface/DateInterface';
import { defineComponent } from 'vue'

const fileOperation: Menu.MenuChildren[] = [
    {
        label: '图片格式转换',
        path: '/file/conversion',
        key: 'operation',
        icon: PictureRounded,
        component: () => defineComponent(import('@/views/filechildren/ImageConversion.vue'))
    }
]

export default fileOperation;