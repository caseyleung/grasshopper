<template>
    <!-- 左侧静态 -->
    <el-icon style="margin-left: 10px;" @click="changeIcon" size="large">
        <component :is="$layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item 
            v-for="(item, index) in $route.matched" 
            :key="index" 
            :to="resolvePath(item.path)"
            v-show="item.meta.title">
            <el-icon style="margin: 0px 4px; vertical-align: top;" v-if="item.meta.icon">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>

</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

let $route = useRoute();
let router = useRouter();

let $layoutSettingStore = useLayoutSettingStore();

const getRoute = () => {
    console.log($route)
    // let first = $route.meta
    ElMessage.success($route.meta.title)
}

// 解析面包屑路径，确保 `item.path` 是完整路径
const resolvePath = (path: string) => {
    return path.startsWith('/') ? path : router.resolve(path).href;
};

const changeIcon = () => {
    $layoutSettingStore.fold = !$layoutSettingStore.fold;
}

</script>

<style scoped></style>