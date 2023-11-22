import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTasksService {
  baseURL: string = 'https://crud-5swn.onrender.com';

  constructor(private http: HttpClient) {}
  getUserTasks() {
    return this.http.get(this.baseURL + '/tasks/all-tasks', { params });
  }
}

const params = new HttpParams().set('page', 1).set('limit', 10);
