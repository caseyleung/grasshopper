<template>
    <div>
        <el-card class="card-box">
            <el-button type="primary" icon="Plus" size="default" @click="addTrademark">添加品牌</el-button>
            <el-table class="itable" :data="tableData" v-loading="loading" border>
                <el-table-column type="index" label="序号" align="center" width="80">
                    <template #default="{ $index }">
                        {{ (currentPage - 1) * pageSize + $index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="tmName" label="品牌名称" align="center" />
                <el-table-column prop="address" label="品牌logo" align="center">
                    <template #default="{ row }">
                        <img :src="row.logoUrl" alt="logo" class="logo-img" />
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="{ row }">
                        {{ row }}
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="操作" align="center">
                    <template #default="{ row }">
                        <el-button type="warning" size="small" icon="Edit" @click="updateTrademark"></el-button>
                        <el-button type="danger" size="small" icon="Delete" @click="deleteTrademark"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]" :size="size" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->,total, sizes" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
        <!-- 对话框组件 -->
        <el-dialog v-model="dialogFormVisible" :title="title" width="500">
            <el-form :model="trademarkParams" style="width: 80%;">
                <el-form-item label="品牌名称" :label-width="formLabelWidth">
                    <el-input v-model="trademarkParams.tmName" autocomplete="off" placeholder="请输入品牌名称" />
                </el-form-item>
                <el-form-item label="品牌logo" :label-width="formLabelWidth">
                    <el-upload action="/api/admin/product/fileUpload" list-type="picture-card" :auto-upload="true">
                        <el-icon>
                            <Plus />
                        </el-icon>

                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <el-icon><zoom-in /></el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleDownload(file)">
                                        <el-icon>
                                            <Download />
                                        </el-icon>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleRemove(file)">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 插槽footer -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="confirm">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import type { ComponentSize, UploadFile } from 'element-plus';
import { reqHasTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import { ElMessage } from "element-plus";

const currentPage = ref(1);
const pageSize = ref(10);
const size = ref<ComponentSize>('default');
const background = ref(true);
const disabled = ref(false);
const total = ref(0);
const tableData = ref<Records>([]);
const loading = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const title = ref("");

const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: '',
})


const handleSizeChange = (val: number) => {
    if (loading.value) return;
    const prevSize = pageSize.value;
    pageSize.value = val;
    getHasTrademark(prevSize);
}
const handleCurrentChange = (val: number) => {
    if (loading.value) return;
    const prevPage = currentPage.value;
    currentPage.value = val;
    getHasTrademark(prevPage);
}

const getHasTrademark = async (prevPage?: number, prevSize?: number) => {
    loading.value = true; // 开始加载
    console.log("记录当前页码", prevPage, prevSize);
    try {
        let result: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value);
        if (result.code === 200) {
            total.value = result.data.total;
            tableData.value = result.data.records;
        } else {
            throw new Error("数据加载失败");
        }
    } catch (error) {
        console.log("请求失败： ", error);
        ElMessage.warning("加载数据失败，请稍后重试");
        // 回滚页码和分页大小
        if (prevPage !== undefined) currentPage.value = prevPage;
        if (prevSize !== undefined) pageSize.value = prevSize;
    } finally {
        loading.value = false; // 结束加载
    }
}

const addTrademark = () => {
    dialogFormVisible.value = true;
    title.value = "添加品牌";
}

const updateTrademark = () => {
    dialogFormVisible.value = true;
    title.value = "更新品牌";
}

const deleteTrademark = () => {
    dialogFormVisible.value = true;
    title.value = "删除品牌";
}

const confirm = () => {
    dialogFormVisible.value = false;
}

const cancel = () => {
    dialogFormVisible.value = false;
}

const handleRemove = (file: UploadFile) => {
    console.log('file--handleRemove', file)
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
    console.log(file)
}


onMounted(() => {
    getHasTrademark();
})

</script>

<style scoped lang="scss">
.card-box {

    .itable {
        width: "50%";
        margin: 20px 0px 20px 0px;

        .logo-img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            transition: transform 0.3s ease-in-out;
        }

        .logo-img:hover {
            position: absolute;
            transform: scale(5);
        }
    }

}
</style>