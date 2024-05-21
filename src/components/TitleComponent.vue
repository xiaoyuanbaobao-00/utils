<template>
    <div id="title" class="select-no">
        <div class="title-left-icon">
            <div class="iconfont">&#xe694;</div>
            <div>工具组</div>
        </div>
        <div class="title-right-text">
            <div id="minimize"><i class="iconfont">&#xe617;</i></div>
            <div id="maximize"><i class="iconfont"></i></div>
            <div id="close"><i class="iconfont">&#xe609;</i></div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>

<style lang="scss" scoped>
#title {
    // 标记为可拖拽
    -webkit-app-region: drag;
    --uniform-height: 35px;
    --uniform-padding: 0 15px;
    --uniform-height-line: 38px;
    white-space: nowrap;

    height: var(--uniform-height);
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    background-color: #FDFCFB;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    position: relative;
    top: 0;
    left: 0;
    z-index: 2000;

    .title-left-icon {
        display: flex;
        height: var(--uniform-height);
        line-height: var(--uniform-height);
        padding: var(--uniform-padding);

        &>div:nth-child(1) {
            padding-right: 8px;
        }
    }


    .title-right-text {
        display: flex;
        height: var(--uniform-height);

        &>div {
            // 标记为不可拖拽
            -webkit-app-region: no-drag;
            cursor: pointer;
            color: #8C8C8C;
            padding: var(--uniform-padding);
            height: var(--uniform-height);
            line-height: var(--uniform-height);
            transition: all 0.2s;

            &:hover {
                color: #000;
                background-color: rgba($color: #000, $alpha: 0.1);
            }
        }
    }
}
</style>