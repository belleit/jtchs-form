import { TJsFileUploadParams } from '@formbricks/types/js';
import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TUploadFileConfig } from '@formbricks/types/storage';
import { TSurveyBlock } from '@formbricks/types/surveys/blocks';
import { TSurveyLanguage } from '@formbricks/types/surveys/types';
interface BlockConditionalProps {
    block: TSurveyBlock;
    value: TResponseData;
    onChange: (responseData: TResponseData) => void;
    onSubmit: (data: TResponseData, ttc: TResponseTtc) => void;
    onBack: () => void;
    onFileUpload: (file: TJsFileUploadParams["file"], config?: TUploadFileConfig) => Promise<string>;
    isFirstBlock: boolean;
    isLastBlock: boolean;
    languageCode: string;
    prefilledResponseData?: TResponseData;
    skipPrefilled?: boolean;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    surveyId: string;
    autoFocusEnabled: boolean;
    isBackButtonHidden: boolean;
    onOpenExternalURL?: (url: string) => void | Promise<void>;
    dir?: "ltr" | "rtl" | "auto";
    fullSizeCards: boolean;
    surveyLanguages: TSurveyLanguage[];
}
export declare function BlockConditional({ block, value, onChange, onSubmit, onBack, isFirstBlock, isLastBlock, languageCode, prefilledResponseData, skipPrefilled, ttc, setTtc, surveyId, onFileUpload, autoFocusEnabled, isBackButtonHidden, onOpenExternalURL, dir, fullSizeCards, surveyLanguages, }: Readonly<BlockConditionalProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=block-conditional.d.ts.map