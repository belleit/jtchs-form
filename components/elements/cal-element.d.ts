import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyCalElement } from '@formbricks/types/surveys/elements';
interface CalElementProps {
    element: TSurveyCalElement;
    value: string;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    currentElementId: string;
    errorMessage?: string;
}
export declare function CalElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, errorMessage, }: Readonly<CalElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=cal-element.d.ts.map