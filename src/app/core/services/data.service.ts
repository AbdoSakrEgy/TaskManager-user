import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'https://crud-5swn.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getUserTasks(userId: any) {
    const httpOptions = {
      params: new HttpParams()
        .set('page', 1)
        .set('limit', 10)
        .set('status', 'In-Progress'),
    };
    return this.http.get(API_URL + '/tasks/user-tasks/' + userId, httpOptions);
  }
  getTaskDetails(taskId: any) {
    return this.http.get(API_URL + '/tasks/task/' + taskId);
  }
  completeTask(taskId: any) {
    const body = { id: taskId };
    return this.http.put(API_URL + '/tasks/complete', body);
  }
}
