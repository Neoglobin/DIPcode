import { Component } from '@angular/core';
import { ChatSelectorComponent } from './components/chat-selector/chat-selector.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-main-component',
  imports: [ChatSelectorComponent, NavigationComponent, SearchComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {}
