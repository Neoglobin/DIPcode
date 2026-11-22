import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() sidebarCollapsed = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Input() canGoBack = false;
  @Input() canGoForward = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
