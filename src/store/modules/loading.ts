import { defineStore } from 'pinia';
import { ElLoading } from 'element-plus';

// Use `any` as a fallback to avoid type conflicts
export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingInstance: null as any, // Type set to `any` to avoid type conflict
  }),
  actions: {
    show(message = '加载中...') {
      if (!this.loadingInstance) {
        this.loadingInstance = ElLoading.service({
          lock: true,
          text: message,
          // background: 'rgba(230, 230, 230, 0.8)',
          customClass: 'my-loading-class',
        });
      }
    },
    hide() {
      this.loadingInstance?.close();
      this.loadingInstance = null;
    },
  },
});
