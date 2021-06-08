import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TodosComponent,
    AutofocusDirective
  ],
  exports: [
    TodosComponent,
    AutofocusDirective
  ]
})
export class FrontendToolsModule {}
