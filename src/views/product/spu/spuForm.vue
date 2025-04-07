<template>
    <div>
        <el-form label-width="100">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select v-model="SpuParams.tmId" style="width: 220px;">
                    <el-option v-for="(item, index) in AllTrademarkList" :key="item.id" :label="item.tmName"
                        :value="item.id">{{ item.tmName }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload v-model:file-list="ImgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                    :before-upload="beforeUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item inline="true" label="SPU销售属性">
                <el-select style="width: 220px;"
                    :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : `无`"
                    v-model="saleAttrIdAndName">
                    <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name"
                        :value="`${item.id}:${item.name}`">{{ item.name }}</el-option>
                </el-select>
                <el-button :disabled="!saleAttrIdAndName" style="margin: 10px 10px;" type="primary" icon="Plus"
                    @click="addSaleAttr">添加属性</el-button>
            </el-form-item>
            <!-- SPU销售属性展示 -->
            <el-table :data="SaleAttr" style="margin: 10px 0px;" border>
                <el-table-column label="序号" type="index" align="center" width="80xp"></el-table-column>
                <el-table-column prop="saleAttrName" label="属性名" align="center" width="150px"></el-table-column>
                <el-table-column label="属性值" align="center">
                    <template #="{ row, $index }">
                        <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" closable
                            :disable-transitions="false" @close="handleClose(row, item)" style="margin: 5px 5px;">
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.editing" ref="InputRef" v-model="row.spuSaleAttrValue" class="w-20"
                            size="small" @keyup.enter="handleInputConfirm(row)" @blur="handleInputConfirm(row)"
                            placeholder="请输入属性值" />
                        <el-button v-else class="button-new-tag" type="success" size="small" @click="showInput(row)"
                            icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80xp">
                    <template #="{ row }">
                        <el-button type="danger" icon="Delete" @click="deleteSaleAttrValue(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button :disabled="!SaleAttr.length" type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { reqAddOrUpdateSpu, reqAllSaleAttrList, reqAllTrademark, reqHasSpu, reqSpuImageList, reqSpuSaleAttrList } from '@/api/product/spu';
import { HasSaleAttr, SaleAttr, SaleAttrValue, SpuData, SpuImage, Trademark } from '@/api/product/spu/type';
import { mock_all_trademark, mock_all_sale_attr, mock_all_sale_attr_of_123, mock_all_spu_image_of_123 } from '@/views/product/spu/mock_data';
import { ElMessage } from 'element-plus';
import type { InputInstance, UploadProps } from 'element-plus';
import { useLoadingStore } from '@/store/modules/loading';

const $emit = defineEmits(['changeScene']);

const loadingStore = useLoadingStore();

let AllTrademarkList = ref<Trademark[]>([]);
let ImgList = ref<SpuImage[]>([]);
let SaleAttr = ref<SaleAttr[]>([]);
let AllSaleAttr = ref<HasSaleAttr[]>([]);
let SpuParams = ref<SpuData>({
    spuName: "",
    description: "",
    category3Id: "",
    tmId: "",
    spuSaleAttrList: [],
    spuImageList: [],
});
let dialogImageUrl = ref('');
let dialogVisible = ref(false);

let InputRef = ref<InputInstance>();
let saleAttrIdAndName = ref<string>('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code !== 200) {
        ElMessage.error("图片上传失败，请重新上传！");
        return;
    }
    ElMessage.success("图片上传成功");
    console.log('imglist ------- > ', ImgList.value);
};


const save = async () => {
    loadingStore.show("正在保存...");
    try {
        // 整理SPU照片数据
        SpuParams.value.spuImageList = ImgList.value.map(item => {
            return {
                imgName: item.name,
                imgUrl: (item.response && item.response.data) || item.url,
            }
        });
        // 整理SPU销售属性数据
        SpuParams.value.spuSaleAttrList = SaleAttr.value;
        // 发送请求：添加SPU | 更新SPU
        let result = await reqAddOrUpdateSpu(SpuParams.value);
        // 成功
        if (result.code === 200) {
            let message = SpuParams.value.id ? 'SPU更新成功！' : 'SPU添加成功！';
            ElMessage.success(message);
            $emit('changeScene', 0); // 返回到SPU列表
            return;
        } else {
            let message = SpuParams.value.id ? 'SPU更新失败！' : 'SPU添加失败！';
            ElMessage.error(message);
            return;
        }
    } finally {
        loadingStore.hide();
    }
}

const addSaleAttr = () => {
    // 1. 获取当前选择的销售属性ID和名称
    let [saleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':');
    // 2. 判断当前选择的销售属性是否已经存在
    let isExist = SaleAttr.value.some(item => item.saleAttrName === saleAttrName);
    if (isExist) {
        ElMessage.error('该销售属性已经存在，请重新选择！');
        return;
    }
    // 3. 添加新的销售属性
    SaleAttr.value.push({
        baseSaleAttrId: Number(saleAttrId),
        saleAttrName: saleAttrName,
        spuSaleAttrValueList: [],
    });
    // 4. 清空选择的销售属性ID和名称
    saleAttrIdAndName.value = '';
}

// 计算当前SPU还没有拥有的销售属性
const unSelectSaleAttr = computed(() => {
    // 全部销售属性：颜色、尺码、版本
    // 已经选择的销售属性：颜色、尺码
    return AllSaleAttr.value.filter(item => {
        let aa = SaleAttr.value.some(attr => attr.saleAttrName === item.name);
        return !aa;
    })
});

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
}

const handleClose = (row: SaleAttr, item: SaleAttrValue) => {
    row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1);
}

// 处理输入框的确认事件
const handleInputConfirm = (row: SaleAttr) => {
    // 收集属性ID和属性名称
    row.editing = false;

    if (!row.spuSaleAttrValue || row.spuSaleAttrValue.trim() === '') {
        ElMessage.error('请输入属性值！');
        return;
    }

    // 判断当前输入的属性值是否已经存在
    let isExist = row.spuSaleAttrValueList.some(item =>
        item.saleAttrValueName === row.spuSaleAttrValue);
    if (isExist) {
        ElMessage.error('该属性值已经存在，请重新输入！');
        return;
    }

    row.spuSaleAttrValueList = row.spuSaleAttrValueList || [];
    let { baseSaleAttrId, saleAttrName } = row;
    row.spuSaleAttrValueList.push({
        baseSaleAttrId: baseSaleAttrId,
        saleAttrName: saleAttrName,
        saleAttrValueName: row.spuSaleAttrValue,
        id: Date.now(), // 临时ID，后续需要替换为真实ID
    })
    // 清空输入框的值
    row.spuSaleAttrValue = '';
}

const deleteSaleAttrValue = (row: SaleAttr) => {
    const index = SaleAttr.value.indexOf(row);
    if (index > -1) {
        SaleAttr.value.splice(index, 1);
    }
}

const showInput = (row: SaleAttr) => {
    row.editing = true;
    nextTick(() => {
        InputRef.value!.input!.focus();
    })
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isAllowedType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
    if (!isAllowedType) {
        ElMessage.error('仅支持上传 JPEG、PNG、GIF 格式的图片!');
        return false;
    }

    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
        ElMessage.error('文件大小需要小于 4MB!');
        return false;
    }

    return true;
};


const cancel = () => {
    $emit('changeScene', 0);
}
// 目前你的代码是串行请求，每个请求会等待前一个请求完成后才执行。
// 如果其中一个请求失败（比如 reqAllTrademark() 失败），后续的请求就不会执行，
// 整个 initHasSpuData 函数会因为未处理的异常而中断。
// const initHasSpuData = async (spu: SpuData) => {
//     // 获取全部品牌的数据
//     let all_trademark: AllTrademark = await reqAllTrademark();
//     // 获取某个品牌下的全部售卖商品图片
//     let spu_image_list: SpuHasImg = await reqSpuImageList(spu.id as number);
//     let spu_has_sale_attr: SaleAttrResponseData = await reqSpuSaleAttrList(spu.id as number);
//     let all_sale_attr = await reqAllSaleAttrList();

//     AllTrademark.value = all_trademark?.data || [];
//     ImgList.value = spu_image_list?.data || [];
//     SaleAttr.value = spu_has_sale_attr?.data || [];
//     AllSaleAttr.value = all_sale_attr?.data || [];
// }

const initHasSpuData = async (spu: SpuData) => {
    loadingStore.show("正在加载SPU数据....");
    SpuParams.value = spu;

    if (!spu?.id) {
        console.error('Invalid SPU data:', spu);
        return;
    }

    try {
        // 并行请求，提高效率
        const [all_trademark, spu_image_list, spu_has_sale_attr, all_sale_attr] = await Promise.all([
            reqAllTrademark().catch(error => {
                console.error('Failed to fetch all_trademark:', error);

                return { data: mock_all_trademark }; // 失败时返回默认值，避免影响后续代码
            }),
            reqSpuImageList(spu.id as number).catch(error => {
                console.error('Failed to fetch spu_image_list:', error);
                return { data: mock_all_spu_image_of_123 };
            }),
            reqSpuSaleAttrList(spu.id as number).catch(error => {
                console.error('Failed to fetch spu_has_sale_attr:', error);
                return { data: mock_all_sale_attr_of_123 };
            }),
            reqAllSaleAttrList().catch(error => {
                console.error('Failed to fetch all_sale_attr:', error);
                return { data: mock_all_sale_attr };
            }),
        ]);

        // console.log('Fetched all_trademark:', all_trademark.data);
        console.log('Fetched spu_image_list:', spu_image_list.data);
        console.log('Fetched spu_has_sale_attr:', spu_has_sale_attr.data);
        console.log('Fetched all_sale_attr:', all_sale_attr.data);

        // 确保数据不会是 undefined 或 null
        AllTrademarkList.value = all_trademark.data;
        ImgList.value = spu_image_list.data.map((item: any) => ({
            name: item.imgName || '图片',
            url: item.imgUrl || '',
            status: 'success', // el-upload 展示用
        }));
        SaleAttr.value = spu_has_sale_attr.data;
        AllSaleAttr.value = all_sale_attr.data;
    } catch (error) {
        console.error('Unexpected error in initHasSpuData:', error);
    } finally {
        loadingStore.hide();
    }
};


const initAddSpuData = async (category3Id: string | number) => {
    loadingStore.show("正在加载SPU数据....");
    try {
        // 清空数据
        SpuParams.value = {
            spuName: "",
            description: "",
            category3Id: "",
            tmId: "",
            spuSaleAttrList: [],
            spuImageList: [],
        };
        ImgList.value = [];
        SaleAttr.value = [];
        AllSaleAttr.value = [];
        saleAttrIdAndName.value = '';

        SpuParams.value.category3Id = category3Id;

        const [all_trademark, all_sale_attr] = await Promise.all([
            reqAllTrademark().catch(error => {
                console.error('Failed to fetch all_trademark:', error);
                return { data: mock_all_trademark };
            }),
            reqAllSaleAttrList().catch(error => {
                console.error('Failed to fetch all_sale_attr:', error);
                return { data: mock_all_sale_attr };
            }),
        ]);

        AllTrademarkList.value = all_trademark.data;
        AllSaleAttr.value = all_sale_attr.data;
    } finally {
        loadingStore.hide();
    }
};


defineExpose({ initHasSpuData, initAddSpuData });

</script>

<style scoped></style>