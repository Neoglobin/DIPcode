import { inject, Injectable } from '@angular/core';
import { BaseResponse, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckUserRoleRequest {
  roleId: string
}

@Injectable({
  providedIn: 'root'
})
export class RoleModelService
{
  private readonly _baseService = inject(BaseService);
  private readonly _httpClient = inject(HttpClient);

  public checkUserRoleEntry(role: string): Observable<BaseResponse> 
  {
    const request: CheckUserRoleRequest = {
      roleId: role
    };

    const url = this._baseService.getAppRootUrl() + "api/rights/checkRoleEntry";
    return this._httpClient.post<BaseResponse>(url, request, {withCredentials: true});
  }

}
