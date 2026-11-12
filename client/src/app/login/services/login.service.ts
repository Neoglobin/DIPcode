import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../base-component/services/app.service';

export interface LoginRequest {
  email?: string,
  password?: string
};

export interface LoginResponse {
  success: boolean
};

@Injectable({
  providedIn: 'root'
})

export class LoginService 
{
  private readonly _httpClient = inject(HttpClient);
  private readonly _appService = inject(AppService);

  public login(data: LoginRequest): Observable<LoginResponse> 
  {
    const enpointUrl = this._appService.getAppRootUrl() + "api/auth/login";
    return this._httpClient.post<LoginResponse>(enpointUrl, data);
  } 

}
