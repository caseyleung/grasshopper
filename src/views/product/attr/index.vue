<template>
    <div>
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
                            <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`您确定要删除 ${row.attrName} 属性吗？`" width="260px" icon="Delete"
                                icon-color="red" @confirm="deleteAttr(row)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
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
                                        @blur="checkEditing(row, $index)" :ref="(el) => setInputRef(el, $index)">
                                    </el-input>
                                </div>
                                <div v-else @click="inputEditing(row, $index)">
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
import { ref, reactive, watch, nextTick, onBeforeUnmount, ComponentPublicInstance } from "vue";
import { reqAddOrUpdateAttr, reqAttr, reqDelAttr } from "@/api/product/attr";
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
});
const inputRefs = ref<(HTMLElement | null)[]>([]);

watch(() => categoryStore.c3Id, () => {
    attrArr.value = [];
    if (categoryStore.c3Id) {
        getAttr();
    }
})

const setInputRef = (el: Element | ComponentPublicInstance | null, index: number) => {
    if (el instanceof HTMLElement) {
        inputRefs.value[index] = el;
    } else if (el && '$el' in el) {
        inputRefs.value[index] = el.$el as HTMLElement;
    }
}

// 获取已有的属性与属性值的方法
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code === 200) {
        attrArr.value = result.data;
    } else {
        throw new Error(result.message);
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

const inputEditing = (row: AttrValue, $index: number) => {
    row.editing = true;

    nextTick(() => {
        inputRefs.value[$index]?.focus();
    })
}

const handleAddAttr = () => {
    attrParams.attrValueList.push({
        valueName: '',
        editing: true,
    });

    nextTick(() => {
        // 自动聚焦到最新添加的输入框
        const lastIndex = attrParams.attrValueList.length - 1;
        inputRefs.value[lastIndex]?.focus();
    });
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

const updateAttr = (row: Attr) => {
    scene.value = 1;
    // 浅拷贝和深拷贝
    // attrParams.attrName = row.attrName;
    // attrParams.attrValueList = row.attrValueList;
    // Object.assign(attrParams, structuredClone(row));  // 不能处理 DOM 节点
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
    save();
}

const deleteAttr = async (row: Attr) => {
    let result: any = await reqDelAttr(row.id);
    if (result.code === 200) {
        ElMessage.success(`${row.attrName} 删除成功！`);
        // getAttr();
        // 直接从 attrArr 中移除被删除的属性，避免额外的请求
        attrArr.value = attrArr.value.filter(attr => attr.id !== row.id);
    } else {
        ElMessage.error(`${row.attrName} 删除失败！`);
    }
}

const deleteAttrRow = (rowIndex: number) => {
    attrParams.attrValueList.splice(rowIndex, 1);
}

const cancel = () => {
    scene.value = 0;
}

onBeforeUnmount(() => {
    categoryStore.$reset();
})
</script>

<style scoped lang="scss">
select {
    margin-right: 10px;
}
</style>