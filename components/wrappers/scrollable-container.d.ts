import { JSX, Ref } from 'preact';
interface ScrollableContainerProps {
    children: JSX.Element;
    fullSizeCards: boolean;
}
export interface ScrollableContainerHandle {
    scrollToBottom: () => void;
}
export declare const ScrollableContainer: import('preact').FunctionalComponent<import('preact/compat').PropsWithoutRef<ScrollableContainerProps> & {
    ref?: Ref<ScrollableContainerHandle> | undefined;
}>;
export {};
//# sourceMappingURL=scrollable-container.d.ts.map