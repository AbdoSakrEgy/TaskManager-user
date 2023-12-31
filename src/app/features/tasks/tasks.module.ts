import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListPaginatorComponent } from './components/task-list-paginator/task-list-paginator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskListPaginatorComponent,
    TaskDetailsComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class TasksModule {}
