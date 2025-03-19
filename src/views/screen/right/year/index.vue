<template>
    <div class="box">
        <div class="title">
            <p>年度游客量对比</p>
            <img src="/screen/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref(null);

onMounted(() => {
    let myChart = echarts.init(charts.value);

    myChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [
                {
                    name: '2022年',
                },
                {
                    name: '2023年',
                },
                {
                    name: '2024年',
                }],
            top: '5%',
            right: '5%',
            textStyle: {
                color: 'white',
                fontSize: 12
            },
            icon: 'roundRect',
        },
        xAxis: {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            boundaryGap: false,
            axisLabel: {
                color: 'white'
            },
            axisLine: {
                show: true,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },

        },
        yAxis: {
            type: 'value',
            name: '(单位：万人)',
            nameTextStyle: {
                color: 'white',
                fontSize: 12
            },
            axisLabel: {
                color: 'white'
            },
            axisLine: {
                show: true,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,        // 显示刻度线
            },
        },
        grid: {
            top: '20%',
            left: '10%',
            bottom: '14%',
            right: '5%',
        },
        series: [
            {
                name: '2022年',
                data: [180, 120, 140, 10, 20, 110, 110, 80, 30, 490, 300, 230],
                type: 'line',
                smooth: true,
                showSymbol: false,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: '#fbdd63' }, // 顶部淡黄色
                            { offset: 1, color: 'rgba(255, 250, 205, 0)' } // 
                        ]
                    }
                },
                itemStyle: {
                    color: 'orange',
                }
            },
            {
                name: '2023年',
                data: [540, 280, 140, 90, 80, 70, 510, 30, 50, 30, 390, 200],
                type: 'line',
                smooth: true,
                showSymbol: false,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'hotpink' },
                            { offset: 1, color: 'rgba(255, 250, 205, 0)' } // 
                        ]
                    }
                },
                itemStyle: {
                    color: 'hotpink',
                }
            },
            {
                name: '2024年',
                data: [180, 500, 300, 180, 20, 360, 120, 80, 320, 130, 320, 500],
                type: 'line',
                smooth: true,
                showSymbol: false,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'skyblue' },
                            { offset: 1, color: 'rgba(255, 250, 205, 0)' } // 
                        ]
                    }
                },
                itemStyle: {
                    color: 'skyblue',
                },
                lineStyle: {
                    width: 1,
                    color: 'skyblue',
                },
            }
        ]
    })
})


</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: url(/screen//dataScreen-main-rc.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 50px);
    }
}
</style>