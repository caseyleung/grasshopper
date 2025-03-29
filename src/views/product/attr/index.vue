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
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <div class="table" v-show="scene === 0">
                <el-button type="primary" icon="Plus" size="default" :disabled="!categoryStore.c3Id"
                    @click="addAttr">添加属性</el-button>
                <el-table border :data="attrArr" style="margin: 10px 0px;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" prop="attrName" align="center"></el-table-column>
                    <el-table-column label="属性值名称" align="center">
                        <template #="{ row, $index }">
                            <el-tag v-for="(item, index) in row.attrValueList" :key="item.id"
                                style="margin: 5px 5px;">{{
                                    item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120px">
                        <template #="{ row, $index }">
                            <el-button type="warning" size="small" icon="Edit" @click="updateAttr"></el-button>
                            <el-button type="danger" size="small" icon="Delete" @click="deleteAttr"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="addAttr" v-show="scene === 1">
                <el-form>
                    <el-form-item label="属性名称" :inline="true">
                        <el-input v-model="attrParams.attrName" placeholder="请输入属性名称" style="width: 160px;"></el-input>
                    </el-form-item>
                    <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName"
                        @click="handleAddAttr">添加属性值</el-button>
                    <el-table :data="attrParams.attrValueList" style="margin: 20px 0px;" border>
                        <el-table-column label="序号" type="index" align="center" width="80px">
                        </el-table-column>
                        <el-table-column label="属性值" align="center">
                            <template #="{ row, $index }">
                                <div v-if="row.editing">
                                    <el-input v-model="row.valueName" placeholder="请输入属性值名称"
                                        @blur="checkEditing(row, $index)"></el-input>
                                </div>
                                <div v-else @click="row.editing = true">
                                    {{ row.valueName || '点击输入属性值名称' }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="120px">
                            <template #="{ row, $index }">
                                <el-button type="danger" size="small" icon="Delete"
                                    @click="deleteAttrRow($index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="save"
                        :disabled="attrParams.attrValueList.length === 0">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form>
            </div>
        </el-card>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { reqAddOrUpdateAttr, reqAttr } from "@/api/product/attr";
import type { AttrResponseData, Attr, AttrValue } from "@/api/product/attr/type";
import useCategoryStore from "@/store/modules/category";
import { ElMessage } from "element-plus";

let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
let scene = ref(0);
let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
})

watch(() => categoryStore.c3Id, () => {
    attrArr.value = [];
    if (categoryStore.c3Id) {
        getAttr();
    }
})

// 获取已有的属性与属性值的方法
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code === 200) {
        attrArr.value = result.data;
    }
}

const checkEditing = (row: AttrValue, $index: number) => {
    const value = row.valueName?.trim();
    if (!value) {
        attrParams.attrValueList.splice($index, 1);
        ElMessage.warning("属性值不能为空！");
        return;
    }

    if (attrParams.attrValueList.find((item, index) => index !== $index && item.valueName === value)) {
        ElMessage.error(`${value} 已经存在！`);
        attrParams.attrValueList.splice($index, 1);
        return;
    }
    row.valueName = value;
    row.editing = false;
};


const handleAddAttr = () => {
    attrParams.attrValueList.push({
        valueName: '',
        editing: true,
    })
}

const save = async () => {
    let result: any = await reqAddOrUpdateAttr(attrParams);
    if (result.code === 200) {
        let msg = attrParams.id === 0 ? "修改属性成功!" : "添加属性成功!";
        ElMessage.success(msg);
        scene.value = 0;
        getAttr();
    } else {
        let msg = attrParams.id === 0 ? "修改属性失败!" : "添加属性失败!";
        ElMessage.error(msg);
    }
}

const addAttr = () => {
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3,
    })
    scene.value = 1;
}

const updateAttr = () => {
    scene.value = 1;
}

const deleteAttr = () => {
    console.log(111);
}

const deleteAttrRow = (rowIndex: number) => {
    attrParams.attrValueList.splice(rowIndex, 1);
}

const cancel = () => {
    scene.value = 0;
}

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