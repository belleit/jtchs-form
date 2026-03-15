import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyContactInfoElement } from '@formbricks/types/surveys/elements';
interface ContactInfoElementProps {
    element: TSurveyContactInfoElement;
    value?: string[];
    onChange: (responseData: TResponseData) => void;
    autoFocus?: boolean;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    currentElementId: string;
    autoFocusEnabled: boolean;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function ContactInfoElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<ContactInfoElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=contact-info-element.d.ts.map