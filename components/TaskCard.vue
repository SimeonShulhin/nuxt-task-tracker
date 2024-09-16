<script setup lang="ts">
import type { Task } from '@/types';

defineProps<{
  task: Task;
}>();
</script>

<template>
  <UCard>
    <template #header>
      <h5>{{ task.title }}</h5>
    </template>
    <div>
      <p>{{ task.description }}</p>
      <div class="flex gap-2 mt-2">
        <UBadge color="primary">{{ task.status }}</UBadge>
        <UBadge color="red">{{ task.priority }}</UBadge>
      </div>
    </div>
    <template #footer>
      <div class="text-end">
        <UButton size="sm" color="primary" class="mr-2" @click="$emit('edit-task')"> Edit </UButton>
        <UButton size="sm" color="red" @click="$emit('delete-task')"> Delete </UButton>
      </div>
    </template>
  </UCard>
</template>
