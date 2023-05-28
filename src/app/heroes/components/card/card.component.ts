import { Component, Input, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public hero!: HeroInterface;

  ngOnInit(): void {
    if (!this.hero) {
      throw Error('Hero property is missing!');
    }
  }
}
