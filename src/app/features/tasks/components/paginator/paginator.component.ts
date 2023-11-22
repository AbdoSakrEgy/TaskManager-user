import { Component, OnInit } from '@angular/core';
import { tasksList } from 'src/app/shared/data/tasksList';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  tasksList = tasksList;
  tasks: any[] = [];
  tasksPerPage: number = 4;
  public selectedPage = 1;
  activePageNumber = 1;
  @Output() tasksToParent = new EventEmitter<any>();

  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.tasksPerPage;
    this.tasks = tasksList.slice(pageIndex, this.tasksPerPage);
    this.tasksToParent.emit(this.tasks);
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.tasksPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(tasksList.length / this.tasksPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedTasks();
    this.activePageNumber = page;
  }
  slicedTasks() {
    let pageIndex = (this.selectedPage - 1) * this.tasksPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.tasksPerPage + this.tasksPerPage;
    this.tasks = [];
    this.tasks = this.tasksList.slice(pageIndex, endIndex);
    this.tasksToParent.emit(this.tasks);
  }
  nextPage() {
    if (this.activePageNumber != this.pageNumbers.length) {
      this.activePageNumber = this.activePageNumber + 1;
      this.changePage(this.activePageNumber);
    }
  }
  previousPage() {
    if (this.activePageNumber != 1) {
      this.activePageNumber = this.activePageNumber - 1;
      this.changePage(this.activePageNumber);
    }
  }
}
