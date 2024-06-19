import { defineStore } from "pinia";
import { ref } from "vue";

export const useLeadsStore = defineStore('leads', () => {
    const leads = ref<any[]>([])
    const loading = ref<boolean>(false)

    

    return {
        leads,
        loading,
    }
})