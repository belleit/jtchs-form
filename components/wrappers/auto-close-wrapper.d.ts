import { default as React } from 'preact/compat';
import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
interface AutoCloseProps {
    survey: TJsEnvironmentStateSurvey;
    questionIdx: number;
    onClose?: () => void;
    children: React.ReactNode;
    hasInteracted: boolean;
    setHasInteracted: (hasInteracted: boolean) => void;
}
export declare function AutoCloseWrapper({ survey, onClose, children, questionIdx, hasInteracted, setHasInteracted, }: AutoCloseProps): React.JSX.Element;
export {};
//# sourceMappingURL=auto-close-wrapper.d.ts.map