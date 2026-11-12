import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly _appRootUrl: string = "https://localhost:7070/";

  public getAppRootUrl(): string 
  {
    return this._appRootUrl;
  }

}
