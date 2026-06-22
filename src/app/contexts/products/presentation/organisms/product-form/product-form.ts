import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AppButton } from '../../../../../shared/components';
import { Product } from '../../../domain/models';
import { ProductFormModel } from '../../../infrastructure/mappers';

type TranslationGroup = FormGroup<{
  language: FormControl<string>;
  value: FormControl<string>;
}>;

type PriceGroup = FormGroup<{
  currency: FormControl<string>;
  value: FormControl<number | null>;
}>;

const AVAILABLE_LANGUAGES = ['en', 'es'] as const;
const AVAILABLE_CURRENCIES = ['USD', 'COP'] as const;
const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES[0];
const DEFAULT_CURRENCY = AVAILABLE_CURRENCIES[0];

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, AppButton],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnChanges, OnInit {
  readonly product = input<Product | null>(null);
  readonly saving = input(false);
  readonly submitLabel = input('Save');
  readonly save = output<ProductFormModel>();

  protected readonly form = new FormGroup({
    name: new FormArray<TranslationGroup>([], [
      minFormArrayLength(1),
      uniqueControlValue('language'),
    ]),
    description: new FormArray<TranslationGroup>([]),
    prices: new FormArray<PriceGroup>([], [
      minFormArrayLength(1),
      uniqueControlValue('currency'),
    ]),
    status: new FormControl('', { nonNullable: true }),
  });
  protected readonly availableLanguages = AVAILABLE_LANGUAGES;
  protected readonly availableCurrencies = AVAILABLE_CURRENCIES;

  ngOnInit(): void {
    if (this.nameTranslations.length === 0 && this.prices.length === 0) {
      this.populate(this.product());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.populate(this.product());
    }
  }

  protected get nameTranslations(): FormArray<TranslationGroup> {
    return this.form.controls.name;
  }

  protected get descriptionTranslations(): FormArray<TranslationGroup> {
    return this.form.controls.description;
  }

  protected get prices(): FormArray<PriceGroup> {
    return this.form.controls.prices;
  }

  protected addLanguage(): void {
    const language = this.nextAvailableLanguage();
    if (!language) {
      return;
    }

    this.nameTranslations.push(this.createTranslationGroup(language, '', true));
    this.descriptionTranslations.push(this.createTranslationGroup(language, ''));
    this.nameTranslations.markAsDirty();
    this.descriptionTranslations.markAsDirty();
  }

  protected removeLanguage(language: string): void {
    this.removeByLanguage(this.nameTranslations, language);
    this.removeByLanguage(this.descriptionTranslations, language);
    this.nameTranslations.markAsTouched();
  }

  protected addCurrency(): void {
    const currency = this.nextAvailableCurrency();
    if (!currency) {
      return;
    }

    this.prices.push(this.createPriceGroup(currency, null));
    this.prices.markAsDirty();
  }

  protected removePrice(index: number): void {
    this.prices.removeAt(index);
    this.prices.markAsTouched();
  }

  protected hasMoreLanguages(): boolean {
    return Boolean(this.nextAvailableLanguage());
  }

  protected hasMoreCurrencies(): boolean {
    return Boolean(this.nextAvailableCurrency());
  }

  protected languageOptionDisabled(language: string, index: number): boolean {
    return this.nameTranslations.controls.some(
      (group, candidateIndex) =>
        candidateIndex !== index && group.controls.language.value === language,
    );
  }

  protected currencyOptionDisabled(currency: string, index: number): boolean {
    return this.prices.controls.some(
      (group, candidateIndex) =>
        candidateIndex !== index && group.controls.currency.value === currency,
    );
  }

  protected syncDescriptionLanguage(index: number): void {
    const description = this.descriptionTranslations.at(index);
    const name = this.nameTranslations.at(index);

    if (description && name) {
      description.controls.language.setValue(name.controls.language.value);
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit({
      name: this.toTranslationRecord(this.nameTranslations),
      description: this.toTranslationRecord(this.descriptionTranslations),
      prices: this.toPriceRecord(),
      status: this.form.controls.status.value || undefined,
    });
  }

  private populate(product: Product | null): void {
    this.nameTranslations.clear();
    this.descriptionTranslations.clear();
    this.prices.clear();

    const languages = new Set<string>([
      ...this.filterAvailableLanguages(Object.keys(product?.name ?? {})),
      ...this.filterAvailableLanguages(Object.keys(product?.description ?? {})),
    ]);

    if (languages.size === 0) {
      languages.add(DEFAULT_LANGUAGE);
    }

    for (const language of languages) {
      this.nameTranslations.push(
        this.createTranslationGroup(language, product?.name[language] ?? '', true),
      );
      this.descriptionTranslations.push(
        this.createTranslationGroup(language, product?.description?.[language] ?? ''),
      );
    }

    const prices = this.filterAvailablePrices(Object.entries(product?.prices ?? {}));
    if (prices.length === 0) {
      prices.push([DEFAULT_CURRENCY, null]);
    }

    for (const [currency, value] of prices) {
      this.prices.push(this.createPriceGroup(currency, value ?? null));
    }

    this.form.controls.status.setValue(product?.status ?? 'active');
  }

  private createTranslationGroup(
    language: string,
    value: string,
    required = false,
  ): TranslationGroup {
    return new FormGroup({
      language: new FormControl(language, { nonNullable: true }),
      value: new FormControl(value, {
        nonNullable: true,
        validators: required ? [Validators.required] : [],
      }),
    });
  }

  private createPriceGroup(currency: string, value: number | null): PriceGroup {
    return new FormGroup({
      currency: new FormControl(currency, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      value: new FormControl(value, [Validators.required, Validators.min(0)]),
    });
  }

  private hasLanguage(language: string): boolean {
    return this.nameTranslations.controls.some(
      (item) => item.controls.language.value === language,
    );
  }

  private hasCurrency(currency: string): boolean {
    return this.prices.controls.some(
      (item) => item.controls.currency.value === currency,
    );
  }

  private nextAvailableLanguage(): string | undefined {
    return AVAILABLE_LANGUAGES.find((language) => !this.hasLanguage(language));
  }

  private nextAvailableCurrency(): string | undefined {
    return AVAILABLE_CURRENCIES.find((currency) => !this.hasCurrency(currency));
  }

  private filterAvailableLanguages(languages: string[]): string[] {
    return languages.filter((language) =>
      AVAILABLE_LANGUAGES.includes(language as (typeof AVAILABLE_LANGUAGES)[number]),
    );
  }

  private filterAvailablePrices(
    prices: [string, number | undefined][],
  ): [string, number | null][] {
    return prices
      .filter(([currency]) =>
        AVAILABLE_CURRENCIES.includes(
          currency as (typeof AVAILABLE_CURRENCIES)[number],
        ),
      )
      .map(([currency, value]) => [currency, value ?? null]);
  }

  private removeByLanguage(
    array: FormArray<TranslationGroup>,
    language: string,
  ): void {
    const index = array.controls.findIndex(
      (item) => item.controls.language.value === language,
    );
    if (index >= 0) {
      array.removeAt(index);
    }
  }

  private toTranslationRecord(array: FormArray<TranslationGroup>): Record<string, string> {
    return array.controls.reduce<Record<string, string>>((acc, group) => {
      const language = group.controls.language.value;
      const value = group.controls.value.value.trim();
      if (value) {
        acc[language] = value;
      }
      return acc;
    }, {});
  }

  private toPriceRecord(): Record<string, number> {
    return this.prices.controls.reduce<Record<string, number>>((acc, group) => {
      const currency = group.controls.currency.value.trim().toUpperCase();
      const value = group.controls.value.value;
      if (currency && typeof value === 'number') {
        acc[currency] = value;
      }
      return acc;
    }, {});
  }
}

function minFormArrayLength(minLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as unknown[] | null;
    return Array.isArray(value) && value.length >= minLength
      ? null
      : { minItems: { requiredLength: minLength } };
  };
}

function uniqueControlValue(controlName: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as Array<Record<string, unknown>> | null;

    if (!Array.isArray(value)) {
      return null;
    }

    const values = value
      .map((item) => item[controlName])
      .filter((item): item is string => typeof item === 'string' && item.length > 0);

    return new Set(values).size === values.length
      ? null
      : { duplicatedValue: true };
  };
}
