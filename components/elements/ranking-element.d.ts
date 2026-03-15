import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyRankingElement } from '@formbricks/types/surveys/elements';
interface RankingElementProps {
    element: TSurveyRankingElement;
    value: string[];
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    errorMessage?: string;
    dir?: "ltr" | "rtl" | "auto";
}
export declare function RankingElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, errorMessage, dir, }: Readonly<RankingElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=ranking-element.d.ts.map