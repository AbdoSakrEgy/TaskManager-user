import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { TaskDetailsComponent } from './features/tasks/components/task-details/task-details.component';
import { loggedinGuard } from './core/guards/loggedin.guard';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loggedinGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  {
    path: 'task/:taskId',
    component: TaskDetailsComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
