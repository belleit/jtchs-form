import { Result } from '@formbricks/types/error-handlers';
import { ApiErrorResponse } from '@formbricks/types/errors';
import { TQuotaFullResponse } from '@formbricks/types/quota';
import { TResponseUpdate } from '@formbricks/types/responses';
import { TResponseErrorCodesEnum } from '../types/response-error-codes';
import { ApiClient } from './api-client';
import { SurveyState } from './survey-state';
interface QueueConfig {
    appUrl: string;
    environmentId: string;
    retryAttempts: number;
    onResponseSendingFailed?: (responseUpdate: TResponseUpdate, errorCode?: TResponseErrorCodesEnum) => void;
    onResponseSendingFinished?: () => void;
    onQuotaFull?: (quotaInfo: TQuotaFullResponse) => void;
    setSurveyState?: (state: SurveyState) => void;
}
export declare const delay: (ms: number) => Promise<void>;
export declare class ResponseQueue {
    readonly queue: TResponseUpdate[];
    readonly config: QueueConfig;
    private surveyState;
    private isRequestInProgress;
    readonly api: ApiClient;
    private responseRecaptchaToken?;
    constructor(config: QueueConfig, surveyState: SurveyState);
    setResponseRecaptchaToken(token?: string): void;
    add(responseUpdate: TResponseUpdate): void;
    processQueue(): Promise<{
        success: boolean;
    }>;
    private sendResponseWithRetry;
    private isQuotaFullResponse;
    private isRecaptchaError;
    private handleSuccessfulResponse;
    private handleFailedResponse;
    sendResponse(responseUpdate: TResponseUpdate): Promise<Result<boolean | TQuotaFullResponse, ApiErrorResponse>>;
    updateSurveyState(surveyState: SurveyState): void;
    getUnsentData(): TResponseUpdate["data"];
}
export {};
//# sourceMappingURL=response-queue.d.ts.map