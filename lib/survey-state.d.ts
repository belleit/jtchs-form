import { TResponseUpdate } from '@formbricks/types/responses';
export declare class SurveyState {
    responseId: string | null;
    displayId: string | null;
    userId: string | null;
    contactId: string | null;
    surveyId: string;
    responseAcc: TResponseUpdate;
    singleUseId: string | null;
    constructor(surveyId: string, singleUseId?: string | null, responseId?: string | null, userId?: string | null, contactId?: string | null);
    /**
     * Set the current survey ID
     * @param id - The survey ID
     */
    setSurveyId(id: string): void;
    /**
     * Get a copy of the current state
     */
    copy(): SurveyState;
    /**
     * Update the response ID after a successful response creation
     * @param id - The response ID
     */
    updateResponseId(id: string): void;
    /**
     * Update the display ID after a successful display creation
     * @param id - The display ID
     */
    updateDisplayId(id: string): void;
    /**
     * Update the user ID
     * @param id - The user ID
     */
    updateUserId(id: string): void;
    /**
     * Update the contact ID
     * @param id - The contact ID
     */
    updateContactId(id: string): void;
    /**
     * Accumulate the responses
     * @param responseUpdate - The new response data to add
     */
    accumulateResponse(responseUpdate: TResponseUpdate): void;
    /**
     * Check if the current accumulated response is finished
     */
    isResponseFinished(): boolean;
    /**
     * Clear the current state
     */
    clear(): void;
}
//# sourceMappingURL=survey-state.d.ts.map