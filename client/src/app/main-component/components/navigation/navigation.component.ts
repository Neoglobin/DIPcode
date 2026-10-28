import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() sidebarCollapsed = false;
  @Output() menuToggle = new EventEmitter<void>();
}
