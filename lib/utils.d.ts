import { Result } from '@formbricks/types/error-handlers';
import { ApiErrorResponse } from '@formbricks/types/errors';
import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TAllowedFileExtension } from '@formbricks/types/storage';
import { TSurveyBlock } from '@formbricks/types/surveys/blocks';
import { TSurveyElement, TSurveyElementChoice } from '@formbricks/types/surveys/elements';
import { TShuffleOption } from '@formbricks/types/surveys/types';
export declare const cn: (...classes: string[]) => string;
export declare const getSecureRandom: () => number;
export declare const getShuffledRowIndices: (n: number, shuffleOption: TShuffleOption) => number[];
export declare const getShuffledChoicesIds: (choices: TSurveyElementChoice[], shuffleOption: TShuffleOption) => string[];
export declare const calculateElementIdx: (survey: TJsEnvironmentStateSurvey, currentQustionIdx: number, totalCards: number) => number;
export declare const isFulfilled: <T>(val: PromiseSettledResult<T>) => val is PromiseFulfilledResult<T>;
export declare const isRejected: <T>(val: PromiseSettledResult<T>) => val is PromiseRejectedResult;
export declare const makeRequest: <T>(appUrl: string, endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: unknown) => Promise<Result<T, ApiErrorResponse>>;
export declare const getDefaultLanguageCode: (survey: TJsEnvironmentStateSurvey) => string | undefined;
export declare const getMimeType: (extension: TAllowedFileExtension) => string;
/**
 * Returns true if the string contains any RTL character.
 * @param text The input string to test
 */
export declare function isRTL(text: string): boolean;
/**
 * Returns true if the language code represents an RTL language.
 * @param languageCode The language code to test (e.g., "ar", "ar-SA", "he")
 */
export declare function isRTLLanguage(survey: TJsEnvironmentStateSurvey, languageCode: string): boolean;
/**
 * Derives a flat array of elements from the survey's blocks structure.
 * @param blocks The blocks array
 * @returns An array of TSurveyElement (pure elements without block-level properties)
 */
export declare const getElementsFromSurveyBlocks: (blocks: TSurveyBlock[]) => TSurveyElement[];
/**
 * Finds the parent block that contains the specified element ID.
 * Useful for accessing block-level properties like logic and button labels.
 * @param survey The survey object with blocks
 * @param elementId The ID of the element to find
 * @returns The parent block or undefined if not found
 */
export declare const findBlockByElementId: (blocks: TSurveyBlock[], elementId: string) => {
    id: string;
    name: string;
    elements: ({
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.OpenText;
        inputType: "number" | "url" | "email" | "phone" | "text";
        charLimit: {
            enabled?: boolean | undefined;
            min?: number | undefined;
            max?: number | undefined;
        };
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        placeholder?: Record<string, string> | undefined;
        longAnswer?: boolean | undefined;
        insightsEnabled?: boolean | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Consent;
        label: Record<string, string>;
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.MultipleChoiceSingle;
        choices: {
            id: string;
            label: Record<string, string>;
        }[];
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        shuffleOption?: "none" | "all" | "exceptLast" | undefined;
        otherOptionPlaceholder?: Record<string, string> | undefined;
        displayType?: "list" | "dropdown" | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.MultipleChoiceMulti;
        choices: {
            id: string;
            label: Record<string, string>;
        }[];
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        shuffleOption?: "none" | "all" | "exceptLast" | undefined;
        otherOptionPlaceholder?: Record<string, string> | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
        displayType?: "list" | "dropdown" | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.NPS;
        isColorCodingEnabled: boolean;
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        lowerLabel?: Record<string, string> | undefined;
        upperLabel?: Record<string, string> | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.CTA;
        buttonExternal: boolean;
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        buttonUrl?: string | undefined;
        ctaButtonLabel?: Record<string, string> | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Rating;
        scale: "number" | "smiley" | "star";
        range: 5 | 3 | 4 | 10 | 6 | 7;
        isColorCodingEnabled: boolean;
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        isDraft?: boolean | undefined;
        lowerLabel?: Record<string, string> | undefined;
        upperLabel?: Record<string, string> | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.PictureSelection;
        allowMulti: boolean;
        choices: {
            id: string;
            imageUrl: string;
        }[];
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Date;
        format: "M-d-y" | "d-M-y" | "y-M-d";
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        html?: Record<string, string> | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.FileUpload;
        allowMultipleFiles: boolean;
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        maxSizeInMB?: number | undefined;
        allowedFileExtensions?: ("heic" | "png" | "jpeg" | "jpg" | "webp" | "ico" | "pdf" | "eml" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "txt" | "csv" | "mp4" | "mov" | "avi" | "mkv" | "webm" | "mp3" | "zip" | "rar" | "7z" | "tar")[] | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Cal;
        calUserName: string;
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        calHost?: string | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Matrix;
        rows: {
            id: string;
            label: Record<string, string>;
        }[];
        columns: {
            id: string;
            label: Record<string, string>;
        }[];
        shuffleOption: "none" | "all" | "exceptLast";
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Address;
        addressLine1: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        addressLine2: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        city: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        state: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        zip: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        country: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.Ranking;
        choices: {
            id: string;
            label: Record<string, string>;
        }[];
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        otherOptionPlaceholder?: Record<string, string> | undefined;
        shuffleOption?: "none" | "all" | "exceptLast" | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    } | {
        id: string;
        headline: Record<string, string>;
        required: boolean;
        type: import("@formbricks/types/surveys/constants").TSurveyElementTypeEnum.ContactInfo;
        firstName: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        lastName: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        email: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        phone: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        company: {
            show: boolean;
            required: boolean;
            placeholder: Record<string, string>;
        };
        subheader?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
        videoUrl?: string | undefined;
        scale?: "number" | "smiley" | "star" | undefined;
        range?: 5 | 3 | 4 | 10 | 7 | undefined;
        isDraft?: boolean | undefined;
        validation?: {
            rules: {
                id: string;
                type: "pattern" | "contains" | "url" | "email" | "equals" | "doesNotContain" | "isBetween" | "phone" | "doesNotEqual" | "isGreaterThan" | "isLessThan" | "minLength" | "maxLength" | "minValue" | "maxValue" | "minSelections" | "maxSelections" | "minRanked" | "rankAll" | "minRowsAnswered" | "answerAllRows" | "isLaterThan" | "isEarlierThan" | "isNotBetween" | "fileExtensionIs" | "fileExtensionIsNot";
                params: {
                    min: number;
                } | {
                    max: number;
                } | {
                    pattern: string;
                    flags?: string | undefined;
                } | Record<string, never> | {
                    min: number;
                } | {
                    max: number;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    value: string;
                } | {
                    min: number;
                } | {
                    max: number;
                } | {
                    date: string;
                } | {
                    date: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    startDate: string;
                    endDate: string;
                } | {
                    min: number;
                } | {
                    min: number;
                } | {
                    extensions: string[];
                } | {
                    extensions: string[];
                };
                field?: "zip" | "email" | "phone" | "addressLine1" | "addressLine2" | "city" | "state" | "country" | "firstName" | "lastName" | "company" | undefined;
            }[];
            logic: "or" | "and";
        } | undefined;
    })[];
    logic?: {
        id: string;
        conditions: import('@formbricks/types/surveys/logic').TConditionGroup;
        actions: ({
            id: string;
            objective: "calculate";
            variableId: string;
            operator: "assign" | "add" | "subtract" | "multiply" | "divide";
            value: {
                type: "element";
                value: string;
                meta?: Record<string, string> | undefined;
            } | {
                type: "variable";
                value: string;
            } | {
                type: "hiddenField";
                value: string;
            } | {
                type: "static";
                value: number;
            };
        } | {
            id: string;
            objective: "calculate";
            variableId: string;
            operator: "concat" | "assign";
            value: {
                type: "element";
                value: string;
                meta?: Record<string, string> | undefined;
            } | {
                type: "variable";
                value: string;
            } | {
                type: "hiddenField";
                value: string;
            } | {
                type: "static";
                value: string;
            };
        } | {
            id: string;
            objective: "requireAnswer";
            target: string;
        } | {
            id: string;
            objective: "jumpToBlock";
            target: string;
        })[];
    }[] | undefined;
    logicFallback?: string | undefined;
    buttonLabel?: Record<string, string> | undefined;
    backButtonLabel?: Record<string, string> | undefined;
} | undefined;
/**
 * Converts a block ID to the first element ID in that block.
 * Used for navigation when logic jumps to a block.
 * @param survey The survey object with blocks
 * @param blockId The block ID to convert
 * @returns The first element ID in the block, or undefined if block not found or empty
 */
export declare const getFirstElementIdInBlock: (survey: TJsEnvironmentStateSurvey, blockId: string) => string | undefined;
//# sourceMappingURL=utils.d.ts.map