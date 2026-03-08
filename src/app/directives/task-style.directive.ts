import { Directive, HostBinding, Input } from '@angular/core';
import { TaskPriority } from '../models/task.model';

@Directive({
  selector: '[appTaskStyle]',
  standalone: true
})
export class TaskStyleDirective {
  @Input() appTaskStyleCompleted = false;
  @Input() appTaskStylePriority: TaskPriority = 'medium';

  @HostBinding('style.opacity') get opacity(): string {
    return this.appTaskStyleCompleted ? '0.65' : '1';
  }

  @HostBinding('style.textDecoration') get textDecoration(): string {
    return this.appTaskStyleCompleted ? 'line-through' : 'none';
  }

  @HostBinding('style.borderLeftColor') get borderLeftColor(): string {
    if (this.appTaskStylePriority === 'high') {
      return '#d93f0b';
    }
    if (this.appTaskStylePriority === 'low') {
      return '#1f883d';
    }
    return '#0969da';
  }
}
