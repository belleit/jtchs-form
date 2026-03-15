import { TI18nString } from '@formbricks/types/i18n';
import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TResponseData, TResponseTtc, TResponseVariables } from '@formbricks/types/responses';
interface WelcomeCardProps {
    headline?: TI18nString;
    subheader?: TI18nString;
    fileUrl?: string;
    buttonLabel?: TI18nString;
    onSubmit: (data: TResponseData, ttc: TResponseTtc) => void;
    survey: TJsEnvironmentStateSurvey;
    languageCode: string;
    responseCount?: number;
    autoFocusEnabled: boolean;
    isCurrent: boolean;
    responseData: TResponseData;
    variablesData: TResponseVariables;
    fullSizeCards: boolean;
    isPreviewMode?: boolean;
}
export declare function WelcomeCard({ headline, subheader, fileUrl, buttonLabel, onSubmit, languageCode, survey, responseCount, autoFocusEnabled, isCurrent, responseData, variablesData, fullSizeCards, isPreviewMode, }: WelcomeCardProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=welcome-card.d.ts.map