import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyRatingElement } from '@formbricks/types/surveys/elements';
interface RatingElementProps {
    element: TSurveyRatingElement;
    value?: number;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    currentElementId: string;
    dir?: "ltr" | "rtl" | "auto";
    errorMessage?: string;
}
export declare function RatingElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, dir, errorMessage, }: RatingElementProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=rating-element.d.ts.map