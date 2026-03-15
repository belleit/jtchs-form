import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyNPSElement } from '@formbricks/types/surveys/elements';
interface NPSElementProps {
    element: TSurveyNPSElement;
    value?: number;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function NPSElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<NPSElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=nps-element.d.ts.map