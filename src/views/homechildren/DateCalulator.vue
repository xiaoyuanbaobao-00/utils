<template>
    <div class="panel">
        <h2>日期计算器</h2>
        <div class="panel-body">
            <div class="catalogue">
                <ul>
                    <li v-for="(item, index) in catalogueData" :key="index" :class="{ active: catalogueActive === index }"
                        @click="changeActiveScroll(index)">{{ index + 1 + '.' + item }}</li>
                </ul>
            </div>
            <div class="feature" ref="feature">
                <el-descriptions :title="catalogueData[0]" class="feature-item" :column="2">
                    <el-descriptions-item width="350px">
                        <template #label>
                            <div class="feature-label">开始时间：</div>
                        </template>
                        <el-date-picker v-model.lazy="timers.timeUpDown.value" type="datetime" />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        通过开始时间、天、小时、分钟、秒一起计算得出新的日期，允许输入负数。
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="feature-label">天：</div>
                        </template>
                        <el-input-number v-model.lazy="timers.timeUpDown.days" />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="feature-label">新的日期：</div>
                        </template>
                        <span class="key-text">{{ timers.timeUpDown.interval }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="feature-label">小时：</div>
                        </template>
                        <el-input-number v-model.lazy="timers.timeUpDown.hours" />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <el-button type="primary" plain @click="timers.timeUpDown.clear">清空</el-button>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="feature-label">分钟：</div>
                        </template>
                        <el-input-number v-model.lazy="timers.timeUpDown.minutes" />
                    </el-descriptions-item>
                    <el-descriptions-item></el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="feature-label">秒：</div>
                        </template>
                        <el-input-number v-model.lazy="timers.timeUpDown.seconds" />
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions :title="catalogueData[1]" class="feature-item" :column="2">
                    <el-descriptions-item label="开始时间：" width="350px">
                        <el-date-picker v-model.lazy="timers.timeInterval.timerVal[0]" type="datetime" />
                    </el-descriptions-item>
                    <el-descriptions-item label="间隔时间：">
                        <span class="key-text">
                            {{ timers.timeInterval.timerInterval.timeDays || 0 }} 天
                            {{ timers.timeInterval.timerInterval.timeHours || 0 }} 小时
                            {{ timers.timeInterval.timerInterval.timeMinutes || 0 }} 分钟
                            {{ timers.timeInterval.timerInterval.timeSeconds || 0 }} 秒
                        </span>
                    </el-descriptions-item>
                    <el-descriptions-item label="结束时间：">
                        <el-date-picker v-model.lazy="timers.timeInterval.timerVal[1]" type="datetime" />
                    </el-descriptions-item>
                    <el-descriptions-item label="向上取整相当于：">
                        <span class="key-text">
                            {{ timers.timeInterval.timerInterval.days || 0 }} 天
                            ||
                            {{ timers.timeInterval.timerInterval.hours || 0 }} 小时
                            ||
                            {{ timers.timeInterval.timerInterval.minutes || 0 }} 分钟
                            ||
                            {{ timers.timeInterval.timerInterval.seconds || 0 }} 秒
                        </span>
                    </el-descriptions-item>
                </el-descriptions>
                <el-descriptions :title="catalogueData[2]" class="feature-item" :column="2">
                    <el-descriptions-item label="时间：" width="350px">
                        <el-date-picker v-model.lazy="timers.timeAnalyzeFormat.date" type="datetime" />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        输入需要格式化的日期与格式化字符串，得出最后的格式化日期
                    </el-descriptions-item>
                    <el-descriptions-item label="格式：" width="350px">
                        <el-input class="put-width" v-model.lazy="timers.timeAnalyzeFormat.format"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item label="格式化字符串：">
                        <span class="key-text">
                            {{ timers.timeAnalyzeFormat.formatHandle }}
                        </span>
                    </el-descriptions-item>
                    <!-- 逆向时间格式推导 -->
                    <el-descriptions-item>
                        <strong>格式化字符串解析</strong>
                    </el-descriptions-item>
                    <el-descriptions-item></el-descriptions-item>
                    <el-descriptions-item label="日期字符串：" width="350px">
                        <el-input class="put-width" v-model.lazy="timers.timeAnalyzeFormat.analyzeData"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        格式化日期字符串解析存在误差，奇葩的功能。<strong>(下手轻点)</strong>
                    </el-descriptions-item>
                    <el-descriptions-item label="日期格式解析：" width="350px">
                        <el-button type="primary" plain @click="timers.timeAnalyzeFormat.analyzeFormat">解析</el-button>
                    </el-descriptions-item>
                    <el-descriptions-item label="格式化字符串：">
                        <span class="key-text">
                            {{ timers.timeAnalyzeFormat.dataAnalyzeFormat }}
                        </span>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { timeDifference, addTimesToDate, guessDateFormat, strIsNotNull, formatdata } from '@/utils/ObjectUtils';
import { Calculate } from '@/utils/data/interface/DateInterface'

// 当前选中的目录索引
const catalogueActive = ref(0);
// 目录数据
const catalogueData = ['日期加减', '日期间隔计算', '日期格式化与解析'];
// 获取文档节点
const feature = ref<HTMLDivElement | null>(null);
// 所有锚点位置
const coordinate: number[] = [];

// 日期集合
const timers: Calculate.timers = reactive({
    timeUpDown: {
        value: Date.now(),
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        interval: computed(() => {
            return addTimesToDate(timers.timeUpDown.value, timers.timeUpDown.days, timers.timeUpDown.hours, timers.timeUpDown.minutes, timers.timeUpDown.seconds).toLocaleString();
        }),
        clear: () => {
            timers.timeUpDown.days = 0;
            timers.timeUpDown.hours = 0;
            timers.timeUpDown.minutes = 0;
            timers.timeUpDown.seconds = 0;
        }
    },
    // 日期间隔
    timeInterval: {
        // 开始时间
        timerVal: [ Date.now(), ''],
        // 间隔时间
        timerInterval: computed(() => {
            if (timers.timeInterval.timerVal[0] && timers.timeInterval.timerVal[1]) {
                return timeDifference(timers.timeInterval.timerVal[0], timers.timeInterval.timerVal[1]);
            }
            return '无结果!';
        })
    },
    // 日期格式化与解析
    timeAnalyzeFormat: {
        date: Date.now(),
        format: '',
        dataFormat: '',
        dataAnalyzeFormat: '',
        formatHandle: computed(() =>{
            if(timers.timeAnalyzeFormat.date && timers.timeAnalyzeFormat.format){
                return formatdata(timers.timeAnalyzeFormat.date, timers.timeAnalyzeFormat.format);
            }
            return '';
        }),
        analyzeData: '',
        analyzeFormat: () => {
            if(strIsNotNull(timers.timeAnalyzeFormat.analyzeData)) {
                timers.timeAnalyzeFormat.dataAnalyzeFormat = guessDateFormat(timers.timeAnalyzeFormat.analyzeData);
            }else {
                timers.timeAnalyzeFormat.dataAnalyzeFormat = '';
            }
        }
    },
    // !!!暂时胎死腹中!!!
    // 日期与时区的转换
    timeZoneSwitch: {
        date: Date.now(),
        currentTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        goalTimeZone: '',
        timeZoneSwitchHandle: computed(() => {
            if(timers.timeZoneSwitch.date && timers.timeZoneSwitch.currentTimeZone && timers.timeZoneSwitch.goalTimeZone) {
                // const date = new Date(timers.timeZoneSwitch.date);
                // const timeZone = timers.timeZoneSwitch.goalTimeZone;
                // const result = new Date(date.toLocaleString('en-US', { timeZone }));
                // return result.toLocaleString();
                return '';
            }else {
                return '';
            }
        })
    }
})

onMounted(() => {
    rolling();
})

// 滚动定位
function rolling() {
    const fe = feature.value;
    if (fe && fe.children) {
        const children = fe.children;

        // 子节点高度锚点
        let childrenHeight = 0;
        // 获取所有锚点位置
        for (const key of children) {
            coordinate.push(childrenHeight);
            childrenHeight += key.clientHeight;
        }

        fe.addEventListener('scroll', () => {
            const currentScroll = fe.scrollTop;
            let index = 0;

            for (let i = 0; i < coordinate.length; i++) {
                if (currentScroll < coordinate[i]) {
                    index = i - 1;
                    break;
                }
            }

            // 判断滚动条是否滚到底部
            if (currentScroll + fe.clientHeight >= fe.scrollHeight) {
                index = coordinate.length - 1;
            }

            // 更新锚点位置
            catalogueActive.value = index;
        });
    }
}

// 点击切换选中的目录，并滚动到指定位置
function changeActiveScroll(index: number) {
    catalogueActive.value = index;
    feature.value?.scrollTo({
        top: coordinate[index],
        behavior: 'smooth'
    });
}
</script>

<style scoped lang="scss">
.panel {

    .panel-body {
        display: flex;
        height: calc(100% - 62px);

        .catalogue {
            border-right: 1px solid #CCC;
            user-select: none;

            ul {
                color: #414141;
                font-size: 1.1rem;

                li {
                    cursor: pointer;
                    padding: 10px;
                    padding-right: 20px;
                    border-radius: 5px;
                    transition: var(--shadow-transition);
                    white-space: nowrap;

                    &:hover,
                    &.active {
                        color: #409EFF;
                        background-color: #ECF5FF;
                    }
                }
            }
        }

        .feature {
            min-width: 580px;
            width: calc(100% - 187px);
            padding: 15px 15px 0 15px;
            height: 100%;
            overflow: auto;

            .feature-item {
                padding: 15px;
                margin-bottom: 10px;
                transition: var(--shadow-transition);
                border-radius: 5px;
                user-select: none;

                &:hover {
                    box-shadow: var(--box-shadow);
                }

                h3 {
                    color: #2e2e30;
                    margin-bottom: 15px;
                    user-select: all;
                }
                .feature-label {
                    width: 70px;
                    display: inline-block;
                }
            }
        }
    }
}
.key-text {
    user-select: text;
    color: #46A2FF;
}
.put-width {
    width: 220px;
}
</style>