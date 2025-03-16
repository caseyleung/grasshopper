<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Gender class="gender"></Gender>
                    <Age class="age"></Age>
                </div>
                <div class="center">center</div>
                <div class="right">right</div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Top from './top/index.vue';
import Tourist from './left/tourist/index.vue';
import Gender from './left/gender/index.vue';
import Age from './left/age/index.vue';


let screen = ref();

onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
})

// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}

// 监听视口变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
}

</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        // background-color: antiquewhite;
        background: url(/screen/bg.png) no-repeat;
        background-size: 100% 100%;
        left: 50%;
        top: 50%;
        transform-origin: left top;
    }

    .top {
        width: 100%;
        height: 40px;
        // background-color: chocolate;
    }


    .bottom {
        display: flex;

        .left {
            flex: 1;
            height: 1040px;
            display: flex;
            flex-direction: column;

            .tourist {
                flex: 1;
                // background: aqua;
            }

            .gender {
                flex: 1;
            }

            .age {
                flex: 1;
            }
        }

        .center {
            flex: 2;
            height: 1040px;
            // background: skyblue;
        }


        .right {
            flex: 1;
            height: 1040px;
            // background: red;
        }
    }
}
</style>