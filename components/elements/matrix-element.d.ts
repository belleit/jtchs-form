import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyMatrixElement } from '@formbricks/types/surveys/elements';
interface MatrixElementProps {
    element: TSurveyMatrixElement;
    value: Record<string, string>;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    currentElementId: string;
    errorMessage?: string;
    dir?: "ltr" | "rtl" | "auto";
}
export declare function MatrixElement({ element, value, onChange, languageCode, ttc, setTtc, currentElementId, errorMessage, dir, }: Readonly<MatrixElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=matrix-element.d.ts.map