import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "../../api/product/attr";
import type { CategoryResponseData } from "../../api/product/attr/type";
import type { CategoryState } from "./types/type";


let useCategoryStore = defineStore('Category', {
    state: (): CategoryState => {
        return {
            c1Arr: [],
            c1Id: '',
            c2Arr: [],
            c2Id: '',
            c3Arr: [],
            c3Id: '',
        }
    },
    actions: {
        async getC1() {
            let result: CategoryResponseData = await reqC1();
            if (result.code === 200) {
                this.c1Arr = result.data;
            }
        },
        async getC2(id: number | string) {
            let result: CategoryResponseData = await reqC2(id);
            if (result.code === 200) {
                this.c2Arr = result.data;
            }
        },
        async getC3(id: number | string) {
            let result: CategoryResponseData = await reqC3(id);
            if (result.code === 200) {
                this.c3Arr = result.data;
            }
        },

    },
    getters: {

    }
})

export default useCategoryStore;