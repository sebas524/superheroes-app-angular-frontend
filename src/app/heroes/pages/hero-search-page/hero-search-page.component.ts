import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { HeroInterface } from '../../interfaces/hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-search-page',
  templateUrl: './hero-search-page.component.html',
  styleUrls: ['./hero-search-page.component.css'],
})
export class HeroSearchPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  private router = inject(Router);
  public searchControl = new FormControl();
  public heroes: HeroInterface[] = [];

  constructor() {}
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        switchMap((query) => {
          if (query) {
            return this.heroesService.getHeroesByLetter(query);
          } else {
            return [];
          }
        })
      )
      .subscribe((results) => {
        this.heroes = results;
      });
  }

  onOptionSelected(event: any) {
    const selectedResult = event.option.value;
    console.log('XXX: ', selectedResult);

    // Redirect to the desired route based on the selected result
    this.router.navigateByUrl(`/heroes/${selectedResult}`); // Replace '/details' with your desired route
  }
}
