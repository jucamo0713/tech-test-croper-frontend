import { Component, input, output } from '@angular/core';
import { AppButton } from '../../atoms';

@Component({
  selector: 'app-confirmation-modal',
  imports: [AppButton],
  templateUrl: './confirmation-modal.html',
})
export class ConfirmationModal {
  readonly open = input(false);
  readonly title = input('Confirm');
  readonly message = input('');
  readonly confirming = input(false);
  readonly cancel = output<void>();
  readonly confirm = output<void>();
}

