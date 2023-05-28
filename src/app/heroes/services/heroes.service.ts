import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
}
