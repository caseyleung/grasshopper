<template>
    <div>
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" :disabled="!categoryStore.c3Id" icon="Plus">添加SPU</el-button>
            <el-table :data="tableData" style="margin: 20px 0px;" border>
                <el-table-column label="序号" type="index" width="80" align="center">
                    <template #default="{ $index }">
                        {{ (currentPage - 1) * pageSize + $index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column label="SPU名称" prop="spuName" width="140" align="center"></el-table-column>
                <el-table-column label="SPU描述" prop="description" align="center"></el-table-column>
                <el-table-column label="操作" width="240" align="center">
                    <template #="{row, $index}">
                        <el-button type="primary" title="添加SKU" size="small" icon="Plus"></el-button>
                        <el-button type="warning" title="修改SPU" size="small" icon="Edit"></el-button>
                        <el-button type="info" title="查看SKU列表" size="small" icon="MoreFilled"></el-button>
                        <el-button type="danger" title="删除SPU" size="small" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]" :size="size" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ComponentSize } from 'element-plus'
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu } from '@/api/product/spu';
import { HasSpuResponseData } from '@/api/product/spu/type';
import type { Records } from '@/api/product/spu/type';

let scene = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const size = ref<ComponentSize>('default');
const background = ref(true);
const disabled = ref(false);
const total = ref(0);
const tableData = ref<Records>([]);

let categoryStore = useCategoryStore();

const hasSpu = async () => {
    let result: HasSpuResponseData = await reqHasSpu(currentPage.value, pageSize.value, categoryStore.c3Id);
    if (result.code === 200) {
        tableData.value = result.data.records;
        total.value = result.data.total;
    }
}

watch(() => categoryStore.c3Id, (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
        hasSpu();
    } else {
        tableData.value = [];
    }
})


const handleSizeChange = (val: number) => {
    pageSize.value = val;
    hasSpu();
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    hasSpu();
}


</script>

<style scoped></style>