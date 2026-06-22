import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_CONFIG } from '../../core/config';
import { SUPPORTED_LOCALES, SupportedLocale } from '../../core/i18n';
import { TranslatableText } from '../value-objects';

const LOCALE_KEY = 'croper.locale';

const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  'es-CO': {
    'auth.login.title': 'Iniciar sesion',
    'auth.login.description': 'Accede a tu espacio de productos.',
    'auth.login.submit': 'Iniciar sesion',
    'auth.login.noAccount': 'No tienes cuenta?',
    'auth.login.register': 'Registrate',
    'auth.register.title': 'Registro',
    'auth.register.description': 'Crea tu cuenta para administrar productos.',
    'auth.register.submit': 'Registrarse',
    'auth.register.alreadyRegistered': 'Ya estas registrado?',
    'auth.register.login': 'Iniciar sesion',
    'auth.register.passwordMinLength': 'La contrasena debe tener al menos 6 caracteres.',
    'auth.register.passwordsMismatch': 'Las contrasenas no coinciden.',
    'auth.form.email': 'Correo electronico',
    'auth.form.emailRequired': 'El correo electronico es requerido.',
    'auth.form.emailInvalid': 'Ingresa un correo electronico valido.',
    'auth.form.password': 'Contrasena',
    'auth.form.passwordRequired': 'La contrasena es requerida.',
    'auth.form.confirmPassword': 'Confirmar contrasena',
    'auth.form.confirmPasswordRequired': 'La confirmacion de contrasena es requerida.',
    'common.language': 'Idioma',
  },
  'en-US': {},
};

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly config = inject(APP_CONFIG);
  private readonly localeSubject = new BehaviorSubject<string>(
    this.resolveInitialLocale(),
  );

  readonly locale$ = this.localeSubject.asObservable();

  get currentLocale(): string {
    return this.localeSubject.value;
  }

  get supportedLocales(): readonly SupportedLocale[] {
    return SUPPORTED_LOCALES;
  }

  setLocale(locale: string): void {
    const nextLocale = this.normalizeLocale(locale);
    globalThis.localStorage?.setItem(LOCALE_KEY, nextLocale);
    this.localeSubject.next(nextLocale);
  }

  resolveText(value: TranslatableText | undefined): string {
    if (!value) {
      return '';
    }

    const currentLanguage = this.toLanguageCode(this.currentLocale);
    const defaultLanguage = this.toLanguageCode(this.config.defaultLocale);

    return (
      value[this.currentLocale] ??
      value[currentLanguage] ??
      value[this.config.defaultLocale] ??
      value[defaultLanguage] ??
      Object.values(value).find((item) => (item ?? '').trim().length > 0) ??
      ''
    );
  }

  translate(key: string, fallback = key): string {
    return (
      UI_TRANSLATIONS[this.currentLocale]?.[key] ??
      UI_TRANSLATIONS[this.config.defaultLocale]?.[key] ??
      fallback
    );
  }

  private resolveInitialLocale(): string {
    const stored = globalThis.localStorage?.getItem(LOCALE_KEY);
    return this.normalizeLocale(stored ?? this.config.defaultLocale);
  }

  private normalizeLocale(locale: string): string {
    return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
      ? locale
      : this.config.defaultLocale;
  }

  private toLanguageCode(locale: string): string {
    return locale.split('-')[0] ?? locale;
  }
}
