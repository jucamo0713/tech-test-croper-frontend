import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '../i18n';
import { TranslatableText } from '../value-objects';

@Pipe({
  name: 'translatableText',
  pure: false,
})
export class TranslatableTextPipe implements PipeTransform {
  private readonly locale = inject(LocaleService);

  transform(value: TranslatableText | undefined): string {
    return this.locale.resolveText(value);
  }
}

