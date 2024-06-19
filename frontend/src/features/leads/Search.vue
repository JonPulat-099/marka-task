<script setup lang="ts">
import { ref, watch } from 'vue'
import { SearchOutlined, WarningOutlined } from '@ant-design/icons-vue'
import { useLeadsStore } from '@/entities'
import { storeToRefs } from 'pinia'

let timeout: ReturnType<typeof setTimeout>

const search = ref<string>('')
const { loading } = storeToRefs(useLeadsStore())

const { setLeads } = useLeadsStore()

watch(search, (value) => {
  clearTimeout(timeout)

  timeout = setTimeout(async () => {
    await setLeads(value)
  }, 500)
})
</script>
<template>
  <a-space>
    <a-tooltip v-if="search.length && search.length < 3" placement="top">
      <template #title>
        <span>Поиск работает от 3 символов</span>
      </template>
      <WarningOutlined style="color: #fa8c16;" />
    </a-tooltip>
    <a-input v-model:value="search" placeholder="Найти..." :disabled="loading">
      <template #suffix>
        <SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
      </template>
    </a-input>
  </a-space>
</template>
