<template>
    <div class="box">
        <div class="title">
            <p>未来30天游客量趋势图</p>
            <img src="/screen/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

let charts = ref();

onMounted(() => {
    let myChart = echarts.init(charts.value);
    let option = {
        title: {
            text: '访问量',
            right: 40,
            textStyle: {
                color: 'white',
                fontSize: 20,
            }
        },
        // tooltip: {
        //     trigger: 'axis'
        // },
        legend: {
            data: ['游客量'],
            textStyle: {
                color: 'white',
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: true,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,        // 显示刻度线
            },
            axisLabel: {
                show: true,         // 显示标签
                color: '#808080',   // 标签颜色（灰色）
                fontSize: 12,       // 标签字体大小
                fontWeight: 'bold', // 标签字体加粗
            }
        },
        series: [
            {
                name: '游客量',
                type: 'line',
                symbol: 'circle', // 圆点样式
                symbolSize: 2, // 圆点大小
                // stack: '总量',
                data: [11500, 1200, 23000, 12500, 17000, 20800, 4500, 8000, 15500, 22000,
                    24000, 18000, 24500, 7500, 9000, 24000, 24500, 28500, 21500, 7500,
                    19000, 24000, 18000, 20500, 4900, 22000, 11000, 14500, 24000, 26500],
                smooth: true,
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
                lineStyle: {
                    width: 2,
                    color: 'white' // 深橙红，增强视觉冲击力
                },
                itemStyle: {
                    color: 'white', // 点的颜色 (橙红)
                    borderColor: '#fbdd63', // 点的边框颜色 (橙色)
                    borderWidth: 4
                }
            }
        ]
    };
    myChart.setOption(option);
})


</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(/screen/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0px 20px;

    .title {
        margin-left: 10px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        // width: 100%;
        height: calc(100% - 48px);
    }
}
</style>