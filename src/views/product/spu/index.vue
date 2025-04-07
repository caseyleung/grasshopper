<template>
    <div>
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <!-- 0：显示SPU -->
            <div v-show="scene === 0">
                <el-button type="primary" :disabled="!categoryStore.c3Id" icon="Plus" @click="addSpu">添加SPU</el-button>
                <!-- 展示已有SPU数据 -->
                <el-table :data="tableData" style="margin: 20px 0px;" border>
                    <el-table-column label="序号" type="index" width="80" align="center">
                        <template #default="{ $index }">
                            {{ (currentPage - 1) * pageSize + $index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="SPU名称" prop="spuName" width="140" align="center"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" align="center"></el-table-column>
                    <el-table-column label="操作" width="240" align="center">
                        <template #="{ row, $index }">
                            <el-button type="primary" title="添加SKU" size="small" icon="Plus"
                                @click="addSku"></el-button>
                            <el-button @click="updateSpu(row)" type="warning" title="修改SPU" size="small"
                                icon="Edit"></el-button>
                            <el-button type="info" title="查看SKU列表" size="small" icon="MoreFilled"></el-button>
                            <el-button type="danger" title="删除SPU" size="small" icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 50]" :size="size" :disabled="disabled" :background="background"
                    layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
            <!-- 1：添加或者修改SPU -->
            <SpuForm ref="spu" v-show="scene === 1" @changeScene="changeScene"></SpuForm>
            <!-- 2：添加SKU -->
            <SkuForm v-show="scene === 2"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ComponentSize } from 'element-plus'
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu } from '@/api/product/spu';
import { HasSpuResponseData } from '@/api/product/spu/type';
import type { Records, SpuData } from '@/api/product/spu/type';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { useLoadingStore } from '@/store/modules/loading';


let scene = ref(0); // 0：显示SPU， 1：添加或者修改SPU， 2：添加SKU
const currentPage = ref(1);
const pageSize = ref(10);
const size = ref<ComponentSize>('default');
const background = ref(true);
const disabled = ref(false);
const total = ref(0);
const tableData = ref<Records>([]);
let spu = ref<any>();

let categoryStore = useCategoryStore();
let loadingStore = useLoadingStore();

const hasSpu = async () => {
    loadingStore.show("正在加载SPU数据...")
    try {
        let result: HasSpuResponseData = await reqHasSpu(currentPage.value, pageSize.value, categoryStore.c3Id);
        if (result.code === 200) {
            tableData.value = result.data.records;
            total.value = result.data.total;
        }
    } finally {
        loadingStore.hide();
    }
}

watch(() => categoryStore.c3Id, (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
        hasSpu();
    } else {
        tableData.value = [];
    }
})

watch(()=> scene.value, (newVal, oldVal)=> {
    if(newVal === 0) {
        hasSpu();
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


const addSpu = () => {
    scene.value = 1;
    // 调用子组件实列方法
    spu.value.initAddSpuData(categoryStore.c3Id);
};

const addSku = () => {
    console.log("add sku!")
}

const updateSpu = (row: SpuData) => {
    scene.value = 1;
    // 调用子组件实列方法
    spu.value.initHasSpuData(row);
};

const changeScene = (num: number) => {
    scene.value = num;
    hasSpu(); // 重新获取SPU数据
}

</script>

<style scoped></style>