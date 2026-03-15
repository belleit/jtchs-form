import { TResponseData, TResponseDataValue } from '@formbricks/types/responses';
import { TSurveyElement } from '@formbricks/types/surveys/elements';
import { TValidationErrorMap, TValidationResult } from '@formbricks/types/surveys/validation-rules';
/**
 * Single entrypoint for validating an element's response value.
 * Called by block-conditional.tsx during form submission.
 *
 * @param element - The survey element being validated
 * @param value - The response value for this element
 * @param languageCode - Current language code for error messages
 * @returns Validation result with valid flag and array of errors
 */
export declare const validateElementResponse: (element: TSurveyElement, value: TResponseDataValue, languageCode: string) => TValidationResult;
/**
 * Validate all elements in a block, returning an error map.
 *
 * @param elements - Array of elements to validate
 * @param responses - Response data keyed by element ID
 * @param languageCode - Current language code for error messages
 * @returns Map of element IDs to their validation errors
 */
export declare const validateBlockResponses: (elements: TSurveyElement[], responses: TResponseData, languageCode: string) => TValidationErrorMap;
/**
 * Get the first error message for an element from the error map.
 * Useful for UI components that only display one error at a time.
 *
 * @param errorMap - The validation error map
 * @param elementId - The element ID to get error for
 * @returns The first error message or undefined
 */
export declare const getFirstErrorMessage: (errorMap: TValidationErrorMap, elementId: string) => string | undefined;
//# sourceMappingURL=evaluator.d.ts.map