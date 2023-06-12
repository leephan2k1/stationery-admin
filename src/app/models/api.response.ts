export interface BaseResponse {
  ok: boolean;
  messages: any[] | null;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

export interface ApiResponseList<T> extends BaseResponse{
  data: T[];
}
