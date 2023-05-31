import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private router = inject(Router);

  // ! all angular apps pass through here(app.component.ts)
  // * authentication for my app is something i need at anytime. i need to know when my user is authenticated or not...
  // * therefore:
  private authService = inject(AuthService);
  // * it is also important to have some sort of variable that depending of the service, will tell me if im authenticated or not.
  // * remeber that in auth service, auth status is set to checking as default. checking does not mean authtendicated or not authenticated. it just means checking. pretty obvious now, but who knows when you go back to this code later on...

  public finishedCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus());

    // ? is it done checking:
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
      // * no
    }
    // * yes
    return true;
    // * so now you have either authenticated or not authenticated.
  });

  public authStatusChangeEffect = effect(() => {
    switch (this.authService.authStatus()) {
      // * if we are in checking:
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/heroes');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth');
        return;

      default:
        break;
    }
  });
}
