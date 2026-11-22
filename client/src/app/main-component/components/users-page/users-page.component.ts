import { Component } from '@angular/core';

interface UserItem {
  id: number;
  name: string;
  email?: string;
  role?: string;
}

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {
  isAddingUser = false;
  readonly roles = ['Администратор', 'Пользователь'];

  readonly users: UserItem[] = [
    { id: 1, name: 'Пользователь 1' },
    { id: 2, name: 'Пользователь 2' },
    { id: 3, name: 'Пользователь 3' },
    { id: 4, name: 'Пользователь 4' },
    { id: 5, name: 'Пользователь 5' },
    { id: 6, name: 'Пользователь 6' },
    { id: 7, name: 'Пользователь 7' },
    { id: 8, name: 'Пользователь 8' }
  ];

  openUserForm(): void {
    this.isAddingUser = true;
  }

  cancelUserForm(): void {
    this.isAddingUser = false;
  }

  saveUser(event: SubmitEvent, name: string, email: string, role: string): void {
    event.preventDefault();
    this.users.push({ id: this.users.length + 1, name, email, role });
    this.isAddingUser = false;
  }
}
