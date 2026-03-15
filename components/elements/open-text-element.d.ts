import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyOpenTextElement } from '@formbricks/types/surveys/elements';
interface OpenTextElementProps {
    element: TSurveyOpenTextElement;
    value: string;
    onChange: (responseData: TResponseData) => void;
    autoFocus?: boolean;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function OpenTextElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<OpenTextElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=open-text-element.d.ts.map