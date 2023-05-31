import { Component, inject } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private validatorService = inject(ValidatorService);
  private authService = inject(AuthService);

  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    // name: ['', [Validators.required, Validators.minLength(1)], []],
    email: [
      'john@gmail.com',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
      [],
    ],
    password: ['123456', [Validators.required, Validators.minLength(6)], []],
  });

  // isFieldValid(field: string) {
  //   return this.validatorService.isFieldValid(this.myForm, field);
  // }

  // getErrorMessage() {
  //   return 'You must enter a value';
  // }

  onLogin() {
    console.log('info given => ', this.myForm.value);
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        return console.log('alles gut');
      },
      error: (err) => {
        return console.log('EEEEERRRRRRRORORRRRR:::', err);
      },
    });
  }
}
