export type TranslatableText = Partial<Record<string, string>>;

export function getLocalizedText(
  value: TranslatableText | undefined,
  preferredLang = 'es',
): string {
  const languageCode = preferredLang.split('-')[0] ?? preferredLang;
  return (
    value?.[preferredLang] ??
    value?.[languageCode] ??
    Object.values(value ?? {})[0] ??
    ''
  );
}
