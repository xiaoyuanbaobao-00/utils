<template>
    <div class="panel">
        <div class="feature">
            <h2><el-icon><Connection /></el-icon> 进制转换</h2>
            <div>
                <el-row style="margin-bottom: 15px;">
                    <el-col :span="10">
                        <el-button-group>
                            <el-button plain :class="ConversionNumber.fromBase === 2 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.fromBase = 2">二进制</el-button>
                            <el-button plain :class="ConversionNumber.fromBase === 8 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.fromBase = 8">八进制</el-button>
                            <el-button plain :class="ConversionNumber.fromBase === 10 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.fromBase = 10">十进制</el-button>
                            <el-button plain :class="ConversionNumber.fromBase === 16 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.fromBase = 16">十六进制</el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="14">
                        <el-select placeholder="Select" style="width: 240px" v-model="ConversionNumber.fromBase">
                            <el-option v-for="item in 59" :key="item" :value="item + 1" :label="item + 1 + ' 进制'" />
                        </el-select>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 15px;">
                    <el-col :span="24">
                        <el-input v-model="ConversionNumber.inputData" placeholder="在此输入待转换的数字" size="large">
                            <template #prepend>
                                转换数字
                            </template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom: 15px;">
                    <el-col :span="10">
                        <el-button-group>
                            <el-button plain :class="ConversionNumber.toBase === 2 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.toBase = 2">二进制</el-button>
                            <el-button plain :class="ConversionNumber.toBase === 8 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.toBase = 8">八进制</el-button>
                            <el-button plain :class="ConversionNumber.toBase === 10 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.toBase = 10">十进制</el-button>
                            <el-button plain :class="ConversionNumber.toBase === 16 ? 'feature-button-active' : ''"
                                @click="ConversionNumber.toBase = 16">十六进制</el-button>
                        </el-button-group>
                    </el-col>
                    <el-col :span="14">
                        <el-select placeholder="Select" style="width: 240px" v-model="ConversionNumber.toBase">
                            <el-option v-for="item in 59" :key="item" :value="item + 1" :label="item + 1 + ' 进制'" />
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-input v-model="ConversionNumber.inputData" placeholder="转换结果"
                            :value="ConversionNumber.conversion" size="large" readonly>
                            <template #prepend>
                                转换结果
                            </template>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Calculate } from '@/utils/data/interface/DateInterface'
import { convertBases } from '@/utils/ObjectUtils'
import { reactive, computed } from 'vue'

const ConversionNumber: Calculate.ConversionNumber = reactive({
    fromBase: 2,
    inputData: '',
    toBase: 10,
    conversion: computed(() => {
        return convertBases(ConversionNumber.fromBase, ConversionNumber.inputData, ConversionNumber.toBase);
    })
})

</script>
<style lang="scss" scoped>
.panel {
    .feature {
        transition: var(--shadow-transition);
        border-radius: 5px;
        user-select: none;
        border: 1px solid #CED4DA;
        border-radius: 5px;

        .feature-button-active {
            color: #FFF;
            background-color: #409EFF;
        }

        &:hover {
            box-shadow: var(--box-shadow);
        }

        h2 {
            color: #2e2e30;
            user-select: all;
            font-size: 18px;
            padding-left: 15px;
            border-bottom: 1px solid #CED4DA;
            background-color: #FDFCFB;
            display: flex;
            align-items: center;
            & > i {
                margin-right: 5px;
            }
        }

        & > div {
            padding: 15px;
        }
    }
}
</style>