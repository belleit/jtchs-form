import { TOverlay, TPlacement } from '@formbricks/types/common';
interface SurveyContainerProps {
    mode: "modal" | "inline";
    placement?: TPlacement;
    overlay?: TOverlay;
    children: React.ReactNode;
    onClose?: () => void;
    clickOutside?: boolean;
    isOpen?: boolean;
    dir?: "ltr" | "rtl" | "auto";
}
export declare function SurveyContainer({ mode, placement, overlay, children, onClose, clickOutside, isOpen, dir, }: Readonly<SurveyContainerProps>): import("preact").JSX.Element | null;
export {};
//# sourceMappingURL=survey-container.d.ts.map