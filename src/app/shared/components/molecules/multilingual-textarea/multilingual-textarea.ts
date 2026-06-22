import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multilingual-textarea',
  imports: [ReactiveFormsModule],
  templateUrl: './multilingual-textarea.html',
})
export class MultilingualTextarea {
  readonly label = input.required<string>();
  readonly controlName = input.required<string>();
  readonly language = input.required<string>();
  readonly group = input.required<FormGroup>();
}

