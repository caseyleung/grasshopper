<template>
    <div class="box">
        <div class="title">
            <p>热门景区排行</p>
            <img src="/screen/dataScreen-title.png" alt="">
        </div>
        <div class="header">
            <p>排名</p>
            <p>景区</p>
            <p>预约数量</p>
            <p></p>
        </div>
        <div class="box2">
            <div class="rank">
                <span :style="{ color: colorList[total.length - index] }" v-for="(index, item) in rank" :key="index">{{
                    index }}</span>
            </div>
            <div class="place">
                <span v-for="(index, item) in place" :key="index">{{ index }}</span>
            </div>
            <div class="charts" ref="charts"></div>
            <div class="total">
                <span v-for="(index, item) in total" :key="index">{{ index }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let rank = ref([1, 2, 3, 4, 5, 6]);

let place = ref(["峨眉山", "稻城亚丁", "九寨沟", "万里长城", "北京故宫", "黄山"]);

let total = ref(['8.00w', '6.00w', '5.00w', '4.00w', '3.00w', '2.50w']);

let colorList = ['#a4e182', '#6279d8', '#89d2f4', '#fbdd63', '#f56e74', '#6495ed'];

let charts = ref();

onMounted(() => {
    const myChart = echarts.init(charts.value);
    const option = {
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: 'category',
        },
        series: [
            {
                type: 'bar',
                data: [25, 30, 40, 50, 60, 80],
                barWidth: '20%',
                showBackground: true,
                backgroundStyle: {
                    borderColor: 'skyblue',
                    borderWidth: '2',
                    borderRadius: 50,
                    shadowColor: 'white',
                    shadowBlur: 10
                },
                itemStyle: {
                    // color: '#3076fd',
                    color: function (params) {
                        return colorList[params.dataIndex]
                    },
                    borderRadius: 50,
                },
            },
        ],
        grid: {
            left: '5%',
            right: '12%',
            top: '1%',
            bottom: '-1%',
            containLabel: true
        }
    }
    myChart.setOption(option)
})


</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: url(/screen/dataScreen-main-rt.png) no-repeat;
    background-size: 100% 100%;
    font-size: 20px;
    margin-top: 10px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 24px;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        height: 40px;
        color: orange;
        font-size: 20px;
        font-weight: bold;
        background: url(/screen/rankingChart-bg.png) no-repeat;
        background-size: 100% 100%;
        align-items: center;
        justify-content: space-between;
        margin: 15px 10px;

        p {
            &:first-child {
                flex: 1;
                text-align: left; // 左对齐
                margin-left: 20px;
            }

            &:nth-child(2) {
                flex: 1.5;
                text-align: center; // 居中对齐
            }

            &:nth-child(3) {
                flex: 3;
                text-align: right; // 右对齐
                margin-right: 100px;
            }

            &:last-child {
                flex: 0.5;
                text-align: center; // 居中对齐
            }
        }
    }

    .box2 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: calc(100% - 130px);

        .rank {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            color: white;
            font-size: 24px;
            line-height: 50px;
            margin-left: 10px;

            span {
                font-weight: bold;
            }
        }

        .place {
            flex: 1.5;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            color: white;
            font-size: 16px;
            font-weight: bold;
            line-height: 50px;
        }

        .charts {
            flex: 3;
        }

        .total {
            flex: 0.5;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            color: white;
            font-size: 14px;
            line-height: 50px;
            margin-right: 20px;
        }
    }
}
</style>