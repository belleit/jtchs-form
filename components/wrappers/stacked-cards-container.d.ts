import { JSX } from '../../../preact/compat';
import { TPlacement } from '@formbricks/types/common';
import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TProjectStyling } from '@formbricks/types/project';
import { TCardArrangementOptions } from '@formbricks/types/styling';
import { TSurveyStyling } from '@formbricks/types/surveys/types';
interface StackedCardsContainerProps {
    cardArrangement: TCardArrangementOptions;
    currentBlockId: string;
    survey: TJsEnvironmentStateSurvey;
    getCardContent: (blockIdx: number, offset: number) => JSX.Element | undefined;
    styling: TProjectStyling | TSurveyStyling;
    setBlockId: (blockId: string) => void;
    shouldResetBlockId?: boolean;
    fullSizeCards: boolean;
    placement?: TPlacement;
}
export declare function StackedCardsContainer({ cardArrangement, currentBlockId, survey, getCardContent, styling, setBlockId, shouldResetBlockId, fullSizeCards, placement, }: Readonly<StackedCardsContainerProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=stacked-cards-container.d.ts.map