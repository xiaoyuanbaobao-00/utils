import type { DefineComponent, ComponentOptionsMixin, VNodeProps, AllowedComponentProps, ComponentCustomProps, ExtractPropTypes } from 'vue'

/**
 * 菜单命名空间
 */
namespace Menu {
    /**
     * 菜单子类型
     */
    export interface MenuChildren {
        // 标签内容
        label: string
        // 嵌套路由路径
        path: string
        // 唯一标识
        key: string
        // 图标
        icon: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}, {}>
        // 组件
        component: any
    }
    /**
     * 菜单类型
     */
    export interface MenuTable {
        // 标签内容
        label: string
        // icon 图标
        icon: DefineComponent<{}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{}>>, {}, {}>
        // 路由路径
        path: string
        // 定位锚点
        anchor: string
        // 子菜单
        children: MenuChildren[]
    }
}

/**
 * 计算工具命名空间
 */
namespace Calculate {

    /**
     * 日期加减
     */
    interface timeUpDown {
        value: string | number | Date,
        days: number,
        hours: number,
        minutes: number,
        seconds: number,
        interval: any,
        clear: Function
    }

    /**
     * 日期间隔
     */
    interface timeInterval {
        timerVal: Array<string | number | Date>,
        timerInterval: any
    }

    /**
     * 日期格式化与解析
     */
    interface timeAnalyzeFormat {
        // 时间
        date: string | number | Date,
        // 格式
        format: string,
        // 格式化时间值
        dataFormat: string,
        // 时间解析出来的格式
        dataAnalyzeFormat: string,
        // 格式化时间 计算属性
        formatHandle: any,
        // 解析格式时间
        analyzeData: string,
        // 解析时间格式 函数
        analyzeFormat: Function
    }

    /**
     * 时区转换
     */
    interface timeZoneSwitch {
        // 时间
        date: string | number | Date,
        // 当前时区
        currentTimeZone: string,
        // 目标时区
        goalTimeZone: string,
        // 时区转换函数
        timeZoneSwitchHandle: any
    }

    /**
     * 时间处理
     */
    export interface timers {
        timeUpDown: timeUpDown,
        timeInterval: timeInterval,
        timeAnalyzeFormat: timeAnalyzeFormat,
        timeZoneSwitch: timeZoneSwitch
    }

    /**
     * 进制转换
     */
    export interface ConversionNumber {
        // 输入的进制
        fromBase: number;
        // 输入的数据
        inputData: string;
        // 输出的进制
        toBase: number;
        // 转换函数
        conversion: any
    }
}

export {
    Menu,
    Calculate
};