import { TResponseData, TResponseTtc } from '@formbricks/types/responses';
import { TSurveyCTAElement } from '@formbricks/types/surveys/elements';
interface CTAElementProps {
    element: TSurveyCTAElement;
    value: string;
    onChange: (responseData: TResponseData) => void;
    languageCode: string;
    ttc: TResponseTtc;
    setTtc: (ttc: TResponseTtc) => void;
    autoFocusEnabled: boolean;
    currentElementId: string;
    onOpenExternalURL?: (url: string) => void | Promise<void>;
}
export declare function CTAElement({ element, onChange, languageCode, ttc, setTtc, currentElementId, onOpenExternalURL, }: Readonly<CTAElementProps>): import("preact").JSX.Element;
export {};
//# sourceMappingURL=cta-element.d.ts.map