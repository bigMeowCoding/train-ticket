export interface HttpReturn<T = any> {
  code: HttpStatus;
  data: T;
}

export enum HttpStatus {
  ok = 0,
  BusinessError = 412,
}
