import { Injectable } from '@angular/core';

export interface BaseResponse {
  isSuccess?: boolean,
  errorMessage?: string,
  status?: number,
  result?: any
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private readonly _appRootUrl: string = "https://localhost:7070/";

  public getAppRootUrl(): string 
  {
    return this._appRootUrl;
  }

}
