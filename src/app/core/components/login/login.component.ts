import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Store } from '@ngrx/store';
import {
  updateIsLoadingTasks,
  updateTasks,
} from '../../store/actions/tasks.actions';
import { DataService } from '../../services/data.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  innerWidth: any = screen.width;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
    ],
  });
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private _snackBar: MatSnackBar,
    private store: Store,
    private dataService: DataService
  ) {}
  ngOnInit(): void {}
  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;
    const MODEL = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
      role: 'user',
    };
    this.authService.login(MODEL).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/tasks');
        this.tokenStorageService.saveToken(res.token);
        this.store.dispatch(updateIsLoadingTasks({ payload: true }));
        this.dataService.getUserTasks(res.userId).subscribe({
          next: (res: any) => {
            this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
            this.store.dispatch(updateIsLoadingTasks({ payload: false }));
          },
        });
        this._snackBar.openFromComponent(AlertComponent, {
          data: {
            message: 'Logged in successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: true,
          },
          duration: 2 * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
      },
    });
  }
}
