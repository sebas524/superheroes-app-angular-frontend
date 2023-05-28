import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HeroInterface } from '../interfaces/hero.interface';
import { environments } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(`${this.baseUrl}/hero`);
  }

  getHeroById(id: string): Observable<HeroInterface | undefined> {
    return this.http.get<HeroInterface>(`${this.baseUrl}/hero/${id}`).pipe(
      // * if invalid id, then that would return to us the assigned error from the backend. but we need to  return  an observable, therefore:
      catchError((err) => {
        return of(undefined);
      })
    );
  }
}
