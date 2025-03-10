<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">占位</el-col>
            <el-col :span="12" :xs="24">
                <el-form :model="loginForm" :rules="rules" class="login_form" ref="loginFormRef">
                    <h1>hello</h1>
                    <h2> 欢迎来到全民制作人平台 </h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username">

                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password>

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="login">
                            登录
                        </el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


let loading = ref(false);

let userStore = useUserStore();
let $router = useRouter();

let loginForm = reactive({
    username: 'ikun',
    password: '111',
})

let loginFormRef = ref()

const login = async () => {
    // 保证表单校验通过再发请求 
    if (!loginFormRef.value) return;

    try {
        await loginFormRef.value.validate(); // ❗确保校验失败会进入 catch
    } catch (error) {
        return; // 校验失败则不进行后续请求
    }

    loading.value = true;
    // 点击登录按钮后干什么？
    // 通知仓库发登录请求
    // 请求成功 --> 首页展示数据
    // 请求失败 --> 弹出登录失败信息
    try {
        await userStore.userLogin(loginForm);
        $router.push('/')
        // 登录成功的提示信息
        ElNotification({
            type: 'success',
            message: "欢迎回来",
            title: `Hi, ${getTime()}好`
        })
    } catch (error) {
        loading.value = false;
        ElNotification({
            type: 'error',
            message: error.message,
        })
    }
}

const validatorUserName = (rule: any, value: any, callback: any) => {
    // rule：校验规则对象
    // value: 表单文本的内容
    if (value.length >= 1) {
        callback();
    } else {
        callback(new Error('密码长度至少6位'))
    }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
    // rule：校验规则对象
    // value: 表单文本的内容
    if (value.length >= 1) {
        callback();
    } else {
        callback(new Error('密码长度至少6位'))
    }
}


const rules = {
    username: [
        { trigger: 'change', validator: validatorUserName }
        // { required: true, message: '用户名不能为空', trigger: 'change', },
        // { min: 5, max: 10, message: '用户名长度应在 5 到 10 位之间', trigger: 'change', },
    ],
    password: [
        { trigger: 'change', validator: validatorPassword }
        // { required: true, message: '请输入密码', trigger: 'change', },
        // { min: 6, message: '密码长度至少为 6 位', trigger: 'change', },
    ],
};





</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    /* 宽度占满整个视口 */
    height: 100vh;
    /* 高度占满整个视口 */
    background-color: skyblue;
    // background: url('@/assets/images/background.png') no-repeat;  
    background-size: cover;

    .login_form {
        position: relative;
        /* 让元素相对于原来的位置进行偏移 */
        width: 80%;
        /* 宽度占 80% 的父级容器 */
        top: 30vh;
        /* 从顶部偏移 30% 视口高度 */
        background-color: rgb(134, 134, 134);
        // background: url('@/assets/images/background.png') no-repeat;  
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px, 0px
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>