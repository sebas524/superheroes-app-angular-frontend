import { Pipe, PipeTransform } from '@angular/core';
import { HeroInterface } from '../interfaces/hero.interface';

@Pipe({
  name: 'myImg',
})
export class MyImgPipe implements PipeTransform {
  transform(hero: HeroInterface): string {
    if (!hero.photo) {
      return 'assets/no-image.jpeg';
    }
    return hero.photo;
  }
}
