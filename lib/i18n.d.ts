import { TFunction } from 'i18next';
import { TI18nString } from '@formbricks/types/i18n';
export declare const unescapeNewlines: (s: string) => string;
export declare const getLocalizedValue: (value: TI18nString | undefined, languageId: string, replaceNewLines?: boolean) => string;
/**
 * Get translation function from surveys package's i18n instance
 * This ensures translations are always available, even when called from API routes
 */
export declare const getTranslations: (languageCode: string) => TFunction;
//# sourceMappingURL=i18n.d.ts.map