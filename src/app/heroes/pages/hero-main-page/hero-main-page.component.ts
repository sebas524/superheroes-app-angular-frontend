import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HeroInterface } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-main-page',
  templateUrl: './hero-main-page.component.html',
  styleUrls: ['./hero-main-page.component.css'],
})
export class HeroMainPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public hero?: HeroInterface;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          return console.log({ params });
        }),
        // * we get the id inside params:
        switchMap(({ id }) => {
          return this.heroesService.getHeroById(id);
        })
      )
      .subscribe((hero) => {
        // * if wrong id, then we take user to main page:
        if (!hero) {
          return this.router.navigateByUrl('/heroes');
        }
        // * if right id, then:
        return (this.hero = hero);
      });

    this.heroesService.getHeroById;
  }
}
