import { reactive } from 'vue';
import type { Task } from '@/types';

export const useTaskStore = defineStore('taskStore', () => {
  const state = reactive({
    tasks: [] as Task[],
    nextId: 1,
  });

  function addTask(task: Omit<Task, 'id'>) {
    state.tasks.push({ ...task, id: state.nextId });
    state.nextId++;
  }

  function editTask(updatedTask: Task) {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks[index] = updatedTask;
    }
  }

  function deleteTask(taskId: number) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  }

  function updateTaskStatus(taskId: number, status: Task['status']) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
    }
  }

  function tasksByStatus(status: Task['status']) {
    return state.tasks.filter((task) => task.status === status);
  }

  return {
    tasks: state.tasks,
    nextId: state.nextId,
    addTask,
    editTask,
    deleteTask,
    updateTaskStatus,
    tasksByStatus,
  };
});
