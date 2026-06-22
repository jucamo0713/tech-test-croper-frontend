import { Component, input } from '@angular/core';

export type AppAlertType = 'info' | 'success' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.html',
})
export class AppAlert {
  readonly message = input<string | null | undefined>();
  readonly type = input<AppAlertType>('info');

  protected classes(): string {
    const variants: Record<AppAlertType, string> = {
      info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
      success:
        'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
      error:
        'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
    };

    return `rounded-lg border p-4 text-sm ${variants[this.type()]}`;
  }
}

