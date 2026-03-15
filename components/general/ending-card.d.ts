import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TResponseData, TResponseVariables } from '@formbricks/types/responses';
import { TSurveyEndScreenCard, TSurveyRedirectUrlCard } from '@formbricks/types/surveys/types';
interface EndingCardProps {
    survey: TJsEnvironmentStateSurvey;
    endingCard: TSurveyEndScreenCard | TSurveyRedirectUrlCard;
    isRedirectDisabled: boolean;
    isResponseSendingFinished: boolean;
    autoFocusEnabled: boolean;
    isCurrent: boolean;
    languageCode: string;
    responseData: TResponseData;
    variablesData: TResponseVariables;
    onOpenExternalURL?: (url: string) => void | Promise<void>;
    isPreviewMode: boolean;
    fullSizeCards: boolean;
}
export declare function EndingCard({ survey, endingCard, isRedirectDisabled, isResponseSendingFinished, autoFocusEnabled, isCurrent, languageCode, responseData, variablesData, onOpenExternalURL, isPreviewMode, fullSizeCards, }: EndingCardProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=ending-card.d.ts.map