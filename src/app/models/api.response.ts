export interface ApiResponse<T> {
  ok: boolean;
  messages: any[] | null;
  data: T;
}
