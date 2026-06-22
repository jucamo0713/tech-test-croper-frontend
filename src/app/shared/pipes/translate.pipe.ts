import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '../i18n';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly locale = inject(LocaleService);

  transform(key: string, fallback?: string): string {
    return this.locale.translate(key, fallback);
  }
}
