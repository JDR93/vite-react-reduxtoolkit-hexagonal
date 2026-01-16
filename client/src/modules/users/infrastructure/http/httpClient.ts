export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<B>(url: string, body: B): Promise<void>;
  put<B>(url: string, body: B): Promise<void>;
  delete(url: string): Promise<void>;
}
