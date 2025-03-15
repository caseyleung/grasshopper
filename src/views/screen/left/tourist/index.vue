<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="total">可预约总量<span>9999</span>人</p>
        </div>
        <div class="number">
            <span v-for="index in people" :key="index">{{ index }}</span>
        </div>
        <div class="charts" ref="charts">123</div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import { onMounted, ref } from 'vue';


let people = ref('216908人');
let charts = ref();

onMounted(() => {
    let myecharts = echarts.init(charts.value);

    myecharts.setOption({
        series: [{
            type: 'liquidFill',
            data: [0.6, {
                value: 0.5,
                direction: 'left',
                itemStyle: {
                    color: 'red'
                }
            }, 0.4, 0.3]
        }]
    })
})

</script>

<style scoped lang="scss">
.box {
    background: url(/screen/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    color: white;

    .top {
        margin-left: 20px;

        .title {
            font-size: 28px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(/screen/dataScreen-title.png);
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .total {
            float: right;
            font-size: 20px;
            margin-right: 30px;

            span {
                color: orange;
            }
        }
    }

    .number {
        margin-top: 30px;
        display: flex;
        padding: 12px 12px;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            color: aqua;
            font-weight: 900;
            line-height: 40px;
            background: url(/screen/total.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .charts {
        width: 100%;
        height: 250px;
        // background: cadetblue;
    }


}
</style>