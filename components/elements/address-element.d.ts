import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyAddressElement } from '@formbricks/types/surveys/elements';
interface AddressElementProps {
    element: TSurveyAddressElement;
    value?: string[];
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    currentElementId: string;
    autoFocusEnabled: boolean;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function AddressElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<AddressElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=address-element.d.ts.map