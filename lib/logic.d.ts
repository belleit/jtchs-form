import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TResponseData, TResponseVariables } from '@formbricks/types/responses';
import { TSurveyBlockLogicAction } from '@formbricks/types/surveys/blocks';
import { TConditionGroup, TSingleCondition } from '@formbricks/types/surveys/logic';
type TCondition = TSingleCondition | TConditionGroup;
export declare const isConditionGroup: (condition: TCondition) => condition is TConditionGroup;
export declare const evaluateLogic: (localSurvey: TJsEnvironmentStateSurvey, data: TResponseData, variablesData: TResponseVariables, conditions: TConditionGroup, selectedLanguage: string) => boolean;
export declare const performActions: (survey: TJsEnvironmentStateSurvey, actions: TSurveyBlockLogicAction[], data: TResponseData, calculationResults: TResponseVariables) => {
    jumpTarget: string | undefined;
    requiredQuestionIds: string[];
    calculations: TResponseVariables;
};
export {};
//# sourceMappingURL=logic.d.ts.map