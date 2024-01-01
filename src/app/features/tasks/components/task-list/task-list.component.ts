import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { DataService } from 'src/app/core/services/data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import {
  updateIsLoadingTasks,
  updateTasks,
} from 'src/app/core/store/actions/tasks.actions';
import { selectPaginationTasks } from 'src/app/core/store/selectors/paginationTasks.selectors';
import { selectIsLoadingTasks } from 'src/app/core/store/selectors/tasks.selectors';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
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
      this.tasksToView = res.tasks;
    },
  });

  constructor(
    private tokenStorageStorage: TokenStorageService,
    private store: Store,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getUserTasks();
  }
  getUserTasks() {
    const tokenData = jwtDecode(this.tokenStorageStorage.getToken()!) as {
      userId: string;
    };
    const userId = tokenData.userId;
    this.store.dispatch(updateIsLoadingTasks({ payload: true }));
    this.dataService.getUserTasks(userId).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
        this.store.dispatch(updateIsLoadingTasks({ payload: false }));
      },
      error: (err: any) => {
        this.store.dispatch(updateIsLoadingTasks({ payload: false }));
        console.log(err);
      },
    });
  }
  completeTask(taskId: any) {
    this.dataService.completeTask(taskId).subscribe({
      next: (res: any) => {
        this.getUserTasks();
        this._snackBar.openFromComponent(AlertComponent, {
          data: {
            message: 'Task Complete Successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: true,
          },
          duration: 2 * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    });
  }
}
