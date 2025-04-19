<template>
    <div>
        <el-card style="margin-top: 10px;">
            <el-form :inline="true" class="search-form">
                <el-form-item label="用户名" label-width="80px">
                    <el-input v-model="keyWord" clearable placeholder="请输入用户名" style="width: 220px;" />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="!keyWord" type="primary" @click="search">搜索</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card style="margin-top: 20px;">
            <el-button type="primary" @click="addUser">添加用户</el-button>
            <el-button type="danger" :disabled="batchDeleteUserList.length === 0"
                @click="batchDeleteUser">批量删除</el-button>

            <el-table :data="userList" style="margin-top: 15px;" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" label="序号" width="70" align="center" />
                <el-table-column label="ID" prop="id" width="70" align="center" />
                <el-table-column label="用户名" prop="username" align="center" />
                <el-table-column label="用户昵称" prop="name" align="center" />
                <el-table-column label="用户角色" prop="roleName" align="center" />
                <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip />
                <el-table-column label="更新时间" prop="updateTime" align="center" />
                <el-table-column label="操作" width="180" align="center">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="User" @click="assignRole(row)">分配角色</el-button>
                        <el-button type="warning" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
                        <el-popconfirm :title="`您确定要删除${row.name}用户吗?`" width="220" @confirm="deleteUser(row.id)">
                            <template #reference>
                                <el-button type="danger" title="删除用户" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 20px;" v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]" :disabled="disabled" :background="background"
                layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />

            <el-drawer v-model="drawer" size="30%">
                <template #header>
                    <h4>{{ userParams?.id ? '编辑用户' : '添加用户' }}</h4>
                </template>
                <template #default>
                    <el-form ref="formRef" :model="userParams" :rules="rules" style="padding: 0 20px;">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userParams.username" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="用户昵称" prop="name">
                            <el-input v-model="userParams.name" placeholder="请输入用户昵称" />
                        </el-form-item>
                        <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
                            <el-input v-model="userParams.password" placeholder="请输入用户密码" />
                        </el-form-item>
                    </el-form>
                </template>
                <template #footer>
                    <div style="flex: auto">
                        <el-button @click="cancelClick">取消</el-button>
                        <el-button type="primary" @click="confirmClick">确认</el-button>
                    </div>
                </template>
            </el-drawer>

            <el-drawer v-model="roleDrawer" size="30%">
                <template #header>
                    <h4>分配角色</h4>
                </template>
                <template #default>
                    <el-form style="padding: 0 20px;">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userParams.username" disabled placeholder="请输入用户名" />
                        </el-form-item>
                        <!-- 角色列表 -->
                        <el-form-item label="角色列表" prop="roleId">
                            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange">
                                全选
                            </el-checkbox>
                            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
                                <el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">
                                    {{ role.roleName }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </template>
                <template #footer>
                    <div style="flex: auto">
                        <el-button @click="roleDrawer = false">取消</el-button>
                        <el-button type="primary" @click="assignRoleConfirm">确认</el-button>
                    </div>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { reqAddOrUpdateUser, reqAllRole, reqAssignRole, reqBatchDeleteUser, reqDeleteUser, reqUserList } from '@/api/auth/user';
import { useLoadingStore } from '@/store/modules/loading';
import { RoleData, UserList } from '@/api/auth/user/type';
import useLayoutSettingStore from '@/store/modules/setting';

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const disabled = ref(false); // 是否禁用分页, 没有数据的时候禁用
const background = ref(true);

// 数据列表
const userList = ref<UserList[]>([]);
const userParams = reactive({
    id: undefined as number | undefined,
    username: "",
    name: "",
    password: "",
});

const roleList = ref<RoleData[]>([]);

const keyWord = ref('');

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedRoles = ref<number[]>([]);

const batchDeleteUserList = ref<number[]>([]);

let settingStore = useLayoutSettingStore();



const handleCheckAllChange = () => {
    checkedRoles.value = checkAll.value ? roleList.value.map((role) => role.id) : [];
    isIndeterminate.value = false;
};

const handleCheckedRolesChange = () => {
    checkAll.value = checkedRoles.value.length === roleList.value.length;
    isIndeterminate.value = checkedRoles.value.length > 0 && checkedRoles.value.length < roleList.value.length;
};

const formRef = ref<any>();

const validateUsername = (rule: any, value: any, callback: any) => {
    if (value.length < 3 || value.length > 16) {
        callback(new Error('请输入3-16位的用户名'));
    } else {
        callback();
    }
};

const validateName = (rule: any, value: any, callback: any) => {
    if (value.length < 3 || value.length > 16) {
        callback(new Error('请输入3-16位的昵称'));
    } else {
        callback();
    }
};

const validatePassword = (rule: any, value: any, callback: any) => {
    if (value.length < 6 || value.length > 16) {
        callback(new Error('请输入6-16位的密码'));
    } else {
        callback();
    }
};

const rules = ref({
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    name: [{ required: true, trigger: 'blur', validator: validateName }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
});


// 抽屉相关
const drawer = ref(false);
const loadingStore = useLoadingStore();
const roleDrawer = ref(false);

// 方法定义
const editUser = (row: UserList) => {
    Object.assign(userParams, row);
    drawer.value = true;
    nextTick(() => {
        formRef.value.clearValidate();
    });
};

const getUserList = async () => {
    loadingStore.show('正在获取用户列表...');
    try {
        const result = await reqUserList(currentPage.value, pageSize.value, keyWord.value);
        if (result.code == 200) {
            total.value = result.data.total;
            userList.value = result.data.records;
            disabled.value = false;
        } else {
            ElMessage.error('获取用户列表失败');
            disabled.value = true;
        }
    } finally {
        loadingStore.hide();
    }
};

const handleSizeChange = (size: number) => {
    pageSize.value = size;
    getUserList();
};

const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    getUserList();
};

const search = () => {
    getUserList();
};

const reset = () => {
    // keyWord.value = '';
    // getUserList();
    settingStore.refresh = !settingStore.refresh;
};

const assignRole = async (row: UserList) => {
    loadingStore.show('正在获取角色列表...');
    Object.assign(userParams, row);
    try {
        const result = await reqAllRole(row.id);
        if (result.code == 200) {
            roleList.value = result.data.allRolesList;
            roleDrawer.value = true;
            checkedRoles.value = result.data.assignRoles.map((role: RoleData) => role.id);
        }
    } finally {
        loadingStore.hide();
    }
};

const assignRoleConfirm = async () => {
    console.log('assignRoleConfirm');
    let result = await reqAssignRole(userParams.id, checkedRoles.value);
    if (result.code == 200) {
        ElMessage.success('分配角色成功');
        roleDrawer.value = false;
        window.location.reload();
    } else {
        ElMessage.error('分配角色失败');
    }
};

const addUser = () => {
    drawer.value = true;
    Object.assign(userParams, {
        id: undefined,
        username: '',
        name: '',
        password: '',
    });

    nextTick(() => {
        formRef.value.clearValidate();
    });
};

const handleSelectionChange = (selection: any) => {
    batchDeleteUserList.value = selection.map((item: any) => item.id);
};

const batchDeleteUser = async () => {
    let result = await reqBatchDeleteUser(batchDeleteUserList.value);
    if (result.code == 200) {
        ElMessage.success('批量删除用户成功');
        window.location.reload();
    } else {
        ElMessage.error('批量删除用户失败');
    }
};

const deleteUser = async (id?: number | MouseEvent) => {
    let result = await reqDeleteUser(id as number);
    if (result.code == 200) {
        ElMessage.success('删除用户成功');
        window.location.reload();
    } else {
        ElMessage.error('删除用户失败');
    }
};

const cancelClick = () => {
    drawer.value = false;
    Object.assign(userParams, {
        id: undefined,
        username: '',
        name: '',
        password: '',
    });
};

const confirmClick = async () => {
    // 等待表单验证完成
    await formRef.value.validate();

    let result = await reqAddOrUpdateUser(userParams);
    if (result.code == 200) {
        let msg = userParams.id ? '编辑用户成功' : '添加用户成功';
        ElMessage.success(msg);
        drawer.value = false;
        // 刷新页面
        window.location.reload();
    } else {
        let msg = userParams.id ? '编辑用户失败' : '添加用户失败';
        ElMessage.error(msg);
    }
};

onMounted(() => {
    getUserList();
});
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
</style>