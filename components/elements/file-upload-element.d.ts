import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyFileUploadElement } from '@formbricks/types/surveys/elements';
interface FileUploadElementProps {
    element: TSurveyFileUploadElement;
    value: string[];
    onChange: (responseData: TResponseData) => void;
    onFileUpload: (file: any, config?: any) => Promise<string>;
    surveyId: string;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    errorMessage?: string;
}
export declare function FileUploadElement({ element, value, onChange, onFileUpload, surveyId, languageCode, ttc, setTtc, currentElementId, errorMessage: centralizedErrorMessage, }: Readonly<FileUploadElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=file-upload-element.d.ts.map