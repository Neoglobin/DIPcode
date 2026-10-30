import { Component } from '@angular/core';
import { ChatSelectorComponent } from './components/chat-selector/chat-selector.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { CentralPanelComponent, type ContentPage } from './components/central-panel/central-panel.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { QuickAccessComponent } from './components/quick-access/quick-access.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-component',
  imports: [ChatSelectorComponent, ChatPanelComponent, CentralPanelComponent, NavigationComponent, QuickAccessComponent, SearchComponent, SidebarComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {
  sidebarCollapsed = false;
  chatCollapsed = false;
  chatResizing = false;
  chatTrackSize: number | null = null;
  selectedPage: ContentPage = 'applications';

  selectPage(page: ContentPage): void {
    this.selectedPage = page;
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
