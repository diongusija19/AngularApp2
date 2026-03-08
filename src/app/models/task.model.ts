export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}
