import { reactive } from 'vue';
import type { Task } from '@/types';

export const useTaskStore = defineStore('taskStore', () => {
  const state = reactive({
    tasks: [
      {
        id: 1,
        title: 'Fix the login issue',
        description: 'Resolve the bug preventing users from logging in.',
        responsible: 'Alice',
        status: 'TODO',
        priority: 'High',
      },
      {
        id: 2,
        title: 'Create user profile page',
        description: 'Design and develop the user profile page.',
        responsible: 'Bob',
        status: 'In progress',
        priority: 'Medium',
      },
      {
        id: 3,
        title: 'Set up CI/CD pipeline',
        description: 'Automate deployment using Jenkins and Docker.',
        responsible: 'Charlie',
        status: 'In progress',
        priority: 'High',
      },
      {
        id: 4,
        title: 'Write unit tests for API',
        description: 'Implement unit tests for the authentication API.',
        responsible: 'Diana',
        status: 'Done',
        priority: 'Low',
      },
      {
        id: 5,
        title: 'Design landing page',
        description: 'Create the initial design for the marketing landing page.',
        responsible: 'Eve',
        status: 'TODO',
        priority: 'Medium',
      },
    ] as Task[],
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
