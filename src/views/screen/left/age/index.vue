<template>
    <div class="box">
        <div class="title">
            <p>年龄比例</p>
            <img src="/screen/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let charts = ref();

onMounted(() => {
    let mycharts = echarts.init(charts.value);

    let option = {
        title: {
            text: '饼状图',
            textStyle: {
                color: 'skyblue',
            },
            left: '5%',
            top: 20,
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 10,
            right: 30,
            orient: 'vertical',
            textStyle: {
                color: 'white',
                fontSize: 18,
            },
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['100%', '20%'],
                top: 20,
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: 'white',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ]
            }
        ],
    };

    option && mycharts.setOption(option);
})

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(/screen/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;

    .title {
        margin-left: 20px;
        margin-top: -5px;

        p {
            color: white;
            font-size: 24px;
        }
    }

    .charts {
        height: 160px;
        border-color: salmon;
    }
}
</style>