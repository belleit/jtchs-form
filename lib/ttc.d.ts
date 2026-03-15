import { TResponseTtc } from '@formbricks/types/responses';
export declare const getUpdatedTtc: (ttc: TResponseTtc, questionId: string, time: number) => {
    [x: string]: number;
};
export declare const useTtc: (questionId: string, ttc: TResponseTtc, setTtc: (ttc: TResponseTtc) => void, startTime: number, setStartTime: (time: number) => void, isCurrentQuestion: boolean) => void;
//# sourceMappingURL=ttc.d.ts.map