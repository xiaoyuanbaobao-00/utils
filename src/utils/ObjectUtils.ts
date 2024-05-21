/**
 * 用于判断对象不为 null
 * @param obj 任意类型
 * @returns 
 */
function objIsNotNull(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

/**
 * 判断多个对象全部不为 null
 * @param objs 
 * @returns 
 */
function objsIsNotNull(...objs: any[]): boolean {
    return objs.every(item => objIsNotNull(item));
}

/**
 * 用于判断数组是否有内容
 * @param obj 数组
 * @returns 
 */
function arrayIsNotNull(obj: any[]): boolean {
    return objIsNotNull(obj) && obj.length > 0;
}

/**
 * 用于判断字符串是否为null 空字符串也算
 * @param str 字符串
 * @returns 
 */
function strIsNotNull(str: string): boolean {
    return objIsNotNull(str) && str !== '';
}

/**
 * 用于判断字符串为null 空字符串也算
 * @param str 字符串
 * @returns 
 */
function strIsNull(str: string): boolean {
    return !strIsNotNull(str);
}

/**
 * 用于判断两个 HTML 元素是否是同一个节点
 * @param element 
 */
function HTMLElementIsSameNode<T extends HTMLElement | EventTarget>(element: T, element2: T): boolean {
    if (objsIsNotNull(element, element2)) {
        return (element as HTMLElement)!.isSameNode((element2 as HTMLElement));
    }
    return false;
}

/**
 * 用于判断当前元素内是否具有该class样式
 * @param HTML元素
 * @param className class样式名
 * @returns 
 */
function HTMLElementClassListItemContains<T extends HTMLElement | EventTarget>(element: T, className: string): boolean {
    if (objIsNotNull(element) && strIsNotNull(className)) {
        return (element as HTMLElement)!.classList.contains(className);
    }
    return false;
}

/**
 * 判断是否是函数
 * @param{Function} callback 
 * @returns boolean
 */
function isFunction(callback: any): boolean {
    return typeof callback === 'function';
}

// 时间单位
const units = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
}

/**
 * 用于计算两个日期之间相差的天数
 * @param timer 
 * @param timer2 
 * @returns 
 */
function daysDifference<T extends number | Date | string>(timer: T, timer2: T): number {
    const startDate = new Date(timer);
    const endDate = new Date(timer2);

    // 计算相差的毫秒数
    const timeDifference = endDate.getTime() - startDate.getTime();

    // 将毫秒数转换为天数
    return Math.ceil(timeDifference / (units.day));
}

/**
 * 用于计算两个日期之间相差的小时
 * @param timer 
 * @param timer2 
 * @returns 
 */
function hourDifference<T extends number | Date | string>(timer: T, timer2: T): number {
    const startDate = new Date(timer);
    const endDate = new Date(timer2);

    // 计算相差的毫秒数
    const timeDifference = endDate.getTime() - startDate.getTime();

    // 将毫秒数转换为小时
    return Math.ceil(timeDifference / (units.hour));
}

/**
 * 用于计算两个日期之间相差的分钟
 * @param timer 
 * @param timer2 
 * @returns 
 */
function minuteDifference<T extends number | Date | string>(timer: T, timer2: T): number {
    const startDate = new Date(timer);
    const endDate = new Date(timer2);

    // 计算相差的毫秒数
    const timeDifference = endDate.getTime() - startDate.getTime();

    // 将毫秒数转换为分钟
    return Math.ceil(timeDifference / (units.minute));
}

/**
 * 用于计算两个日期之间相差的秒
 * @param timer 
 * @param timer2 
 * @returns 
 */
function secondDifference<T extends number | Date | string>(timer: T, timer2: T): number {
    const startDate = new Date(timer);
    const endDate = new Date(timer2);

    // 计算相差的毫秒数
    const timeDifference = endDate.getTime() - startDate.getTime();

    // 将毫秒数转换为秒
    return Math.ceil(timeDifference / units.second);
}

/**
 * 用于计算两个日期之间相差的天、小时、分钟、秒
 * @param timer 
 * @param timer2 
 * @returns 
 */
function timeDifference<T extends number | Date | string>(timer: T, timer2: T) {
    const startDate = new Date(timer);
    const endDate = new Date(timer2);

    // 计算相差的毫秒数
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    // 获得天
    const days = timeDifference / (units.day);
    // 获得小时
    const hours = Math.ceil(timeDifference / (units.hour));
    // 获得分钟
    const minutes = Math.ceil(timeDifference / (units.minute));
    // 获得秒
    const seconds = Math.ceil(timeDifference / units.second);

    // 获取减去天数的剩余时间
    const timeDays = timeDifference - Math.floor(days) * (units.day);
    // 获取除去天数的剩余小时
    const timeHours = Math.floor(timeDays / units.hour);
    // 获取除去小时和天数的剩余分钟
    const timeMinutes = Math.floor((timeDays - timeHours * units.hour) / units.minute);
    // 获取除去分钟、小时和天数的剩余秒
    const timeSeconds = Math.floor((timeDays - timeHours * units.hour - timeMinutes * units.minute) / units.second);

    return {
        days: Math.ceil(days),
        hours,
        minutes,
        seconds,
        // 精确部分（到秒）
        timeDays: Math.floor(days),
        timeHours,
        timeMinutes,
        timeSeconds
    }
}

/**
 * 日期加上天数得出新的日期
 * @param timer 
 * @param days 
 * @returns 
 */
function addDaysToDate<T extends number | Date | string, R extends number>(timer: T, days: R) {
    // 创建一个新的Date对象，以避免修改原始日期对象
    let newDate = new Date(timer);
    // 在现有的日期上加上指定的天数
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

/**
 * 日期加上小时得出新的日期
 * @param timer 
 * @param days 
 * @returns 
 */
function addHoursToDate<T extends number | Date | string, R extends number>(timer: T, days: R) {
    // 创建一个新的Date对象，以避免修改原始日期对象
    let newDate = new Date(timer);
    // 在现有的日期上加上指定的天数
    newDate.setHours(newDate.getHours() + days);
    return newDate;
}

/**
 * 日期加上分钟得出新的日期
 * @param timer 
 * @param days 
 * @returns 
 */
function addMinutesToDate<T extends number | Date | string, R extends number>(timer: T, days: R) {
    // 创建一个新的Date对象，以避免修改原始日期对象
    let newDate = new Date(timer);
    // 在现有的日期上加上指定的天数
    newDate.setMinutes(newDate.getMinutes() + days);
    return newDate;
}

/**
 * 日期加上秒得出新的日期
 * @param timer 
 * @param days 
 * @returns 
 */
function addsecondsToDate<T extends number | Date | string, R extends number>(timer: T, days: R) {
    // 创建一个新的Date对象，以避免修改原始日期对象
    let newDate = new Date(timer);
    // 在现有的日期上加上指定的天数
    newDate.setSeconds(newDate.getSeconds() + days);
    return newDate;
}

/**
 * 逆向推断日期格式，多是有点大病，不一定准确，但是可以作为参考
 * @param dateStr 
 * @returns 
 */
function guessDateFormat(dateStr: string) {
    const formats = [
        { regex: /^\d{4}$/, format: 'yyyy' },
        { regex: /^\d{4}.\d{2}.\d{2}$/, format: 'yyyy-MM-dd' },
        { regex: /^\d{2}.\d{2}.\d{4}$/, format: 'MM/dd/yyyy' },
        { regex: /^\d{4}.\d{2}.\d{2}$/, format: 'yyyy/MM/dd' },
        { regex: /^\d{4}.\d{2}.\d{2}.\d{2}.\d{2}.\d{2}$/, format: 'yyyy-MM-dd HH:mm:ss' },
        { regex: /^\d{2}.\d{2}.\d{4}.\d{2}.\d{2}.\d{2}$/, format: 'dd-MM-yyyy HH:mm:ss' },
        { regex: /^\d{1,2}.\w{3}.\d{4}.\d{2}.\d{2}.\d{2}$/, format: 'd MMM yyyy HH:mm:ss' },
        { regex: /^\d{12}$/, format: 'yyyyMMddHHmm' },
        { regex: /^\d{8}$/, format: 'yyyyMMdd' }
    ];
    for (let item of formats) {
        if (item.regex.test(dateStr)) {
            return item.format;
        }
    }
    return 'Unknown format?';
}

/**
 * 根据时间加上天数、小时、分钟、秒得出新的日期
 * @param timer 日期
 * @param days 天数
 * @param hours 小时
 * @param minutes 分钟
 * @param seconds 秒
 * @returns 
 */
function addTimesToDate<T extends number | Date | string, U extends number>(timer: T, days: U, hours: U, minutes: U, seconds: U) {
    // 创建一个新的Date对象，以避免修改原始日期对象
    let newDate = new Date(timer);
    // 在现有的日期上加上指定的天数、小时、分钟和秒数
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return newDate;
}

/**
 * 格式化日期
 * @param timer 
 * @param format 
 */
function formatdata<T extends string | number | Date>(date: T, format: string): string {
    // 小于10的时间自动补零，并转为字符串用于正则替换
    const pad = (n: number): string => (n < 10 ? '0' : '') + n;

    const d = new Date(date);

    const replacements: {[key: string]: string} = {
        'yyyy': String(d.getFullYear()),
        'MM': pad(d.getMonth() + 1),
        'dd': pad(d.getDate()),
        'HH': pad(d.getHours()),
        'mm': pad(d.getMinutes()),
        'ss': pad(d.getSeconds())
    };

    const result = format.replace(/yyyy|MM|dd|HH|mm|ss/g, match => replacements[match] || match);

    // 检查是否有未处理的时间格式符号
    if (/[a-zA-Z]/g.test(result)) {
        return "格式错误！";
    }

    return result;
}

/**
 * 深度递归拷贝
 * @param {any} value 
 * @returns 
 */
function deepClone<T>(value: T): T {
    const cache = new Map<any, any>();

    function _deepClone<T>(value: T): T {
        // 如果值为 null 或者不是对象类型，则直接返回原值
        if (value === null || typeof value !== 'object') {
            return value;
        }

        // 如果缓存中已经存在该值，则直接返回缓存中的结果
        if (cache.has(value)) {
            return cache.get(value);
        }

        // 根据值是否为数组创建对应的空数组或空对象
        const result: any = Array.isArray(value) ? [] : {};

        // 将值存入缓存中，并将结果作为值
        cache.set(value, result);

        // 遍历原对象的所有键，并递归调用 _deepClone 函数处理值
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                result[key] = _deepClone((value as any)[key]);
            }
        }
        return result;
    }

    // 调用 _deepClone 函数，并返回处理后的结果
    return _deepClone(value);
}

/**
 * 用于进制转换计算，2-60进制
 * @param fromBase 数据进制
 * @param inputData 数据
 * @param toBase 转换进制
 * @returns 
 */
function convertBases(fromBase: number, inputData: string, toBase:number) {
    if(!strIsNotNull(inputData)) return '';

    if (fromBase < 2 || fromBase > 60 || toBase < 2 || toBase > 60) {
        throw new Error("只支持 2 到 60 进制的转换")
    };

    // 定义所有可能的字符
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    if (fromBase > 36 || toBase > 36) {
        // 扩展字符集合，此处简单地扩展至60字符，实际可以使用更多特殊字符或双字符表示
        let extra = 10 + 26 + 26; // 已有的是数字+小写字母+大写字母
        while (chars.length < 60) {
            chars.push('α' + (chars.length - extra));
        }
    }

    // 将输入数据从fromBase转换为十进制
    let decimalValue = 0;
    for (let i = 0; i < inputData.length; i++) {
        decimalValue = decimalValue * fromBase + chars.indexOf(inputData[i]);
        if (decimalValue < 0) {
            throw new Error("Invalid character in input data.");
        }
    }

    // 从十进制转换到toBase
    if (decimalValue === 0) return "0";
    let result = '';
    while (decimalValue > 0) {
        result = chars[decimalValue % toBase] + result;
        decimalValue = Math.floor(decimalValue / toBase);
    }
    return result;
}

/**
 * 函数重载
 * @param obj 对象
 * @param name 函数名
 * @param fn 不同参数数量的函数
 */
function addMethod(obj: any, name: string, fn: Function)  {
    const old = obj[name];
    obj[name] = function(...args: Array<any>) {
        if(args.length === fn.length) {
            return fn.apply(this, args);
        } else if (typeof old === 'function') {
            return old.apply(this, args);
        }
    };
}

/**
 * 用于拖拽移动的窗体逻辑
 */
class MovePanel<T extends HTMLElement, R extends T> {
    // 计算出移动的距离
    posX = 0;
    posY = 0;
    // 获取鼠标初始位置
    posInitX = 0;
    posInitY = 0;
    // 获取模态框初始位置
    modelX = 0;
    modelY = 0;

    // 拖拽的元素
    pointer: T | null = null;
    // 被拖拽移动的元素
    frame: R | null = null;
    // 鼠标松开时执行
    callback: Function | undefined = undefined;

    constructor() {
        this.pointerDown = this.pointerDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    setElement(pointer: T, frame: R, callback: Function | undefined) {
        this.pointer = pointer;
        this.frame = frame;
        this.callback = callback;
    }

    /**
     * 当指针被鼠标点击时，绑定相关的事件
     * @param event 
     */
    pointerDown(event: MouseEvent) {
        // 确定其与指针标记的是同一个元素
        if (HTMLElementIsSameNode(event.target, this.pointer)) {
            if (this.frame === undefined || this.frame === null) {
                throw new Error('frame is null');
            } else {
                // 获取鼠标初始位置
                this.posInitX = event.clientX;
                this.posInitY = event.clientY;
                // 获取模态框初始位置
                this.modelX = this.frame.offsetLeft;
                this.modelY = this.frame.offsetTop;

                // 监听鼠标移动事件
                document.addEventListener('mousemove', this.mouseMove);
                // 监听鼠标松开事件
                document.addEventListener('mouseup', this.mouseUp);
            }
        }
    }
    // 监听鼠标移动
    mouseMove(event: MouseEvent) {
        // 计算出移动的距离
        this.posX = event.clientX - this.posInitX;
        this.posY = event.clientY - this.posInitY;

        // 得出模态框所应该在的位置
        // 移动模态框
        this.frame!.style.left = (this.modelX + this.posX) + 'px';
        this.frame!.style.top = (this.modelY + this.posY) + 'px';
    }
    // 当鼠标松开时触发
    mouseUp() {
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
        if (isFunction(this.callback)) {
            this.callback!();
        }
    }
}

export {
    // 用于判断对象是否为null
    objIsNotNull,
    // 用于判断多个对象是否为null
    objsIsNotNull,
    // 用于判断数组是否有内容
    arrayIsNotNull,
    // 用于判断字符串是否为null 空字符串也算
    strIsNotNull,
    // 用于判断字符串是否为null 空字符串也算
    strIsNull,
    // 用于判断两个元素是否是同一个元素
    HTMLElementIsSameNode,
    // 用于判断当前元素内是否具有该class样式
    HTMLElementClassListItemContains,
    // 用于拖拽移动的窗体逻辑
    MovePanel,
    // 用于判断是否是函数
    isFunction,
    // 用于计算两个日期之间相差的天数
    daysDifference,
    // 用于计算两个日期之间相差的小时数
    hourDifference,
    // 用于计算两个日期之间相差的分钟数
    minuteDifference,
    // 用于计算两个日期之间相差的秒数
    secondDifference,
    // 用于计算两个日期之间相差的天数
    timeDifference,
    // 日期加上天数得出新的日期
    addDaysToDate,
    // 日期加上小时得出新的日期
    addHoursToDate,
    // 日期加上分钟得出新的日期
    addMinutesToDate,
    // 日期加上秒得出新的日期
    addsecondsToDate,
    // 根据时间加上天数、小时、分钟、秒得出新的日期
    addTimesToDate,
    // 逆向推断日期格式，多是有点大病，不一定准确，但是可以作为参考
    guessDateFormat,
    // 用于深拷贝
    deepClone,
    // 用于格式化日期
    formatdata,
    // 进制转换 2-60
    convertBases,
    // 函数重载
    addMethod
}