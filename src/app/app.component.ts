import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatButton } from '@angular/material/button';
import { UserRegisterData } from './interfaces';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButton,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'asana';

  public isAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {


  }

  public logout(): void {

    const users: UserRegisterData[] = this.authService.getUsers();
    console.log(users);
    users.map((user: UserRegisterData) => {
      if (user.login === this.authService.activeUser?.login) {
        user.isAuth = false;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users));

    this.router.navigateByUrl('auth/login'),
      this.authService.activeUser = null;
    this.authService.isAuth$.next(false);
  }


}
