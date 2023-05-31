import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css'],
})
export class ErrorBoxComponent {
  errorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }) {
    this.errorMessage = data.errorMessage;
  }
}
