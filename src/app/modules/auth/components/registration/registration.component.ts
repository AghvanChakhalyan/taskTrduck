import { ChangeDetectionStrategy, Component, booleanAttribute } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formFieldTypes } from '../../types';
import { UserRegisterData } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  public form: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private route: Router,
    private authService: AuthService
  ) {
    this.initForm();
  }

  public submit(): void {
    const login: string = this.form.value.login;
    const userData: UserRegisterData = {
      email: this.form.value.email,
      password: this.form.value.password,
      login,
      isAuth: true,
    }
    const users: UserRegisterData[] = this.authService.getUsers();
    users.push(userData);

    window.localStorage.setItem('users', JSON.stringify(users))

    this._snackBar.open('succes');
    this.route.navigate(['./asana']);
    this.authService.isAuth$.next(true);
    this.authService.activeUser = userData;

  }


  public getErrorMessage(fieldName: formFieldTypes): string {
    const field: AbstractControl = this.form.controls[fieldName];
    const isRequired: boolean = field?.errors?.['required'];
    if (isRequired) {
      return 'Field is required';
    }
    return fieldName === 'email'
      ? 'Email is not-valid'
      : 'Min length is 5';
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }
}
