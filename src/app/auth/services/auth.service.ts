import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import {
  AuthStatus,
  CheckTokenRes,
  LoginRes,
  RegisterRes,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  // * to see current state of authentication:
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // * we need to make some of the previous attribtures public in order to have accesss to them, but we should do it indirectly in order to avoid altering data. we do this via a computed signal (a getter function if you are not using signals):
  public currentUser = computed(() => {
    return this._currentUser();
    // * basically by doing this, if you where to use this.currentUser, you would be able to use set, since it is only readonly.
  });
  public authStatus = computed(() => {
    return this._authStatus();
  });

  private setAuthInfo(user: User, token: string): boolean {
    // * we assing this user to the _currentUser variable:
    this._currentUser.set(user);
    // * and we change current status as well to authenticated(because here user login was succesful)
    this._authStatus.set(AuthStatus.authenticated);
    // * REMEMBER these updated properties will then also update the computed properties as well because they are connected with each other!

    // * token we can storage it in localStorage:
    localStorage.setItem('heroesToken', token);
    return true;
  }

  constructor() {
    this.checkStatus().subscribe();
  }

  // ! TO REGISTER:

  register(name: string, email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/authentication/register`;
    const body = {
      name: name,
      email: email,
      password: password,
    };
    return this.http.post<RegisterRes>(url, body).pipe(
      map(({ user, token }) => this.setAuthInfo(user, token)),
      catchError(
        // *  if register info given is WRONG then catch error comes into play:
        (err) => {
          return throwError(() => {
            return err.error.message;
          });
        }
      )
    );
  }

  // ! TO AUTHENTICATE:

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/authentication/authenticate`;
    // * think of body you use to send info to backend in postman:
    const body = { email: email, password: password };

    return this.http.post<LoginRes>(url, body).pipe(
      // * so we know here we have the response.
      map(({ user, token }) => {
        return this.setAuthInfo(user, token);
      }),
      // ! up to here is only in the case that the authentication was succsessfull!!!!!
      catchError(
        // todo: errors

        (err) => {
          console.log(err);
          return throwError(() => {
            return err.error.message;
            // * this line is basically grabbing the error object, and getting the message given inside.
          });
        }
      )
    );
  }

  // ! TO CHECK TOKEN:

  checkStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/authentication/check-token`;
    const token = localStorage.getItem('heroesToken');

    if (!token) {
      this.logout();
      return of(false);
    }

    // * remmeber that in postman you have headers tab(sidebar) that allows you to check your token. this we are going to do here in code as well:
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // * --- *

    return this.http.get<CheckTokenRes>(url, { headers: headers }).pipe(
      map(({ user, token }) => {
        return this.setAuthInfo(user, token);
      }),
      catchError(() => {
        // * if we have an error, then that means we are not authenticated. therefore:
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    // * first delete token in localStorage:
    localStorage.removeItem('heroesToken');
    // * change values of auth variables:
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    // * rememebr!!! there is no need to redirect to some route because we are already handling that on app.component with the switch case depending on the  auth status!!
  }
}
