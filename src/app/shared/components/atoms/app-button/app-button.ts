import { Component, input } from '@angular/core';

export type AppButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.html',
})
export class AppButton {
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly variant = input<AppButtonVariant>('primary');

  protected classes(): string {
    const base =
      'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';
    const variants: Record<AppButtonVariant, string> = {
      primary:
        'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
      secondary:
        'border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      danger:
        'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-100 dark:text-gray-200 dark:hover:bg-gray-800',
    };

    return `${base} ${variants[this.variant()]}`;
  }
}
