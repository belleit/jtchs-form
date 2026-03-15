import { TResponseData } from '@formbricks/types/responses';
import { TSurveyElement } from '@formbricks/types/surveys/elements';
interface ResponseErrorComponentProps {
    readonly questions: TSurveyElement[];
    readonly responseData: TResponseData;
    readonly onRetry?: () => void;
    readonly isRetrying?: boolean;
}
export declare function ResponseErrorComponent({ questions, responseData, onRetry, isRetrying, }: ResponseErrorComponentProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=response-error-component.d.ts.map