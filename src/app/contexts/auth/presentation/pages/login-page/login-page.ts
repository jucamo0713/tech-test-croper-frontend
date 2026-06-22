import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppAlert, AppButton } from '../../../../../shared/components';
import { TranslatePipe } from '../../../../../shared/pipes';
import { AuthFacade } from '../../../application/facades/auth.facade';

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@+"]+(\.[^<>()[\]\\.,;:\s+@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login-page',
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink, AppAlert, AppButton, TranslatePipe],
  templateUrl: './login-page.html',
})
export class LoginPage {
  protected readonly auth = inject(AuthFacade);
  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      updateOn: 'change',
      validators: [Validators.required, Validators.pattern(EMAIL_PATTERN)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });

  protected shouldShowEmailError(): boolean {
    const control = this.form.controls.email;
    return control.invalid && (control.dirty || control.touched);
  }

  protected shouldShowPasswordError(): boolean {
    const control = this.form.controls.password;
    return control.invalid && (control.dirty || control.touched);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password);
  }
}
