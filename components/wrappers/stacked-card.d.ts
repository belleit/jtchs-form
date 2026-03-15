import { MutableRef } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import { default as React } from '../../../preact/compat';
import { TPlacement } from '@formbricks/types/common';
import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TCardArrangementOptions } from '@formbricks/types/styling';
interface StackedCardProps {
    cardRefs: MutableRef<(HTMLDivElement | null)[]>;
    dynamicQuestionIndex: number;
    offset: number;
    fullSizeCards: boolean;
    borderStyles: React.CSSProperties;
    getCardContent: (questionIdxTemp: number, offset: number) => JSX.Element | undefined;
    cardHeight: string;
    survey: TJsEnvironmentStateSurvey;
    cardWidth: number;
    hovered: boolean;
    cardArrangement: TCardArrangementOptions;
    placement: TPlacement;
}
export declare const StackedCard: ({ cardRefs, dynamicQuestionIndex, offset, fullSizeCards, borderStyles, getCardContent, cardHeight, survey, cardWidth, hovered, cardArrangement, placement, }: StackedCardProps) => JSX.Element;
export {};
//# sourceMappingURL=stacked-card.d.ts.map