import { Component } from '@angular/core';

interface UserItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {
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
}
