import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, AuthService, UtilitiesService, UserService } from '@family-calendar-v2/frontend-tools';
import { Todo, User } from '@family-calendar-v2/models';


/**
 * IBuildInfo interface and typings
 */
 interface IBuildInfo {
  hash?: string; // Latest commit hash
  timestamp?: string; // Timestamp on when the build was made
  user?: string; // Current git user
  version?: string; // `version` from package.json
  jenkinsBuildId?: number; // `version` from ${BUILD_ID} Jenkins variable
  message?: string; // Custom build message
}

@Component({
  selector: 'app-family-calendar-v2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected baseUrlTodos = environment.backendApi.baseUrlTodos;
  title = 'frontend-public';
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  /**
   * build infos: hash, timestamp, user and jenkins Build Id
   * Allow use of buildInfo variable inside template, for display build infos
   */
   buildInfo: IBuildInfo;
   /**
    * Observable that gives current user
    */
   currentUser$: Observable<User> = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private utilitiesService: UtilitiesService
    ) {
    // this.fetch();
    console.log(environment);
  }

  ngOnInit(): void {
    // check if app is in maintenance mode
    this.utilitiesService.isAppInMaintenanceMode().subscribe((inMaintenance: boolean) => {
      if (!inMaintenance) {
        this.authService.checkForExistingToken();
      }
    }, error => {
      console.error(error);
    });

    // subscribe to current user observable
    this.currentUser$ = this.userService.currentUser$;

    // subscribe to current moment observable
    // this.currentMoment$ = this.calendarEventService.currentMoment$;
    // this.calendarEventService.currentMoment$
    //   .pipe(skip(1))
    //   .subscribe((updatedCurrentMoment: moment.Moment) => {
    //     this.currentMonth = updatedCurrentMoment.format('MMMM');
    //     this.weekNumber = updatedCurrentMoment.startOf('week').isoWeek();
    //   });
  }

  public logout(): void {
    this.authService.logout();
  }

  fetch() {
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
