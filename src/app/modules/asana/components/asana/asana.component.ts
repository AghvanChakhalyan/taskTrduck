import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AsanaListComponent } from '../asana-list/asana-list.component';
import { AuthService } from '../../../../services/auth.service';
import { UserRegisterData } from '../../../../interfaces';
import { Task } from '../../interfaces';

@Component({
  selector: 'app-asana',
  templateUrl: './asana.component.html',
  styleUrl: './asana.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AsanaComponent {

  public form: FormGroup;

  public users: UserRegisterData[];

  public tasks: Task[] = [];

  @ViewChild('asanaListComponent') private asanaListComponent: AsanaListComponent;
  constructor(
    private authService: AuthService
  ) {
    this.initForm();
    this.users = this.authService.getUsers().filter((us: UserRegisterData) => us.login.toLowerCase() !== 'admin');
    this.tasks = !!window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') || '')
      : [];
  }

  //is admin 
  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  //status form 
  status: any = [
    { value: 'one', viewValue: 'Off track' },
    { value: 'two', viewValue: 'On track' },
    { value: 'tree', viewValue: 'At risk' },
    { value: 'four', viewValue: 'On hold' },
    { value: 'fife', viewValue: 'Complete' }
  ];

  // priority form 
  priority: any = [
    { value: 'one', viewValue: 'Priority' },
    { value: 'two', viewValue: 'Dusalis' },
  ];

  //function form value go to logalstorage 
  public submit(): void {
    const login: string = this.form.value.login;

    const task: Task = {
      task: this.form.value.task,
      worker: this.form.value.worker || this.authService.activeUser?.login,
      status: this.form.value.status,
      title: this.form.value.title,
      priority: this.form.value.priority,
      dateline: this.form.value.dateline,
      creator: this.authService.activeUser?.login || '',
    }
    
    this.tasks.push(task);
    this.form.reset();
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.asanaListComponent.reload$.next(null);
    console.log(task);
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      task: new FormControl(null, [Validators.required]),
      worker: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      dateline: new FormControl(null, [Validators.required])
    })
  }

}
