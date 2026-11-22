import { Component } from '@angular/core';
import { ChatSelectorComponent } from './components/chat-selector/chat-selector.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { ApplicationsPageComponent } from './components/applications-page/applications-page.component';
import { CentralPanelComponent } from './components/central-panel/central-panel.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import type { ContentPage } from './content-page';
import { NavigationComponent } from './components/navigation/navigation.component';
import { QuickAccessComponent } from './components/quick-access/quick-access.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-component',
  imports: [ApplicationsPageComponent, ChatSelectorComponent, ChatPanelComponent, CentralPanelComponent, NavigationComponent, ProjectsPageComponent, QuickAccessComponent, SearchComponent, SettingsPageComponent, SidebarComponent, UsersPageComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {
  sidebarCollapsed = false;
  chatCollapsed = false;
  chatResizing = false;
  chatTrackSize: number | null = null;
  selectedPage: ContentPage = 'applications';
  private pageHistory: ContentPage[] = ['applications'];
  private historyIndex = 0;

  get canGoBack(): boolean {
    return this.historyIndex > 0;
  }

  get canGoForward(): boolean {
    return this.historyIndex < this.pageHistory.length - 1;
  }

  selectPage(page: ContentPage): void {
    if (page === this.selectedPage) {
      return;
    }

    this.pageHistory = this.pageHistory.slice(0, this.historyIndex + 1);
    this.pageHistory.push(page);
    this.historyIndex++;
    this.selectedPage = page;
  }

  goBack(): void {
    if (!this.canGoBack) {
      return;
    }

    this.historyIndex--;
    this.selectedPage = this.pageHistory[this.historyIndex];
  }

  goForward(): void {
    if (!this.canGoForward) {
      return;
    }

    this.historyIndex++;
    this.selectedPage = this.pageHistory[this.historyIndex];
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
