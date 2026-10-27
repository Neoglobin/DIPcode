import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-main-component',
  imports: [NavigationComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css'
})
export class MainComponent {}
