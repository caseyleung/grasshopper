<template>
    <div class="box">
        <div class="title">
            <p>预约渠道数据统计</p>
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
    let data = [
        { value: 40, name: '智慧文旅' },
        { value: 10, name: '携程' },
        { value: 20, name: '飞猪' },
        { value: 30, name: '其他平台' }
    ];

    myChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            textStyle: {
                color: 'white'
            },
            orient: 'vertical',
            itemGap: 24,
            icon: 'circle',
            // data: ['智慧文旅', '携程', '飞猪', '其他平台'],
            formatter: (name) => {
                let item = data.find(d => d.name === name);
                return `${name} ---- ${item?.value}%`;
            },
            top: '25%',
            left: '5%',
        },
        series: [
            {
                name: '平台占比',
                type: 'pie',
                radius: ['60%', '80%'],// 饼图大小
                center: ['70%', '50%'], // 位置
                data: data,
                label: {
                    show: false,
                },
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }
        ]
    });
});


</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: url(/screen/dataScreen-main-rb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;

    .title {
        margin-left: 10px;

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