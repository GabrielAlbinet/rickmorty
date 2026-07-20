export interface ApiResponse<T> {
  info: InfoResponse;
  results: T;
}

export interface InfoResponse {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
