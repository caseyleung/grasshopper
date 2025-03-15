<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">数据化可视化大屏</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间: {{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';


let router = useRouter();

let time = ref(moment().format('YYYY年MM月DD日 HH小时mm分钟ss秒'));
let intervalId: number | null = null;

const goHome = () => {
    router.push('/home');
}

onMounted(() => {
    intervalId = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 HH小时mm分钟ss秒');
    }, 1000);
})

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
})

</script>

<style scoped lang="scss">
.top {
    display: flex;
    width: 100%;
    height: 40px;
    // background-color: chocolate;

    .left {
        flex: 1.8;
        background: url(/screen/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            float: right;
            letter-spacing: 10px;
            font-size: 20px;
            background: url(/screen/dataScreen-header-btn-bg-l.png);
            background-size: 100% 100%;
            cursor: pointer;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            text-align: center;
            font-size: 36px;
            line-height: 74px;
            letter-spacing: 10px;
            color: #29fcff;
            background: url(/screen/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .right {
        flex: 1.8;
        background: url(/screen/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rbtn {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            float: left;
            font-size: 20px;
            letter-spacing: 2px;
            cursor: pointer;
            background: url(/screen/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: cover;
        }

        .time {
            color: #29fcff;
            margin-right: 25px;
            font-size: 20px;
        }
    }
}
</style>