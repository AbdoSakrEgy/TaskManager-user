import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HostListener } from '@angular/core';
import { selectIsLoadingTasks } from 'src/app/core/store/selectors/tasks.selectors';
import { selectPaginationTasks } from 'src/app/core/store/selectors/paginationTasks.selectors';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  innerWidth: any = screen.width;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  tasksToView: any[] = [];
  isLoading = true;
  isTasksLoading$ = this.store.select(selectIsLoadingTasks).subscribe({
    next: (res: any) => {
      this.isLoading = res;
    },
  });
  isTasksToViewUpdated$ = this.store.select(selectPaginationTasks).subscribe({
    next: (res: any) => {
      console.log(res);
      
      this.tasksToView = res.tasks;
    },
  });

  constructor(private store: Store) {}
  ngOnInit(): void {}
}
