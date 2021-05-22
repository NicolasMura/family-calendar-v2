import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '@family-calendar-v2/models';


@Component({
  selector: 'lib-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @Input() todos: Todo[];

  constructor() { }

  ngOnInit(): void {
  }

}
