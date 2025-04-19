<template>
    <div>
        <el-table :data="tableData" style="width: 100%; margin: 20px 0;" row-key="id" border>
            <el-table-column prop="name" label="菜单名称" align="center" sortable />
            <el-table-column prop="code" label="权限标识" align="center" sortable />
            <el-table-column prop="updateTime" label="修改时间" align="center" sortable />
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <el-button type="primary" size="small" :disabled="isAddDisabled(row)" @click="addMenu(row)">
                        {{ row.level == 3 ? '添加功能' : '添加子菜单' }}
                    </el-button>

                    <el-button type="warning" size="small" icon="Edit" :disabled="isEditOrDeleteDisabled(row)"
                        @click="editMenu(row)">
                        编辑
                    </el-button>

                    <el-popconfirm :title="`您确定要删除${row.name}菜单吗?`" width="220" @confirm="deleteMenu(row)">
                    <template #reference>
                        <el-button type="danger" title="删除菜单" size="small" icon="Delete">删除</el-button>
                    </template>
                </el-popconfirm>
                </template>
            </el-table-column>

        </el-table>
        <!-- 添加菜单弹窗 -->
        <el-dialog v-model="dialogVisible" :title="menuForm.id ? '编辑菜单' : '添加菜单'" width="50%">
            <el-form :model="menuForm" label-width="120px">
                <el-form-item label="菜单名称">
                    <el-input v-model="menuForm.name" placeholder="请输入菜单名称" />
                </el-form-item>
                <!-- 权限标识 -->
                <el-form-item label="权限标识">
                    <el-input v-model="menuForm.code" placeholder="请输入权限标识" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="confirmAddOrUpdateMenu">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import type { Menu, MenuParams } from "@/api/auth/menu/type";
import { ElMessage } from "element-plus";
import { reqMenuList, reqAddOrUpdateMenu, reqDeleteMenu } from "@/api/auth/menu/menu";

const tableData = ref<Menu[]>([]);
const dialogVisible = ref(false);
const menuForm = reactive<MenuParams>({
    name: '',
    code: '',
    type: 0,
    pid: 0,
});

const confirmAddOrUpdateMenu = async () => {
    let result = await reqAddOrUpdateMenu(menuForm);
    if (result.code === 200) {
        ElMessage.success(menuForm.id ? "更新菜单成功" : "添加菜单成功");
        dialogVisible.value = false;
        await getMenuList();
    } else {
        ElMessage.error(menuForm.id ? "更新菜单失败" : "添加菜单失败");
    }
}

const initMenuForm = (row: Menu) => {
  Object.assign(menuForm, {
    name: '',
    code: '',
    pid: row.id,
    level: row.level + 1,
    type: row.level + 1,
    id: 0,
  });
};

const addMenu = (row: Menu) => {
  dialogVisible.value = true;
  initMenuForm(row);
};


const deleteMenu = async (row: Menu) => {
    let result = await reqDeleteMenu(row.id);
    if (result.code === 200) {
        ElMessage.success("删除菜单成功");
        await getMenuList();
    } else {
        ElMessage.error("删除菜单失败");
    }
}

const editMenu = (row: Menu) => {
    dialogVisible.value = true;
    Object.assign(menuForm, row);
}

const getMenuList = async () => {
    const result = await reqMenuList();
    if (result.code === 200) {
        tableData.value = result.data;
    } else {
        ElMessage.error("获取菜单列表失败");
    }
}

const isEditOrDeleteDisabled = (row: Menu) => {
    return row.level === 1;
}

const isAddDisabled = (row: Menu) => {
    return row.level === 4;
}

onMounted(() => {
    getMenuList();
});
</script>

<style scoped></style>
