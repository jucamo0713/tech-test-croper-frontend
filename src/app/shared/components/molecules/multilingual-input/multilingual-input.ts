import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multilingual-input',
  imports: [ReactiveFormsModule],
  templateUrl: './multilingual-input.html',
})
export class MultilingualInput {
  readonly label = input.required<string>();
  readonly controlName = input.required<string>();
  readonly language = input.required<string>();
  readonly group = input.required<FormGroup>();
  readonly required = input(false);
}

