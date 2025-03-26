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
                <el-table-column prop="raw" label="原数据" align="center">
                    <template #default="{ row }">
                        {{ row }}
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="操作" align="center">
                    <template #default="{ row }">
                        <el-button type="warning" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.tmName}吗？`" width="200px" icon="Delete" icon-color="red"
                            @confirm="deleteTrademark(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]" :size="size" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->,total, sizes" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
        <!-- 对话框组件 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="500">
            <!-- :ref="formRef" 不会自动绑定 ref 变量，（X） -->
            <el-form :model="trademarkParams" style="width: 80%;" :rules="trademarkRules" ref="formRef">
                <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
                    <el-input v-model="trademarkParams.tmName" autocomplete="off" placeholder="请输入品牌名称" />
                </el-form-item>
                <el-form-item label="品牌logo" :label-width="formLabelWidth" prop="logoUrl">
                    <el-upload action="/api/admin/product/fileUpload" 
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload" 
                        :on-success="handleAvatarSuccess" 
                        :limit="1"
                        :on-exceed="handleExceed" 
                        ref="upload" 
                        :file-list="fileList" 
                        :on-remove="handleRemove"
                        :on-preview="handlePictureCardPreview" 
                        :auto-upload="true">
                        <el-icon>
                            <Plus />
                        </el-icon>

                        <template #file="{ file }">
                            <div>
                                <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" /> -->
                                <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
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
                    <el-button type="primary" @click="confirm">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import type { ComponentSize, UploadFile, UploadProps, UploadRawFile, UploadInstance } from 'element-plus';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import { ElMessage, genFileId } from "element-plus";

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
const upload = ref<UploadInstance>()
const fileList = ref([])
const formRef = ref()

const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: '',
})

const handleSizeChange = () => getHasTrademark();
const handleCurrentChange = () => getHasTrademark();

const getHasTrademark = async () => {
    loading.value = true; // 开始加载
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
    } finally {
        loading.value = false; // 结束加载
    }
}

const addTrademark = () => {
    dialogFormVisible.value = true;
    // 清空trademarkParams数据
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    fileList.value = [];
    // 清理校验结果
    formRef.value.clearValidate();
}

const updateTrademark = (row: TradeMark) => {
    dialogFormVisible.value = true;
    // trademarkParams.id = row.id;
    // trademarkParams.tmName = row.tmName;
    // trademarkParams.logoUrl = row.logoUrl;
    Object.assign(trademarkParams, row);
    // fileList.value = row.logoUrl ? [{ name: "logo.png", url: row.logoUrl }] : [];
    fileList.value = row.logoUrl ? [{ name: "logo.png", url: row.logoUrl, uid: genFileId() }] : [];
}

const deleteTrademark = async (id: number) => {
    // 发送删除请求，判断是否成功并给出相应提示，然后重新刷新页面
    let result = await reqDeleteTrademark(id);
    if (result.code === 200) {
        ElMessage.success('删除品牌成功');
        getHasTrademark();
    } else {
        ElMessage.error('删除品牌失败');
    }
}

const confirm = async () => {
    if (!formRef.value && !fileList.value) {
        ElMessage.error("表单未加载，请重试！");
        return;
    }

    // 发起请求前，先对整个表单做校验
    try {
        await formRef.value.validate(); // 校验通过是true
    } catch (err) {
        console.log('confirm error', err, formRef.value);
        ElMessage.error("请检查输入内容！");
        return;
    }

    let result: any = await reqAddOrUpdateTrademark(trademarkParams);

    // 关闭dialog，弹出提示成功，重新获取全部数据
    if (result.code === 200) {
        let message = trademarkParams.id ? '修改品牌成功!' : '添加品牌成功！'
        ElMessage.success(message);
        getHasTrademark();
    } else {
        let message = trademarkParams.id ? '修改品牌失败!' : '添加品牌失败！'
        ElMessage.error(message);
    }
    dialogFormVisible.value = false;
}

const cancel = () => {
    dialogFormVisible.value = false;
}

const handleRemove = (file: UploadFile) => {
    fileList.value = [];
    trademarkParams.logoUrl = '';
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url || trademarkParams.logoUrl;
    dialogVisible.value = true;
}

const handleDownload = (file: UploadFile) => {
    ElMessage.info(`下载功能未实现 ${file}`)
}


const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('上传的文件必须是 JPEG 或 PNG!');
        return false;
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('文件大小需要小于4MB!');
        return false;
    }
    return true;
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    // trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!);
    trademarkParams.logoUrl = response.data;
    ElMessage.success("图片上传成功");
    // 清除掉对应的图片校验
    formRef.value.clearValidate('logoUrl');
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
}

const validatorTmName = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback();
    } else {
        callback(new Error('品牌名称要大于等于2位'))
    }
}

const validatorLogoUrl = (rule: any, value: any, callback: any) => {
    if (value) {
        callback();
    } else {
        callback(new Error("LOGO图片必须上传"))
    }
}

const trademarkRules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, trigger: 'change', validator: validatorLogoUrl }
    ]
}

onMounted(() => getHasTrademark());

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