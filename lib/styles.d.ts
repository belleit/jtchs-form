import { TProjectStyling } from '@formbricks/types/project';
import { TSurveyStyling } from '@formbricks/types/surveys/types';
/**
 * Set the CSP nonce to be applied to all style elements
 * @param nonce - The CSP nonce value (without 'nonce-' prefix)
 */
export declare const setStyleNonce: (nonce: string | undefined) => void;
export declare const getStyleNonce: () => string | undefined;
export declare const addStylesToDom: () => void;
export declare const addCustomThemeToDom: ({ styling }: {
    styling: TProjectStyling | TSurveyStyling;
}) => void;
//# sourceMappingURL=styles.d.ts.map