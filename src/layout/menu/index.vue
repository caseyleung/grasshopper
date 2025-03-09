<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 只有一个子路由 -->
        <el-menu-item v-if="item.children && item.children.length == 1 && !item.meta.hidden"
            :index="item.children[0].path">
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 大于一个子路由 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1 && !item.meta.hidden">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归调用自身 -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// 递归组件需要正确注册
defineProps<{ menuList: any[] }>();
</script>

<script lang="ts">
export default {
    name: "Menu",
};
</script>

<style scoped></style>
