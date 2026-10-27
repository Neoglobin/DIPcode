import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-main-component',
  imports: [NavigationComponent, SearchComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {}
