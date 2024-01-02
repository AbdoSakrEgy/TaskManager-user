import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './core/services/data.service';
import { jwtDecode } from 'jwt-decode';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TasksApp-user';
  isNavbarHidden: boolean = false;

  constructor(
    private route: Router,
    private translate: TranslateService,
    private dataService: DataService,
    private tokenStorageStorage: TokenStorageService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isNavbarHidden = true;
        } else if (event.url === '/register') {
          this.isNavbarHidden = true;
        } else if (event.url === '/') {
          this.isNavbarHidden = true;
        } else {
          this.isNavbarHidden = false;
          this.getUserTasks();
        }
      }
    });
  }
  getUserTasks() {
    const tokenData = jwtDecode(this.tokenStorageStorage.getToken()!) as {
      userId: string;
    };
    const userId = tokenData.userId;
    this.dataService._getUserTasks(userId);
  }
}
