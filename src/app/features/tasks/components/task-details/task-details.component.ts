import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

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
  task: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getTaskDetails();
  }
  getTaskDetails() {
    this.route.params.subscribe({
      next: (params: any) => {
        this.dataService.getTaskDetails(params['taskId']).subscribe({
          next: (res: any) => {
            this.task = res.tasks;
          },
        });
      },
    });
  }
}
