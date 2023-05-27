import { Component } from '@angular/core';

interface sidebarItems {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-heroes-layout-page',
  templateUrl: './heroes-layout-page.component.html',
  styleUrls: ['./heroes-layout-page.component.css'],
})
export class HeroesLayoutPageComponent {
  public myItems: sidebarItems[] = [
    {
      label: 'List',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Add',
      icon: 'add',
      url: './new-hero',
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search',
    },
  ];
}
