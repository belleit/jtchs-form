import { ButtonHTMLAttributes } from 'preact/compat';
interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonLabel?: string;
    isLastQuestion: boolean;
    focus?: boolean;
}
export declare function SubmitButton({ buttonLabel, isLastQuestion, tabIndex, focus, onClick, disabled, type, ...props }: SubmitButtonProps): import("preact/compat").JSX.Element;
export {};
//# sourceMappingURL=submit-button.d.ts.map