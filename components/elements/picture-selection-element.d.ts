import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyPictureSelectionElement } from '@formbricks/types/surveys/elements';
interface PictureSelectionProps {
    element: TSurveyPictureSelectionElement;
    value: string[];
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function PictureSelectionElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: Readonly<PictureSelectionProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=picture-selection-element.d.ts.map