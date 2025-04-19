<template>
    <el-card class="home-card">
        <el-avatar :size="100" :src="userStore.avatar" class="avatar" />

        <div class="greeting">
            <h1>{{ greeting }}好，<span class="username">{{ userStore.username }}</span></h1>
            <p>欢迎来到 <strong>{{ setting.title }}</strong></p>
        </div>

        <div class="time">
            🕒 {{ currentTime }}
        </div>

        <div class="daily">
            <p class="en">“{{ dailySentence.en }}”</p>
            <p class="ch">—— {{ dailySentence.ch }}</p>
            <p class="author">by {{ dailySentence.author }}</p>
        </div>
    </el-card>

    <div class="stats-card">
        <h2>今日学习概览</h2>
        <div class="stats">
            <div><strong>{{ todayStats.studyHours }}</strong> 小时学习</div>
            <div><strong>{{ todayStats.words }}</strong> 个新单词</div>
            <div><strong>{{ todayStats.vueProgress }}%</strong> Vue 学习进度</div>
        </div>
    </div>

    <div class="task-card">
        <h2>任务进度</h2>
        <div v-for="task in taskList" :key="task.name" class="task-item">
            <span>{{ task.name }}</span>
            <el-progress :percentage="task.percent" />
        </div>
    </div>

    <div class="reading-card">
        <div class="book-cover"></div>
        <div class="book-info">
            <p>{{ reading.title }}</p>
            <p>{{ reading.progress }}</p>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import setting from '@/setting'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
import axios from 'axios'

const userStore = useUserStore()
const greeting = getTime()

const currentTime = ref('')
const timer = ref<NodeJS.Timeout>()

const todayStats = ref({
    studyHours: 4.5,
    words: 15,
    vueProgress: 30,
})

const taskList = ref([
    { name: '背单词', percent: 80 },
    { name: 'Vue 学习', percent: 30 },
    { name: '阅读英文原著', percent: 45 },
])

const reading = ref({
    title: 'The Great Gatsby',
    progress: '第7章 / 共9章',
})




onMounted(() => {
    updateTime()
    timer.value = setInterval(updateTime, 1000)
    getDaily()
})

onUnmounted(() => clearInterval(timer.value))

function updateTime() {
    currentTime.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

const dailySentence = ref({
    en: '',
    ch: '',
    author: '',
})

async function getDaily() {
    try {
        const res = await axios.get('https://apiv3.shanbay.com/weapps/dailyquote/quote')
        dailySentence.value.en = res.data.content
        dailySentence.value.ch = res.data.translation
        dailySentence.value.author = res.data.author
    } catch (error) {
        console.error('获取每日一句失败', error)
        // 默认内容
        dailySentence.value = {
            en: "The best time to plant a tree was 20 years ago. The second best time is now.",
            ch: "种一棵树最好的时间是二十年前，其次是现在。",
            author: "Chinese Proverb"
        }
    }
}



</script>

<style scoped lang="scss">
.stats-card h2,
.task-card h2,
.reading-card h2 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    border-left: 4px solid #409EFF;
    padding-left: 12px;
}

.stats-card,
.task-card,
.reading-card {
  max-width: 800px;
  margin: 20px auto; // 👈 水平居中
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: left;
}


.reading-card {
    margin: 20px auto;
    display: flex;
    align-items: center;
    gap: 16px;

    .book-info {
        flex: 1;

        p {
            margin: 0;
            font-size: 16px;

            &:first-child {
                font-weight: 600;
                color: #303133;
            }

            &:last-child {
                color: #909399;
                font-size: 14px;
                margin-top: 4px;
            }
        }
    }

    .book-cover {
        width: 60px;
        height: 90px;
        background: #eee;
        border-radius: 8px;
        background-image: url('/book.jpg');
        background-size: cover;
        background-position: center;
    }
}



.stats {
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    color: #333;
    margin-top: 12px;

    div {
        text-align: center;

        strong {
            font-size: 20px;
            color: #409EFF;
        }
    }
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 14px;

    span {
        flex: 1;
        color: #666;
    }

    .el-progress {
        flex: 3;
        margin-left: 20px;
    }
}

.home-card,
.stats-card,
.task-card,
.reading-card {
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.1);
    }
}


.home-card {
    max-width: 800px;
    margin: 60px auto;
    padding: 40px 30px;
    border-radius: 24px;
    background: linear-gradient(135deg, #fefefe, #e3ebf6);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    text-align: center;
}

.avatar {
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.greeting h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #333;
}

.username {
    color: #409EFF;
}

.greeting p {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
}

.time {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 20px;
    background: rgba(64, 158, 255, 0.1);
    color: #409EFF;
    font-size: 16px;
    margin-bottom: 25px;
}

.daily {
    background: rgba(255, 255, 255, 0.85);
    border-radius: 16px;
    padding: 20px;
    margin-top: 30px;
    font-size: 16px;

    .en {
        font-size: 20px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 12px;
    }

    .ch {
        font-size: 16px;
        color: #606266;
        margin-bottom: 10px;
    }

    .author {
        font-size: 14px;
        color: #909399;
    }
}
</style>