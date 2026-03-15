import { ApiErrorResponse } from '@formbricks/types/errors';
export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
export interface ApiSuccessResponse<T = Record<string, unknown>> {
    data: T;
}
//# sourceMappingURL=api.d.ts.map