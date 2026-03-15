import { TResponseErrorCodesEnum } from '../../types/response-error-codes';
interface ErrorComponentProps {
    readonly errorType: TResponseErrorCodesEnum.RecaptchaError | TResponseErrorCodesEnum.InvalidDeviceError;
}
export declare function ErrorComponent({ errorType }: ErrorComponentProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=error-component.d.ts.map