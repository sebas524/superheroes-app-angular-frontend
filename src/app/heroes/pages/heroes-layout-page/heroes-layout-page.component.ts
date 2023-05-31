import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

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
  private authService = inject(AuthService);
  // * with signals:
  // public user = computed(() => {
  //   this.authService.currentUser()
  // })
  // * with no signals (because this whole module has been done without any signals)
  get user() {
    return this.authService.currentUser();
  }

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

  onLogout() {
    this.authService.logout();
  }
}
