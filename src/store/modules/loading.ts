import { defineStore } from 'pinia';
import { ElLoading  } from 'element-plus';
import { LoadingInstance } from 'element-plus';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingInstance: null as LoadingInstance | null,
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
