import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse, BaseService } from '../../base-component/services/base.service';

export interface LoginRequest {
  email?: string,
  password?: string
};

@Injectable({
  providedIn: 'root'
})

export class LoginService extends BaseService
{
  private readonly _httpClient = inject(HttpClient);

  public login(data: LoginRequest): Observable<BaseResponse> 
  {
    const enpointUrl = this.getAppRootUrl() + "api/auth/login";
    return this._httpClient.post<BaseResponse>(enpointUrl, data);
  } 
}
