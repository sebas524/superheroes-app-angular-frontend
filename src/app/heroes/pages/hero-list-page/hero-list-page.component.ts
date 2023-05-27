import { Component, OnInit, inject } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-list-page',
  templateUrl: './hero-list-page.component.html',
  styleUrls: ['./hero-list-page.component.css'],
})
export class HeroListPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  public heroes: HeroInterface[] = [];

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((response) => {
      this.heroes = response;

      return console.log(this.heroes);
    });
  }
}
