import { Component } from '@angular/core';

interface Todo {
  title: string;
}

@Component({
  selector: 'family-calendar-v2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-public';
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  addTodo() {
    this.todos.push({
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    });
  }
}
