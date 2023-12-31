import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  constructor(private router: Router) {}
  routeToTaskDetails() {
    this.router.navigateByUrl('task-details');
  }
}
