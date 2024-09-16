<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Task } from '~/types';

const priorities: Task['priority'][] = ['Low', 'Medium', 'High'];

defineProps<{
  showModal: boolean;
  currentTask: Task | Partial<Task>;
  saveTask: () => void;
}>();

const emit = defineEmits(['update:showModal']);

function closeModal() {
  emit('update:showModal', false);
}
</script>

<template>
  <UModal :model-value="showModal" @update:model-value="closeModal" title="Add/Edit Task">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Modal</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="closeModal" />
        </div>
      </template>
      <UForm :state="currentTask">
        <UFormGroup label="Title" for="task-title">
          <UInput id="task-title" v-model="currentTask.title"></UInput>
        </UFormGroup>

        <UFormGroup label="Description" for="task-description">
          <UTextarea id="task-description" v-model="currentTask.description"></UTextarea>
        </UFormGroup>

        <UFormGroup label="Responsible Person" for="task-responsible">
          <UInput id="task-responsible" v-model="currentTask.responsible"></UInput>
        </UFormGroup>

        <UFormGroup label="Priority" for="task-priority">
          <USelect id="task-priority" v-model="currentTask.priority" :options="priorities">
          </USelect>
        </UFormGroup>
      </UForm>

      <template #footer>
        <div class="flex gap-4 justify-end">
          <UButton color="primary" @click="saveTask">Save</UButton>
          <UButton color="gray" @click="closeModal">Cancel</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
