import { TJsFileUploadParams } from '@formbricks/types/js';
import { TResponseData, TResponseDataValue, TResponseTtc } from '@formbricks/types/responses';
import { TUploadFileConfig } from '@formbricks/types/storage';
import { TSurveyElement } from '@formbricks/types/surveys/elements';
import { TSurveyLanguage } from '@formbricks/types/surveys/types';
interface ElementConditionalProps {
    element: TSurveyElement;
    value: TResponseDataValue;
    onChange: (responseData: TResponseData) => void;
    onFileUpload: (file: TJsFileUploadParams["file"], config?: TUploadFileConfig) => Promise<string>;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    surveyId: string;
    autoFocusEnabled: boolean;
    currentElementId: string;
    onOpenExternalURL?: (url: string) => void | Promise<void>;
    dir?: "ltr" | "rtl" | "auto";
    formRef?: (ref: HTMLFormElement | null) => void;
    onTtcCollect?: (elementId: string, ttc: number) => void;
    errorMessage?: string;
    surveyLanguages: TSurveyLanguage[];
}
export declare function ElementConditional({ element, value, onChange, languageCode, ttc, setTtc, surveyId, onFileUpload, autoFocusEnabled, currentElementId, onOpenExternalURL, dir, formRef, onTtcCollect, surveyLanguages, errorMessage, }: Readonly<ElementConditionalProps>): import("preact").JSX.Element | null;
export {};
//# sourceMappingURL=element-conditional.d.ts.map