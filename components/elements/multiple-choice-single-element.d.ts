import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyMultipleChoiceElement } from '@formbricks/types/surveys/elements';
interface MultipleChoiceSingleElementProps {
    element: TSurveyMultipleChoiceElement;
    value?: string;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function MultipleChoiceSingleElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<MultipleChoiceSingleElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=multiple-choice-single-element.d.ts.map