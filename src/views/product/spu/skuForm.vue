<template>
    <div>
        <el-form label-width="100" label-position="right">
            <el-form-item label="SKU名称">
                <el-input v-model="skuParams.skuName" placeholder="请输入SKU名称"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input v-model="skuParams.price" placeholder="价格(元)" type="number"></el-input>
            </el-form-item>
            <el-form-item label="重量(克)">
                <el-input v-model="skuParams.weight" placeholder="重量(克)" type="number"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input v-model="skuParams.skuDesc" placeholder="SKU描述" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                        <el-select v-model="item.attrIdAndValueId" style="width: 140px">
                            <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.attrId"
                                :label="attrValue.valueName" :value="`${item.id} : ${attrValue.id}`">
                                {{ attrValue.valueName }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true">
                    <el-form-item v-for="(item, index) in saleArr" :key="item.id"
                        :label="item.saleAttrName">
                        <el-select style="width: 100px" v-model="item.saleIdAndValueId">
                            <el-option v-for="(saleValue, index) in item.spuSaleAttrValueList" :key="saleValue.id"
                                :value="`${item.id} : ${saleValue.id}`" :label="saleValue.saleAttrValueName">{{
                                saleValue.saleAttrValueName }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table :data="imgArr" border ref="tableRef">
                    <el-table-column type="selection" width="80" align="center"></el-table-column>
                    <el-table-column label="图片" align="center">
                        <template #="{ row, $index }">
                            <el-image :src="row.imgUrl"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName" align="center"></el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" @click="setDefaultImg(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr';
import { reqAddSku, reqSpuImageList, reqSpuSaleAttrList } from '@/api/product/spu';
import { SaleAttr, SkuData } from '@/api/product/spu/type';
import useCategoryStore from '@/store/modules/category';
import { useLoadingStore } from '@/store/modules/loading';
import { mock_all_sale_attr_of_123, mock_all_spu_image_of_123, mock_req_attr } from '@/views/product/spu/mock_data';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene']);
let categoryStore = useCategoryStore();
let loading = useLoadingStore();

let attrArr = ref<any[]>([]);
let imgArr = ref<any[]>([]);
let saleArr = ref<SaleAttr[]>([]);
let skuParams = reactive<SkuData>({
    category3Id: 0,
    spuId: 0,
    tmId: 0,
    // v-model 收集
    skuName: "",
    price: 0,
    weight: 0,
    skuDefaultImg: "",
    skuDesc: "",
    skuSaleAttrValueList: [{ saleAttrId: '', saleAttrValueId: '' }],
    skuAttrValueList: [{ attrId: '', valueId: '' }],
});
let tableRef = ref<any>(null);

const initSkuData = async (spu: any) => {
    loading.show("正在加载SKU数据...");

    try {
        let c1Id = categoryStore.c1Id;
        let c2Id = categoryStore.c2Id;
        let c3Id = spu.category3Id;
        let id = spu.id;
        skuParams.category3Id = c3Id;
        skuParams.spuId = id;
        skuParams.tmId = spu.tmId;

        const [all_attr, spu_image_list, spu_has_sale_attr] = await Promise.all([
            reqAttr(c1Id, c2Id, c3Id).catch(error => {
                console.error('Failed to fetch all_attr:', error);
                return { data: mock_req_attr }; // 默认值
            }),
            reqSpuImageList(id).catch(error => {
                console.error('Failed to fetch spu_image_list:', error);
                return { data: mock_all_spu_image_of_123 }; // 默认值
            }),
            reqSpuSaleAttrList(id).catch(error => {
                console.error('Failed to fetch spu_has_sale_attr:', error);
                return { data: mock_all_sale_attr_of_123 }; // 默认值
            }),
        ]);

        // attrArr.value = Array.isArray(all_attr.data) ? all_attr.data : [];
        let mock_data: any = { data: mock_req_attr.data };
        attrArr.value = mock_data.data;
        imgArr.value = spu_image_list.data;
        saleArr.value = spu_has_sale_attr.data;

        console.log('all_attr: ', attrArr.value);
        console.log('spu_img_list: ', imgArr.value);
        console.log('spu_has_sale: ', saleArr.value);

    } finally {
        loading.hide();
    }
};


defineExpose({ initSkuData })

const cancel = () => {
    $emit('changeScene', 0);
}

const setDefaultImg = (row: any) => {
    imgArr.value.forEach(item => {
        tableRef.value.toggleRowSelection(item, false);
    });
    tableRef.value.toggleRowSelection(row, true);
    skuParams.skuDefaultImg = row.imgUrl;
}

const save = async () => {
    console.log('Saving SKU data:', skuParams);
    
    // 设置销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev, next) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
            prev.push({
                saleAttrId,
                saleAttrValueId 
            })
        }
        return prev;
    }, []);
    
    
    // 设置平台属性
    skuParams.skuAttrValueList = attrArr.value.reduce((prev, next) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':');
            prev.push({
                attrId,
                valueId
            })
        }
        return prev;
    }, []);

    // 添加sku
    let res = await reqAddSku(skuParams);
    console.log(res);

    if (res.code == 200) {
        ElMessage.success("添加SKU成功");
        $emit('changeScene', 0);
    } else {
        ElMessage.error("添加SKU失败");
    }
}
</script>

<style scoped></style>