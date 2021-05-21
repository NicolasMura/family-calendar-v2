import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'apps/frontend-public/src/environments/environment';

interface Todo {
  title: string;
}

@Component({
  selector: 'family-calendar-v2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected baseUrlTodos = environment.backendApi.baseUrlTodos;
  title = 'frontend-public';
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    // this.http.get<Todo[]>('/api/todos').subscribe((t) => (this.todos = t));
    this.http.get<Todo[]>(this.baseUrlTodos).subscribe((t) => (this.todos = t));
  }

  addTodo() {
    const newTodo: Todo = {
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    };
    // this.todos.push(newTodo);
    this.http.post<Todo[]>(this.baseUrlTodos, newTodo).subscribe((t) => (this.todos = t));
  }
}
