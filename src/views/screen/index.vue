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
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="counter"></Counter>
                </div>
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
import Map from './center/map/index.vue';
import Line from './center/line/index.vue';
import Rank from './right/rank/index.vue';
import Year from './right/year/index.vue';
import Counter from './right/counter/index.vue';


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
    background: url(/screen/bg.png) no-repeat;
    background-size: 100% 100%;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
    }

    .top {
        width: 100%;
        height: 40px;
    }


    .bottom {
        display: flex;

        .left {
            flex: 1;
            height: 1040px;
            display: flex;
            flex-direction: column;

            .tourist,
            .gender,
            .age {
                flex: 1;
            }
        }

        .center {
            flex: 2;
            display: flex;
            flex-direction: column;

            .map {
                flex: 3;
            }

            .line {
                flex: 1;
            }
        }


        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            .rank,
            .year,
            .counter {
                flex: 1;
            }
        }
    }
}
</style>