import { Component, inject } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private validatorService = inject(ValidatorService);

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

  onLogin() {}
}
