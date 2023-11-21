import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [AllTasksComponent, PaginatorComponent],
  imports: [CommonModule, SharedModule],
  exports: [AllTasksComponent],
})
export class TasksModule {}
