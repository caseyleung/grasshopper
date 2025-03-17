<template>
    <div class="box" ref="map">
        <h1 style="color: aliceblue;"></h1>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import chinaJson from '/public/china.json';
let map = ref();

echarts.registerMap('china', chinaJson)

onMounted(() => {
    let myChart = echarts.init(map.value);

    let option = {
        geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            label: {
                show: true,
                color: 'white',
                position: 'inside',
                fontSize: 12,
            },
            itemStyle: {
                areaColor: '#3576d9',
                borderColor: 'white',
            },
            emphasis: {
                label: {
                    show: true,
                    color: 'white',
                    fontSize: 24,
                },
                itemStyle: {
                    areaColor: 'skyblue',
                    borderColor: 'yellow',
                    borderwidth: 2,
                }
            },
        },
        grid: {
            left: '0%',
            right: '0%',
            top: '0%',
            bottom: '0%',
        },
        series: [
            {
                type: 'lines',
                data: [
                    {
                        coords: [
                            [113.5107, 23.2196],
                            [120.4651, 36.3373],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [113.5107, 23.2196],
                            [110.3467, 41.4899],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [113.5107, 23.2196],
                            [110.3893, 19.8516],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [113.5107, 23.2196],
                            [121.4648, 31.2891],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [113.5107, 23.2196],
                            [91.1865, 30.1465],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [113.5107, 23.2196],
                            [122.2559, 30.2234],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [113.8953, 22.901],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [113.5107, 23.2196],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [120.4651, 36.3373],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [110.3467, 41.4899],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [110.3893, 19.8516],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [91.1865, 30.1465],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [122.2559, 30.2234],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [121.4648, 31.2891],
                            [87.9236, 43.5883],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                    {
                        coords: [
                            [127.9688, 45.368],
                            [102.9199, 25.4663],
                        ],
                        lineStyle: {
                            color: 'white',
                            width: 2,
                            type: 'dash',
                            curveness: 0.2,
                        },
                    },
                ],
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: 'yellow',
                    // symbol: 'diamond',
                    // symbol: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                    symbolSize: 15,
                },
            },
        ],
    };

    myChart && myChart.setOption(option);
})

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    // background-color: #f00;
}
</style>