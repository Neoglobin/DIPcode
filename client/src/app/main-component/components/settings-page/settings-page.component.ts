import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RoleModelService } from '../../../base-component/services/role-model.service';
import { RolesConstants } from '../../../base-component/components/roles-constants/roles-constants.component';

interface ToolsItem {
  id: number,
  name: string,
  isAdminTool: boolean,
  visible: boolean
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit 
{
  private readonly _roleModelService = inject(RoleModelService);

  @Output() usersSelected = new EventEmitter<void>();

  public canSeeAdminTools: boolean = false;

  public tools: ToolsItem[] = [];

  ngOnInit(): void {
    this._roleModelService.checkUserRoleEntry(RolesConstants.admin).subscribe({
      next: (response) => 
      {
        if (response && response.isSuccess) 
          this.canSeeAdminTools = response?.result;
        
        if (!response.isSuccess) 
          console.log(response?.errorMessage);

        this.fillTools();
      },
      error: (error) => 
      {
        console.log(error.error);
      }
    });
  }

  private fillTools(): void 
  {
    this.tools = 
    [
      { 
        id: 1, 
        name: "Настройки профиля", 
        isAdminTool: false,
        visible: true 
      },
      { 
        id: 1, 
        name: "Управление пользователями", 
        isAdminTool: true,
         visible: this.canSeeAdminTools 
      },
    ];
  }
}
