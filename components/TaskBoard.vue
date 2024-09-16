<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import type { Task } from '@/types';
import TaskCard from '@/components/TaskCard.vue';
import AddEditTaskModal from './AddEditTaskModal.vue';

const taskStore = useTaskStore();
const showModal = ref(false);
const currentTask = ref<Task | Partial<Task>>({});
const statuses: Task['status'][] = ['TODO', 'In progress', 'Done'];
const draggedTaskId = ref<number | null>(null);

function tasksByStatus(status: string) {
  return taskStore.tasksByStatus(status as Task['status']);
}

function openAddTaskModal(status: Task['status']) {
  currentTask.value = { status, priority: 'Low' };
  showModal.value = true;
}

function saveTask() {
  if ('id' in currentTask.value) {
    taskStore.editTask(currentTask.value as Task);
  } else {
    taskStore.addTask(currentTask.value as Omit<Task, 'id'>);
  }
  showModal.value = false;
}

function editTask(task: Task) {
  currentTask.value = { ...task };
  showModal.value = true;
}

function deleteTask(taskId: number) {
  taskStore.deleteTask(taskId);
}

function onDragStart(event: DragEvent, taskId: number) {
  draggedTaskId.value = taskId;
  event.dataTransfer?.setData('text/plain', taskId.toString());
}

function onDrop(event: DragEvent, newStatus: Task['status']) {
  const taskId = draggedTaskId.value;
  if (taskId !== null) {
    taskStore.updateTaskStatus(taskId, newStatus);
    draggedTaskId.value = null;
  }
}
</script>

<template>
  <UContainer>
    <div class="flex gap-7 justify-center p-10">
      <div
        v-for="status in statuses"
        :key="status"
        class="flex-1"
        @dragover.prevent
        @drop="(event) => onDrop(event, status)">
        <UCard>
          <template #header>{{ status }}</template>
          <div>
            <div
              v-for="task in tasksByStatus(status)"
              :key="task.id"
              :draggable="true"
              class="mb-4"
              @dragstart="(event) => onDragStart(event, task.id)">
              <TaskCard
                :task="task"
                @edit-task="editTask(task)"
                @delete-task="deleteTask(task.id)" />
            </div>
          </div>
          <template #footer>
            <UButton color="primary" @click="openAddTaskModal(status)"> + Add Task </UButton>
          </template>
        </UCard>
      </div>
    </div>

    <!-- Add/Edit Task Modal -->
    <AddEditTaskModal
      :showModal="showModal"
      :currentTask="currentTask"
      :saveTask="saveTask"
      @update:showModal="showModal = $event" />
  </UContainer>
</template>
