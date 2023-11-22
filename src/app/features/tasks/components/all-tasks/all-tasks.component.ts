import { Component } from '@angular/core';
import { UserTasksService } from 'src/app/core/services/user-tasks.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  statuses = ['all', 'done', 'pending', 'cancled'];
  tasks: any[] = [];

  constructor(private userTasksService: UserTasksService) {
    this.getUserTasks();
  }
  changeTasksView(tasksToView: any) {
    while (this.tasks.length > 0) {
      this.tasks.pop();
    }
    this.tasks.push(...tasksToView);
  }
  getUserTasks() {
    this.userTasksService.getUserTasks().subscribe((data) => {
      console.log(data);
    });
  }
}
