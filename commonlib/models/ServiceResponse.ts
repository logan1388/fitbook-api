// Copyright FitBook

export default class ServiceResponse {
  public static readonly TYPE_GUARD: string = 'ServiceResponse';
  public readonly typeGuard: string = ServiceResponse.TYPE_GUARD;

  public responseCode: number = 0;
  public responseMessage: string = '';
}

export function isServiceResponse<T>(x: ServiceResponse | T): x is ServiceResponse {
  return x !== undefined && x !== null && (x as ServiceResponse).typeGuard === ServiceResponse.TYPE_GUARD;
}
