import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskPriority } from '../models/task.model';

interface NewTask {
  title: string;
  description: string;
  dueDate: string | null;
  priority: TaskPriority;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Review Angular notes',
      description: 'Revisit services, pipes, directives, and observables.',
      dueDate: null,
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ]);

  readonly tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  addTask(task: NewTask): void {
    const currentTasks = this.tasksSubject.getValue();
    const nextTask: Task = {
      id: currentTasks.length ? Math.max(...currentTasks.map((item) => item.id)) + 1 : 1,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasksSubject.next([nextTask, ...currentTasks]);
  }

  toggleTaskCompleted(taskId: number): void {
    const updatedTasks = this.tasksSubject
      .getValue()
      .map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
    this.tasksSubject.next(updatedTasks);
  }
}
