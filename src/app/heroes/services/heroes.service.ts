import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HeroInterface } from '../interfaces/hero.interface';
import { environments } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  // * IMPORTANT: in order for this to work, _id must also be part of myForm, but when sending current hero as argument for the updateCharacter or any other CRUD method, we cannot send current hero with id included, because that id is not part of the body(backend creates an automatic mongoid once the hero has been created), and it will give you the error you where trying to solve for a while. that is why on heroes service i also created a body with all properties except for the _id one.
  heroWithOutIdProp(hero: HeroInterface) {
    return {
      superhero: hero.superhero,
      publisher: hero.publisher,
      alterEgo: hero.alterEgo,
      firstAppearance: hero.firstAppearance,
      characters: hero.characters,
      photo: hero.photo,
    };
  }

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

  getHeroesByLetter(letter: string): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(
      `${this.baseUrl}/hero?letter=${letter}`
    );
  }

  addCharacter(hero: HeroInterface): Observable<HeroInterface> {
    // * , hero will act as my Body (think of postman!!).
    return this.http.post<HeroInterface>(
      `${this.baseUrl}/hero`,
      this.heroWithOutIdProp(hero)
    );
  }

  updateCharacter(hero: HeroInterface): Observable<HeroInterface> {
    if (!hero._id) {
      throw Error('hero name is required...');
    }

    // * , hero will act as my Body (think of postman!!).
    return this.http.patch<HeroInterface>(
      `${this.baseUrl}/hero/${hero._id}`,
      this.heroWithOutIdProp(hero)
    );
  }

  deleteCharacter(superheroName: string): Observable<boolean> {
    // * , hero will act as my Body (think of postman!!).
    return this.http.delete(`${this.baseUrl}/hero/${superheroName}`).pipe(
      map((res) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
