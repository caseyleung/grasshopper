<template>
    <div class="realtime-clock">
      🕒 {{ currentTime }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const currentTime = ref(getNow())
  
  function getNow() {
    const now = new Date()
    return now.toLocaleTimeString('zh-CN', { hour12: false })
  }
  
  let timer: NodeJS.Timeout
  
  onMounted(() => {
    timer = setInterval(() => {
      currentTime.value = getNow()
    }, 1000)
  })
  
  onUnmounted(() => {
    clearInterval(timer)
  })
  </script>
  
  <style scoped lang="scss">
  .realtime-clock {
    margin-top: 20px;
    font-size: 18px;
    color: #409eff;
    font-weight: bold;
    text-align: center;
  }
  </style>
  