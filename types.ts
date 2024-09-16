export interface Task {
  id: number;
  title: string;
  description: string;
  responsible: string;
  status: 'TODO' | 'In progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}
