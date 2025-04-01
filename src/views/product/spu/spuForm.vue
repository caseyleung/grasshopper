<template>
    <div>
        <el-form label-width="100">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 220px;">
                    <el-option value="11">11</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item inline="true" label="SPU销售属性">
                <el-select style="width: 220px;">
                    <el-option value="11">11</el-option>
                </el-select>
                <el-button style="margin: 10px 10px;" type="primary" icon="Plus">添加销售属性</el-button>
            </el-form-item>
            <el-table style="margin: 10px 0px;" border>
                <el-table-column label="序号" type="index" align="center" width="80xp"></el-table-column>
                <el-table-column label="属性名" align="center"></el-table-column>
                <el-table-column label="属性值" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="80xp">
                    <template #="{ row }">
                        <el-button type="danger" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const $emit = defineEmits(['changeScene']);

const imageUrl = ref('')

const cancel = () => {
    $emit('changeScene', 0);
}

</script>

<style scoped></style>