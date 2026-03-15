import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyConsentElement } from '@formbricks/types/surveys/elements';
interface ConsentElementProps {
    element: TSurveyConsentElement;
    value: string;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function ConsentElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<ConsentElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=consent-element.d.ts.map