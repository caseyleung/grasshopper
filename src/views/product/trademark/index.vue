<template>
    <el-card class="card-box">
        <el-button type="primary" icon="Plus" size="default">添加品牌</el-button>
        <el-table class="itable" border>
            <el-table-column prop="date" label="序号" align="center" width="80"/>
            <el-table-column prop="name" label="品牌名称" align="center"/>
            <el-table-column prop="address" label="品牌logo" align="center"/>
            <el-table-column prop="operate" label="操作" align="center"/>
        </el-table>
        <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper, ->,total, sizes"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
const currentPage4 = ref(1)
const pageSize4 = ref(100)
const size = ref<ComponentSize>('default')
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


</script>

<style scoped lang="scss">
.card-box {

    .itable {
        width: "100%";
        margin-top: 10px;
        margin-bottom: 20px;
    }

}
</style>