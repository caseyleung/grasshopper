<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="$base-menu-backgroucolor" text-color="white" router>
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">tabbar</div>
        <!-- 内容展示 -->
        <div class="layout_main">
            main
            <p style="height: 100vh; background-color: burlywood;">123</p>

        </div>

    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'


let userStore = useUserStore();

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: beige;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-backgroucolor;

        .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            margin: 10px;
            text-align: center;
            border-radius: 4px;
            background: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
        }

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0px;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background-color: darkgrey;
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        background-color: cornflowerblue;
        padding: 20px;
        overflow: auto;
    }
}
</style>