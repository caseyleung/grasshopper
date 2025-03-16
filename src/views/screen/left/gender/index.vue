<template>
    <div class="box">
        <div class="title">
            <p>男女比例</p>
            <img src="/screen/dataScreen-title.png" alt="">
        </div>
        <div class="gender">
            <div class="male">
                <img src="/screen/man.png" alt="">
            </div>
            <div class="female">
                <img src="/screen/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { min } from 'moment';
import { onMounted, ref } from 'vue';

let charts = ref()

onMounted(() => {
    let mycharts = echarts.init(charts.value);

    mycharts.setOption({
        title: {
            text: '男女比例',
            textStyle: {
                color: 'skyblue'
            },
            left: '40%',
        },
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
                data: [58],
                barWidth: 20,
                z: 10,
                itemStyle: {
                    color: '#3076fd',
                    borderRadius: 50,
                }
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                barGap: '-100%',
                itemStyle: {
                    color: '#f64a79',
                    borderRadius: 50,
                }
            }
        ],
        grid: {
            // left: 0,
        }
    })
})

</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    background: url(/screen/dataScreen-main-lc.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 28px;
        }
    }

    .gender {
        display: flex;
        justify-content: center;

        .male {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(/screen/man-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .female {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(/screen/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
        font-size: 20px;

        p {
            &:first-child {
                margin-left: 50px;
            }

            &:last-child {
                margin-right: 50px;
            }
        }
    }

    .charts {
        height: 100px;
    }
}
</style>