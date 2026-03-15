import { TDisplayCreateInput } from '@formbricks/types/displays';
import { Result } from '@formbricks/types/error-handlers';
import { ApiErrorResponse } from '@formbricks/types/errors';
import { TSurveyQuotaAction } from '@formbricks/types/quota';
import { TResponseInput, TResponseUpdateInput } from '@formbricks/types/responses';
import { TUploadFileConfig } from '@formbricks/types/storage';
type TResponseCreateResponseQuotaFull = {
    quotaFull: true;
    quota: {
        id: string;
        action: TSurveyQuotaAction;
        endingCardId?: string;
    };
};
type TResponseCreateResponseWithoutQuota = {
    quotaFull: false;
};
type TResponseQuota = TResponseCreateResponseQuotaFull | TResponseCreateResponseWithoutQuota;
type TResponseCreateResponse = {
    id: string;
} & TResponseQuota;
type TResponseUpdateResponse = Record<string, unknown> & TResponseQuota;
export declare class ApiClient {
    readonly appUrl: string;
    readonly environmentId: string;
    constructor({ appUrl, environmentId }: {
        appUrl: string;
        environmentId: string;
    });
    createDisplay(displayInput: Omit<TDisplayCreateInput, "environmentId"> & {
        contactId?: string;
    }): Promise<Result<{
        id: string;
    }, ApiErrorResponse>>;
    createResponse(responseInput: Omit<TResponseInput, "environmentId"> & {
        contactId: string | null;
        recaptchaToken?: string;
    }): Promise<Result<TResponseCreateResponse, ApiErrorResponse>>;
    updateResponse({ responseId, finished, endingId, data, ttc, variables, language, }: TResponseUpdateInput & {
        responseId: string;
    }): Promise<Result<TResponseUpdateResponse, ApiErrorResponse>>;
    uploadFile(file: {
        type: string;
        name: string;
        base64: string;
    }, { allowedFileExtensions, surveyId }?: TUploadFileConfig | undefined): Promise<string>;
}
export {};
//# sourceMappingURL=api-client.d.ts.map