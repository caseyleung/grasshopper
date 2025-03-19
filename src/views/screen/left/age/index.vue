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

    let data = [
        { value: 16, name: '10岁以下' },
        { value: 8, name: '10-18岁' },
        { value: 12, name: '18-30岁' },
        { value: 24, name: '30-40岁' },
        { value: 20, name: '40-60岁' },
        { value: 20, name: '60岁以上' }
    ]

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
            top: '10%',
            right: '5%',
            orient: 'vertical',
            itemGap: 14,
            textStyle: {
                color: 'white',
                fontSize: 12,
            },
            formatter: (name) => {
                let item = data.find(d => d.name === name);
                return `${name}   ${item?.value}%`;
            },
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['20%', '85%'],
                top: '8%',
                right: '15%',
                bottom: '5%',
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
                    formatter: '{d}%',
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
                data: data,
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
        height: calc(100% - 50px);
    }
}
</style>