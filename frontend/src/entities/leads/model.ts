import { defineStore } from "pinia";
import { ref } from "vue";
import { getLeads } from "@/shared/api";
import { formattingLeads } from "./libs";

export const useLeadsStore = defineStore('leads', () => {
    /**
     * State
     */
    const leads = ref<any[]>([])
    const loading = ref<boolean>(false)

    /**
     * Actions
     */

    const setLeads = async (query: string) => {
        if (query && query.length < 3) return

        loading.value = true
        try {
            const { data } = await getLeads({ query })

            leads.value = formattingLeads(data.data)
        } catch (e) {
            // do nothing
        }
        loading.value = false
    }

    return {
        leads,
        loading,
        setLeads,
    }
})