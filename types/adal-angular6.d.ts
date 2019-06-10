export class Adal6HTTPService {
  static factory(http: any, service: any): any;
  constructor(http: any, service: any);
  http: any;
  service: any;
  get(url: any, options: any): any;
  handleError(error: any): any;
  head(url: any, options: any): any;
  patch(url: any, body: any, options: any): any;
  post(url: any, body: any, options: any): any;
  put(url: any, body: any, options: any): any;
  sendRequest(method: any, url: any, options: any): any;
}
export class Adal6Interceptor {
  constructor(Adal6Service: any);
  Adal6Service: any;
  intercept(request: any, next: any): any;
}
export class Adal6Service {
  Adal6User: any;
  GetResourceForEndpoint(url: any): any;
  acquireToken(resource: any): any;
  clearCache(): void;
  clearCacheForResource(resource: any): void;
  getCachedToken(resource: any): any;
  getUser(): any;
  handleWindowCallback(): void;
  info(message: any): void;
  init(configOptions: any): void;
  logOut(): void;
  login(): void;
  loginInProgress(): any;
  refreshDataFromCache(): void;
  updateDataFromCache(resource: any): void;
  verbose(message: any): void;
}
export function Adal6User(): void;
