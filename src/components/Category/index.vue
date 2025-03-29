<template>
    <div>
        <el-card style="margin: 10px 0px;">
            <el-form :inline="true" label-position="right" style="padding-top: 20px;">
                <el-form-item label="一级分类">
                    <el-select v-model="categoryStore.c1Id" :disabled="scene===1" @change="getCategory2" style="width: 150px;">
                        <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
                            :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select v-model="categoryStore.c2Id" :disabled="scene===1" @change="getCategory3" style="width: 150px;">
                        <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
                            :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select v-model="categoryStore.c3Id" :disabled="scene===1" style="width: 150px;">
                        <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name"
                            :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

defineProps(['scene']);

let categoryStore = useCategoryStore();

const getCategory2 = () => {
    let id = categoryStore.c1Id;
    categoryStore.getC2(id);
    categoryStore.c2Arr = [];
    categoryStore.c2Id = '';
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
}

const getCategory3 = () => {
    let id = categoryStore.c2Id;
    categoryStore.getC3(id);
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
}


onMounted(() => {
    categoryStore.getC1();
})

</script>

<style scoped></style>