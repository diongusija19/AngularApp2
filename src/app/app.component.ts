import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DueDateStatusPipe } from './pipes/due-date-status.pipe';
import { TaskStyleDirective } from './directives/task-style.directive';
import { Task, TaskPriority } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, DueDateStatusPipe, TaskStyleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  tasks$ = this.taskService.tasks$;

  newTaskTitle = '';
  newTaskDescription = '';
  newTaskDueDate = '';
  newTaskPriority: TaskPriority = 'medium';

  summary = {
    total: 0,
    completed: 0,
    pending: 0
  };

  constructor() {
    this.tasks$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tasks) => {
        const completed = tasks.filter((task) => task.completed).length;
        this.summary = {
          total: tasks.length,
          completed,
          pending: tasks.length - completed
        };
      });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) {
      return;
    }

    this.taskService.addTask({
      title,
      description: this.newTaskDescription.trim(),
      dueDate: this.newTaskDueDate || null,
      priority: this.newTaskPriority
    });

    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskDueDate = '';
    this.newTaskPriority = 'medium';
  }

  toggleTask(taskId: number): void {
    this.taskService.toggleTaskCompleted(taskId);
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
  }
}
