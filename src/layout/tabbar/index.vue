<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>

    </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to right, #ff7e5f, #feb47b);
    // background-color: aquamarine;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 10px;
        // background-color: cadetblue;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
}
</style>