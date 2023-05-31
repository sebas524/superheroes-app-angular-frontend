import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeroesService } from '../../services/heroes.service';
import { HeroInterface } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css'],
})
export class NewHeroPageComponent implements OnInit {
  // private validatorService = inject(ValidatorService);

  private fb = inject(FormBuilder);
  private heroesService = inject(HeroesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  public myForm: FormGroup = this.fb.group({
    _id: [],
    superhero: ['', [Validators.required, Validators.minLength(1)], []],
    alterEgo: ['', [Validators.required, Validators.minLength(1)], []],
    firstAppearance: ['', [Validators.required, Validators.minLength(1)], []],
    characters: ['', [Validators.required, Validators.minLength(1)], []],
    publisher: ['', [Validators.required, Validators.minLength(1)], []],
    photo: ['', [Validators.required, Validators.minLength(1)], []],
  });

  ngOnInit(): void {
    // * if it DOES NOT INCLUDE edit, than you are adding a new hero
    if (!this.router.url.includes('edit')) {
      return;
    }
    // * if previous condition pass, than that means you are editing. which means you need to load the heroes current saved data:
    this.activatedRoute.params
      .pipe(
        // * remember id path is in heroes-routing
        switchMap(
          //* remember you can destructure id from params
          ({ id }) => {
            // * remember here you get either hero or undefined
            return this.heroesService.getHeroById(id);
          }
        )
      )
      .subscribe((hero) => {
        // * if hero does not exist,
        if (!hero) {
          return this.router.navigateByUrl('/');
        }
        // * if it does exist then that data store in hero will be set to reset() like this:
        this.myForm.reset(hero);
        console.log('curreeent: ', this.currentHero);
        return;
      });
  }

  // isFieldValid(field: string) {
  //   return this.validatorService.isFieldValid(this.myForm, field);
  // }

  getErrorMessage() {
    return 'You must enter a value';
  }

  // * this is to configure what the snackbar box will have inside:
  snackbarHandler(message: string): void {
    this.snackbar.open(message, 'done', { duration: 2500 });
  }

  get currentHero(): HeroInterface {
    const hero = this.myForm.value;
    return hero;
  }

  onSave() {
    if (this.myForm.invalid) {
      return;
    }

    // * remeber that ngOnInit already has logic to see if you are editing or creating new hero. so now, if editing, then  update method, else:  create method:
    // * IMPORTANT: in order for this to work, _id must also be part of myForm, but when sending current hero as argument for the updateCharacter or any other CRUD method, we cannot send current hero with id included, because that id is not part of the body(backend creates an automatic mongoid once the hero has been created), and it will give you the error you where trying to solve for a while. that is why on heroes service i also created a body with all properties except for the _id one.
    if (this.currentHero._id) {
      // ! UPDATE
      return this.heroesService
        .updateCharacter(this.currentHero)
        .subscribe((hero) => {
          console.log('afteR:', hero);

          // * pop up message:
          this.snackbarHandler(
            `${hero.superhero} has been successfully updated!`
          );

          // * navigate to updated hero:
          this.router.navigate(['/heroes', hero.superhero]);

          //TODO: SHOW SNACKBAR
        });
    }

    // ! CREATE
    return this.heroesService
      .addCharacter(this.currentHero)
      .subscribe((hero) => {
        // * pop up message:
        this.snackbarHandler(
          `${hero.superhero} has been successfully created!`
        );
        // * navigate to new hero:
        this.router.navigate(['/heroes', hero.superhero]);
      });
  }

  onDelete() {
    if (!this.currentHero._id) {
      throw Error('Hero id is required!');
    }
    console.log('onDelete log =>', this.currentHero);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        // * we know this returns either true false or undefined, therefore, with filter, we are only going to allow true to pass.
        filter((result: boolean) => {
          return result;
        }),
        // * here we see that result = true
        tap((result) => {
          console.log(result);
        }),
        // * since we know its true, then that means the user wants to delete it. therefore we switchmap it:
        switchMap((result) => {
          return this.heroesService.deleteCharacter(this.currentHero._id!);
        }),
        // * now whatever the result given by the method deleteCharacter we tap it to see what it is:
        tap((deleted) => {
          console.log('deleted: ', deleted);
        }),
        // * if deleted = true then
        filter((deleted) => {
          return deleted;
        })
      )
      // * so then basically whatever is inside the subscribed will only be triggered knowing that deleted = true, (that the hero exists no more)
      .subscribe(() => {
        return this.router.navigateByUrl('/heroes');
      });

    // dialogRef.afterClosed().subscribe((result) => {
    //   // * so here you arelady have the result from the box (close/no thanks = false or delete = true)

    //   if (!result) {
    //     return;
    //   }

    //   // ! DELETE

    //   // * argument in () has ! because we know that it has an id by this point!
    //   this.heroesService
    //     .deleteCharacter(this.currentHero._id!)
    //     .subscribe((deleted) => {
    //       if (deleted) {
    //         console.log('entry has been deleted');

    //         this.router.navigateByUrl('/heroes');
    //         return;
    //       }
    //     });
    // });
  }
}
