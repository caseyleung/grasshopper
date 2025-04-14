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
                                @click="addSku(row)"></el-button>
                            <el-button @click="updateSpu(row)" type="warning" title="修改SPU" size="small"
                                icon="Edit"></el-button>
                            <el-button @click="findSku(row)" type="info" title="查看SKU列表" size="small"
                                icon="MoreFilled"></el-button>
                            <!-- <el-button type="danger" title="删除SPU" size="small" icon="Delete"></el-button> -->
                            <el-popconfirm :title="`确定删除${row.spuName}吗？`" width="180"  @confirm="removeSpu(row.id)">
                                <template #reference>
                                    <el-button type="danger" title="删除SPU" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
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
            <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene"></SkuForm>
            <!-- 3：查看SKU列表 -->
            <el-dialog v-model="dialogVisible" title="SKU列表" width="80%">
                <el-table :data="skuList" border>
                    <el-table-column label="SKU名称" prop="skuName" width="140" align="center"></el-table-column>
                    <el-table-column label="SKU价格" prop="price" align="center"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight" align="center"></el-table-column>
                    <el-table-column label="SKU图片" align="center">
                        <template #="{ row }">
                            <el-image :src="row.skuDefaultImg" width="50" height="50"></el-image>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { ElMessage, type ComponentSize } from 'element-plus'
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu, reqRemoveSpu, reqSkuInfo } from '@/api/product/spu';
import { HasSpuResponseData } from '@/api/product/spu/type';
import type { Records, SkuData, SpuData } from '@/api/product/spu/type';
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
let sku = ref<any>();
let skuList = ref<SkuData[]>([]);
let dialogVisible = ref(false);

let categoryStore = useCategoryStore();
let loadingStore = useLoadingStore();

const hasSpu = async () => {
    //  判断是否选择了分类
    if (!categoryStore.c3Id) {
        ElMessage.warning("请先选择分类！");
        return;
    }
    loadingStore.show("正在加载SPU数据...");
    try {
        const result: HasSpuResponseData = await reqHasSpu(currentPage.value, pageSize.value, categoryStore.c3Id);
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

// watch(()=> scene.value, (newVal, oldVal)=> {
//     if(newVal === 0) {
//         hasSpu();
//     }
// })

const removeSpu = async (spuId: number | string) => {
    loadingStore.show("正在删除SPU...");
    try {
        let res = await reqRemoveSpu(spuId);
        console.log(res);

        if (res.code == 200) {
            ElMessage.success("删除SPU成功");
            hasSpu();
        } else {
            ElMessage.error("删除SPU失败");
        }
    } finally {
        loadingStore.hide();
    }
}

const findSku = async (row: SpuData) => {
    loadingStore.show("正在加载SKU列表...");
    try {
        let res = await reqSkuInfo(row.id);
        console.log(res);

        if (res.code == 200) {
            skuList.value = res.data;
            dialogVisible.value = true;
        } else {
            ElMessage.error("获取SKU列表失败");
        }
    } finally {
        loadingStore.hide();
    }
}

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

const addSku = (row: SpuData) => {
    scene.value = 2;
    sku.value.initSkuData(row);
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

onBeforeUnmount(() => {
    categoryStore.$reset();
})

</script>

<style scoped></style>