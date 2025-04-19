<template>
    <el-button size="small" icon="Refresh" @click="updateRefresh" circle></el-button>
    <el-button size="small" icon="FullScreen" @click="fullSreen" circle></el-button>
    
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker :teleported="false"  size="small" @change="changeColor" v-model="color" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDarkMode" v-model="darkMode" size="small" inline-prompt active-icon="Sunny" inactive-icon="Moon"/>
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <!-- 小头像触发区域加了 @mouseleave 控制延迟关闭 -->
    <el-avatar :size="28" fit shape="square" class="avatar" @mouseenter="onAvatarHover" @mouseleave="onAvatarLeave">
        <img :src="userStore.avatar" />
    </el-avatar>

    <!-- 放大头像组件 -->
    <teleport to="body">
        <transition name="fade-zoom">
            <div v-if="showOverlay" class="floating-avatar" @mouseenter="cancelHideOverlay" @mouseleave="hideOverlay"
                @click="showOverlay = false">
                <img :src="userStore.avatar" />
            </div>
        </transition>
    </teleport>


    <el-dropdown style="margin-left: 10px;">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
                <el-dropdown-item icon="CirclePlusFilled">Action 2</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck">Action 3</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

const darkMode = ref(false)

const changeDarkMode = () => {
    let html = document.documentElement;
    if (darkMode.value) {
        html.classList.add('dark')
    } else {
        html.classList.remove('dark')
    }
}

const changeColor = () => {
    // document.documentElement 是全局变量时
    const el = document.documentElement
    el.style.setProperty('--el-color-primary', color.value)
}

const color = ref('#409EFF')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])


let $router = useRouter();
let route = useRoute();
const showOverlay = ref(false);
let hideTimer: number;

const onAvatarHover = () => {
    clearTimeout(hideTimer);
    showOverlay.value = true;
};

const onAvatarLeave = () => {
    // 延迟关闭，避免手抖无法进入放大区域
    hideTimer = window.setTimeout(() => {
        showOverlay.value = false;
    }, 300);
};

const cancelHideOverlay = () => {
    clearTimeout(hideTimer);
};

const hideOverlay = () => {
    showOverlay.value = false;
};


let userStore = useUserStore();

let layoutSettingStore = useLayoutSettingStore();

const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

const fullSreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

const logout = async () => {
    // 1.向服务器发请求[退出登录接口]：清除token
    // 2. 仓库中相关数据清空
    // 3. 跳转到登录页面
    await userStore.userLogout();
    // $router.replace('/login');
    $router.push({ path: '/login', query: { redirect: route?.path || '/' } });

}
</script>

<style scoped lang="scss">
.avatar {
    margin-left: 10px;
    background-color: whitesmoke;
    cursor: pointer;
}

/* 浮动大头像样式 */
.floating-avatar {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999;
    cursor: pointer;
}

.floating-avatar img {
    width: 500px;
    height: 500px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease;
}


/* 动画效果 */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
    transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
}
</style>