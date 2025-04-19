<template>
    <div>
        <el-card style="margin-top: 10px;">
            <el-form :inline="true" class="search-form">
                <el-form-item label="职位搜索" label-width="80px">
                    <el-input v-model="keyWord" @keyup.enter="search" clearable placeholder="请输入职位名称"
                        style="width: 220px;" />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="!keyWord" type="primary" @click="search">搜索</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 20px;">
            <el-button type="primary" @click="addRole">添加职位</el-button>
            <el-table :data="roleList" style="margin-top: 15px;" border>
                <el-table-column type="index" :index="indexMethod" label="#" width="70" align="center" />
                <el-table-column label="ID" prop="id" width="70" align="center" />
                <el-table-column label="角色名称" prop="roleName" align="center" />
                <el-table-column label="创建时间" prop="createTime" align="center" />
                <el-table-column label="更新时间" prop="updateTime" align="center" />
                <el-table-column label="操作" width="180" align="center">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="User"
                            @click="assignPermission(row)">分配权限</el-button>
                        <el-button type="warning" size="small" icon="Edit" @click="editRole(row)">编辑</el-button>
                        <el-popconfirm :title="`您确定要删除 ${row.roleName} 职位吗？`" width="260px" icon="Delete"
                                icon-color="red" @confirm="deleteRole(row)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[5, 10, 15, 20]" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
        <!-- 添加职位 -->
        <el-dialog v-model="dialogVisible" title="添加职位">
            <el-form :model="roleParams" :rules="rules" ref="roleFormRef" class="role-form" label-width="100px">
                <el-form-item label="职位名称" prop="roleName">
                    <el-input v-model="roleParams.roleName" placeholder="请输入职位名称" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="saveRole">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </template>
        </el-dialog>
        <!-- 分配权限 -->
        <el-drawer v-model="drawerVisible">
            <template #header>
                <h4>菜单和按钮权限</h4>
            </template>
            <template #default>
                <el-tree 
                :data="treeData" 
                ref="treeRef"
                :props="defaultProps" 
                node-key="id" 
                :default-checked-keys="checkedKeys" 
                :default-expanded-keys="expandedKeys"
                :check-strictly="false" 
                @check="handleCheck"
                show-checkbox />
            </template>
            <template #footer>
                <el-button @click="drawerVisible = false">取消</el-button>
                <el-button type="primary" @click="savePermission">确定</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import type { MenuData, RoleData } from '@/api/auth/role/type';
import { reqAddOrUpdateRole, reqPermissionList, reqRoleList, reqAssignPermission, reqDeleteRole } from '@/api/auth/role';
import { useLoadingStore } from '@/store/modules/loading';
import { ElMessage } from 'element-plus';

const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const disabled = ref(false);
const background = ref(true);
const keyWord = ref('');
const dialogVisible = ref(false);
const drawerVisible = ref(false);
const roleParams = reactive({
    id: 0,
    roleName: '',
});
const roleList = ref<RoleData[]>([]);
const roleFormRef = ref<any>(null);
const treeData = ref<MenuData[]>([]);
const checkedKeys = ref<any[]>([]);
const expandedKeys = ref<any[]>([]);
const treeRef = ref<any>(null);

const defaultProps = ref<any>({
    children: 'children',
    label: 'name',
});


let loadingStore = useLoadingStore();

const validateRoleName = (rule: any, value: any, callback: any) => {
    if (value.trim() === '') {
        callback(new Error('职位名称不能为空'));
    } else {
        callback();
    }
};

const rules = reactive({
    roleName: [
        { required: true, trigger: 'blur', validator: validateRoleName },
    ],
});

const getRoleList = async () => {
    loadingStore.show('角色列表加载中...');
    try {
        const result = await reqRoleList(currentPage.value, pageSize.value, keyWord.value);
        if (result.code === 200) {
            ElMessage.success('角色列表加载成功');
            roleList.value = result.data.records;
            total.value = result.data.total;
        } else {
            ElMessage.error('角色列表加载失败');
        }
    } finally {
        loadingStore.hide();
    }

};

onMounted(() => {
    getRoleList();
});

const search = () => {
    getRoleList();
};

const reset = () => {
    keyWord.value = '';
    getRoleList();
};

const addRole = () => {
    dialogVisible.value = true;
    roleParams.roleName = '';
    roleParams.id = 0;
    nextTick(() => {
        roleFormRef.value.clearValidate();
    });
};

const editRole = (row: RoleData) => {
    dialogVisible.value = true;
    roleParams.roleName = row.roleName;
    roleParams.id = Number(row.id);
    roleFormRef.value.clearValidate();
};

const savePermission = async () => {
    let result = await reqAssignPermission(roleParams.id, checkedKeys.value);
    if (result.code === 200) {
        ElMessage.success('权限分配成功');
        drawerVisible.value = false;
        window.location.reload();
    } else {
        ElMessage.error('权限分配失败');
    }
};

const handleCheck = () => {
    // 获取选中的节点
    checkedKeys.value = treeRef.value.getCheckedKeys();
    console.log('checkedKeys', checkedKeys.value);

    // 更新选中的节点
    const updateSelectKeys = (data: MenuData[]) => {
        data.forEach((item) => {
            item.select = checkedKeys.value.includes(item.id);
            if (item.children?.length) {
                updateSelectKeys(item.children);
            }
        });
    };

    updateSelectKeys(treeData.value);
    console.log('treeData', treeData.value);
};

const assignPermission = (row: RoleData) => {
    getPermissionList(Number(row.id));
};

const getPermissionList = async (roleId: number) => {
    loadingStore.show('权限列表加载中...');
    try {
        let result = await reqPermissionList(roleId);
        if (result.code === 200) {
            treeData.value = result.data;
            checkedKeys.value = extractCheckedKeysFromTree(treeData.value);
            expandedKeys.value = extractExpandedKeysFromTree(treeData.value);
            drawerVisible.value = true;
        }
    } finally {
        loadingStore.hide();
    }
};

const extractCheckedKeysFromTree = (data: MenuData[]): number[] => {
    const keys: number[] = [];

    const traverse = (nodes: MenuData[]) => {
        nodes.forEach((node) => {
            if (node.select) {
                keys.push(node.id);
            }
            if (node.children) {
                traverse(node.children);
            }
        });
    };

    traverse(data);
    return keys;
};

const extractExpandedKeysFromTree = (data: MenuData[]): number[] => {
    const keys: number[] = [];
    const traverse = (nodes: MenuData[]) => {
        nodes.forEach((node) => {
            if (node.children && node.children.length > 0) {
                keys.push(node.id);
                traverse(node.children);
            }
        });
    };  

    traverse(data);
    return keys;
};

const deleteRole = async (row: any) => {
    let result = await reqDeleteRole(row.id);
    if (result.code === 200) {
        ElMessage.success('职位删除成功');
        getRoleList();
    } else {
        ElMessage.error('职位删除失败');
    }
};

const handleSizeChange = (size: number) => {
    pageSize.value = size;
    getRoleList();
};

const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    getRoleList();
};

const indexMethod = (index: number) => {
    return (currentPage.value - 1) * pageSize.value + index + 1;
};

const saveRole = async () => {
    // 等待表单验证完成
    await roleFormRef.value.validate();

    let result = await reqAddOrUpdateRole(roleParams);
    if (result.code === 200) {
        currentPage.value = 1;
        ElMessage.success('职位添加成功');
        dialogVisible.value = false;
        getRoleList();
    } else {
        ElMessage.error('职位添加失败');
    }
};

</script>

<style scoped lang="scss">
.search-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    margin-bottom: -10px;
    margin-top: -10px;
}

.role-form {
    width: 90%;
    margin-top: 10px;
}
</style>