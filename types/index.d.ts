declare module 'api-commons' {
  interface SuccessResponse<T> {
    status: 'ok';
    data: T;
  }
  
  interface ErrorResponse {
    status: 'error';
    message: string;
    code: number;
  }
  
  interface Paginator<T> {
    all(): Promise<T[]>;
  }
  
  interface PaginateOptions {
    limit?: number;
  }
  
  /** Perform HTTPS GET request */
  export function get(url: string): Promise<string>;
  
  /** Perform HTTPS POST request with JSON body */
  export function post<T = unknown>(url: string, data: unknown): Promise<T>;
  
  /** Format a success response */
  export function success<T>(data: T): SuccessResponse<T>;
  
  /** Format an error response */
  export function error(message: string, code: number): ErrorResponse;
  
  /** Create a paginator for a REST endpoint */
  export function paginate<T>(url: string, options?: PaginateOptions): Paginator<T>;
}