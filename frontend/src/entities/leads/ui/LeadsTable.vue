<script setup lang="ts">
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons-vue'
import { useLeadsStore } from '@/entities'
import { storeToRefs } from 'pinia'

const { leads, loading } = storeToRefs(useLeadsStore())
const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Бюджет',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Ответственный',
    dataIndex: 'user',
    key: 'user'
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'created_at'
  }
]
</script>

<template>
  <a-table :dataSource="leads" :columns="columns" :loading="loading" :pagination="false" :scroll="{x: 991}" expandRowByClick>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-tag :color="record.status.color" style="color: rgb(102, 102, 102)">
          {{ record.status.name }}
        </a-tag>
      </template>

      <template v-if="column.key === 'user'">
        <a-space wrap :size="8">
          <a-avatar size="small" style="background-color: rgb(24, 144, 255)">
            <template #icon><UserOutlined /></template>
          </a-avatar>

          <span>{{ record.user.name }}</span>
        </a-space>
      </template>
    </template>

    <template #expandedRowRender="{ record }">
      <a-space v-if="record.contact" wrap :size="0" style="margin-left: 24px;">
        <a-avatar size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <span style="margin-left: 8px;">
          {{ record.contact.name }}
        </span>
        <a v-if="record.contact.phone" :href="`tel:${record.contact.phone}`" style="margin-left: 10px;">
          <PhoneOutlined />
        </a>
        <a-divider type="vertical" style="width: 1px !important;"/>
        <a v-if="record.contact.email" :href="`mailto:${record.contact.email}`">
          <MailOutlined />
        </a>
      </a-space>

      <span v-else> Без контакта </span>
    </template>
  </a-table>
</template>
