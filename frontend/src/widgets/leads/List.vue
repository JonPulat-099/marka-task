<script setup lang="ts">
import { onMounted } from 'vue'
import { useLeadsStore, LeadsTable } from '@/entities'
import { SearchLeads } from '@/features'

const { setLeads } = useLeadsStore()

onMounted(async () => {
  await setLeads('')
})
</script>

<template>
  <a-card title="Пример тестового задания" style="margin: 0px auto; max-width: 1560px">
    <template #extra>
      <SearchLeads />
    </template>
    <LeadsTable />
  </a-card>
</template>
