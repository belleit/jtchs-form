import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyDateElement } from '@formbricks/types/surveys/elements';
import { TSurveyLanguage } from '@formbricks/types/surveys/types';
interface DateElementProps {
    element: TSurveyDateElement;
    value: string;
    onChange: (responseData: TResponseData) => void;
    autoFocus?: boolean;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    errorMessage?: string;
    surveyLanguages: TSurveyLanguage[];
    dir?: "ltr" | "rtl" | "auto";
}
export declare function DateElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, errorMessage, surveyLanguages, dir, }: Readonly<DateElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=date-element.d.ts.map