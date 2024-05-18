import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { AsanaList, Task } from '../../interfaces';

@Component({
  selector: 'app-asana-list',
  templateUrl: './asana-list.component.html',
  styleUrl: './asana-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsanaListComponent {

  public reload$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  public tasks: Task[] = [];
  public model$: Observable<AsanaList>;
  constructor(
    private authService: AuthService
  ) {
    this.model$ = this.reload$.pipe(
      switchMap(() => this.initModel())
    )
    this.initModel();
  }

  public initModel(): Observable<AsanaList> {
    const tasksLocalStarage: string = window.localStorage.getItem('tasks') || '[]';
    const tasks: Task[] = JSON.parse(tasksLocalStarage);
    const login: String | undefined = this.authService.activeUser?.login;
    const model: AsanaList = {
      assignetForMe: [],
      assignetFromMe: [],
    }
    tasks.forEach((task: Task) => {
      if (task.worker === login) {
        model.assignetForMe.push(task);
      } else if (task.creator === login) {
        model.assignetFromMe.push(task);
      }
    });
    return of(model);
  }

}
