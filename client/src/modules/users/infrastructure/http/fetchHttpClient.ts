import type { HttpClient } from "./httpClient";

export class FetchHttpClient implements HttpClient{
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(this.baseUrl + url);
    return res.json();
  }

  async post<B>(url: string, body: B): Promise<void> {
    const res = await fetch(this.baseUrl + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  async put<B>(url: string, body: B): Promise<void> {
    await fetch(this.baseUrl + url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async delete(url: string): Promise<void> {
    await fetch(this.baseUrl + url, { method: 'DELETE' });
  }
}
