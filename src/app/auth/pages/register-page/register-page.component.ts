import { Component, inject } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErrorBoxComponent } from '../../components/error-box/error-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private validatorService = inject(ValidatorService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)], []],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [],
    ],
    password: ['', [Validators.required, Validators.minLength(6)], []],
  });

  // isFieldValid(field: string) {
  //   return this.validatorService.isFieldValid(this.myForm, field);
  // }

  // getErrorMessage() {
  //   return 'You must enter a value';
  // }

  // * method to activate box opening:
  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorBoxComponent, {
      data: { errorMessage },
    });
  }

  // * this is to configure what the snackbar box will have inside:
  snackbarHandler(message: string): void {
    this.snackbar.open(message, 'ok', { duration: 4000 });
  }

  onRegister() {
    console.log('input values =>', this.myForm.value);
    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password).subscribe({
      next: () => {
        // * to navigate to dashboard because login credentials where correct:

        // * to navigate to dashboard because login credentials where correct:
        this.router.navigateByUrl('/heroes');
        // todo:
        // * pop up message:
        this.snackbarHandler(
          `Thank you for registering with us ${name}, enjoy! 😸💚`
        );
      },
      error: (err) => {
        return this.openErrorDialog(err);
      },
    });
  }
}
