import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, MinValidator, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { UserRegisterData } from '../../../../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public form: FormGroup;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.initForm();
  }

  public submit(): void {

    const users: UserRegisterData[] = this.authService.getUsers();
    const user: UserRegisterData | undefined = users.find((userData: UserRegisterData) => userData.email === this.form.value.email);
    if (!user) {
      this._snackBar.open('user not found');
      return;
    }
    if (this.form.value.password !== user?.password) {
      this._snackBar.open('Check your password');
      return;
    }

    users.map((userRegisterData: UserRegisterData) => {
      if (userRegisterData.login === user?.login) {
        userRegisterData.isAuth = true;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users))

    this._snackBar.open('success');
    this.router.navigateByUrl('asana');
    this.authService.isAuth$.next(true);
    this.authService.activeUser = user
  }

  public getEmailErrorMesage(): string {
    const field = this.form.controls['email'];
    const isRequired: boolean = field?.errors?.['required'];
    return isRequired ? 'Field is required' : 'Email is not-valid';
  }
  public getPasswordErrorMesage(): string {
    const field = this.form.controls['password'];
    const isRequired: boolean = field?.errors?.['required'];
    return isRequired ? 'Field is required' : 'Password is not-valid';
  }
  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }


}
