import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDateStatus',
  standalone: true
})
export class DueDateStatusPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return 'No due date';
    }

    const dueDate = new Date(value);
    const now = new Date();
    dueDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffDays = Math.round((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day(s)`;
    }

    if (diffDays === 0) {
      return 'Due today';
    }

    return `Due in ${diffDays} day(s)`;
  }
}
