import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocaleService } from '../../../i18n';
import { TranslatePipe } from '../../../pipes';

@Component({
  selector: 'app-language-selector',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './language-selector.html',
})
export class LanguageSelector {
  protected readonly locale = inject(LocaleService);
  protected readonly locales = this.locale.supportedLocales;

  protected changeLocale(value: string): void {
    const currentLocale = this.locale.currentLocale;

    this.locale.setLocale(value);

    if (this.locale.currentLocale !== currentLocale) {
      globalThis.location.reload();
    }
  }
}
