<template>
    <div>
        <el-card>
            <label for="province">省份：</label>
            <select id="province" v-model="selectedProvince">
                <option value="">请选择</option>
                <option v-for="p in provinces" :key="p.code" :value="p.code">{{ p.name }}</option>
            </select>

            <label for="city">城市：</label>
            <select id="city" v-model="selectedCity" :disabled="cities.length === 0">
                <option value="">请选择</option>
                <option v-for="c in cities" :key="c.code" :value="c.code">{{ c.name }}</option>
            </select>

            <label for="district">区县：</label>
            <select id="district" v-model="selectedDistrict" :disabled="districts.length === 0">
                <option value="">请选择</option>
                <option v-for="d in districts" :key="d.code" :value="d.code">{{ d.name }}</option>
            </select>
        </el-card>
        <Category></Category>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" icon="Plus" size="default" :disabled="!categoryStore.c3Id">添加属性</el-button>
            <el-table border style="margin: 10px 0px;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" align="center"></el-table-column>
                <el-table-column label="属性值名称" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="120px"></el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { ref, watch, onMounted, reactive } from "vue";

let categoryStore = useCategoryStore();


// **定义地区类型**
interface Area {
    code: number;
    name: string;
    level: number;
    pcode: number;
    children?: Area[];
}

// **存储地区数据**
const chinaData = ref<Area[]>([]);
const provinces = ref<Area[]>([]);
const cities = ref<Area[]>([]);
const districts = ref<Area[]>([]);

// **选中的省、市、区**
const selectedProvince = ref<number | null>(null);
const selectedCity = ref<number | null>(null);
const selectedDistrict = ref<number | null>(null);

// **1. 读取 area.json**
onMounted(async () => {
    try {
        const response = await fetch("/src/area_code_2022.json"); // 确保 area.json 在 public 目录
        chinaData.value = await response.json();
        provinces.value = chinaData.value; // 顶层即省份
    } catch (error) {
        console.error("加载 area.json 失败:", error);
    }
});

// **2. 省份变化 -> 加载城市**
watch(selectedProvince, (provinceCode) => {
    selectedCity.value = null;
    selectedDistrict.value = null;
    cities.value = [];
    districts.value = [];

    if (!provinceCode) return;

    const province = chinaData.value.find((p) => p.code === provinceCode);
    if (province && province.children) {
        cities.value = province.children;
    }
});

// **3. 城市变化 -> 加载区县**
watch(selectedCity, (cityCode) => {
    selectedDistrict.value = null;
    districts.value = [];

    if (!cityCode) return;

    const province = chinaData.value.find((p) => p.children?.some((c) => c.code === cityCode));
    const city = province?.children?.find((c) => c.code === cityCode);
    if (city && city.children) {
        districts.value = city.children;
    }
});

</script>

<style scoped lang="scss">
select {
    margin-right: 10px;
}
</style>