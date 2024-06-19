<script setup lang="ts">
import { onMounted } from 'vue'
import { Table } from 'ant-design-vue'
import useFetch from './composables/useFetch'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]

onMounted(async () => {
  try {
    const data = await useFetch.get('/leads')
    console.log(data)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <main>
    <a-table :dataSource="dataSource" :columns="columns" />
  </main>
</template>
