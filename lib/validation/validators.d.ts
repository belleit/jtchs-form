import { TFunction } from 'i18next';
import { TResponseDataValue } from '@formbricks/types/responses';
import { TSurveyElement } from '@formbricks/types/surveys/elements';
import { TValidationRuleParams, TValidationRuleType, TValidatorCheckResult } from '@formbricks/types/surveys/validation-rules';
/**
 * Generic validator interface
 * Uses type assertions internally to handle the discriminated union params
 */
export interface TValidator {
    check: (value: TResponseDataValue, params: TValidationRuleParams, element: TSurveyElement) => TValidatorCheckResult;
    getDefaultMessage: (params: TValidationRuleParams, element: TSurveyElement, t: TFunction) => string;
}
/**
 * Registry of all validators, keyed by rule type
 */
export declare const validators: Record<TValidationRuleType, TValidator>;
//# sourceMappingURL=validators.d.ts.map