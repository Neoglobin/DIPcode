import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { LoginRequest, LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})

export class LoginComponent 
{
  private readonly _loginService = inject(LoginService);
  private readonly _router = inject(Router);

  public email: string = "";
  public password: string = "";

  public onSubmit() 
  {
    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this._loginService.login(request).subscribe({
      next: (response) => 
      {
        if (response && response.success) 
        {
          console.log("User authorized successfuly");
          this._router.navigate(["/"]);
        }
      },
      error: (error) => 
      {
        alert("Authorization failed: " + error.error);
        console.log("Authorization failed: " + error.error);
      }
    });
  }
}
