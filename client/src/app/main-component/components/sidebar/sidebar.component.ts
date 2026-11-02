import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { ContentPage } from '../../content-page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() selectedPage: ContentPage = 'applications';
  @Output() pageSelected = new EventEmitter<ContentPage>();
}
