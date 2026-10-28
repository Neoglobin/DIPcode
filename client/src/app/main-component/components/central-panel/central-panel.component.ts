import { Component, Input } from '@angular/core';

export type ContentPage = 'applications' | 'projects';

interface ApplicationItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-central-panel',
  templateUrl: './central-panel.component.html',
  styleUrl: './central-panel.component.css'
})
export class CentralPanelComponent {
  @Input() page: ContentPage = 'applications';

  readonly applications: ApplicationItem[] = [
    { id: 1, name: 'BPMSoft' },
    { id: 2, name: 'WSS Docs' },
    { id: 3, name: 'New application' },
    { id: 4, name: 'New application' },
    { id: 5, name: 'New application' },
    { id: 6, name: 'New application' },
    { id: 7, name: 'New application' },
    { id: 8, name: 'BPMSoft' },
    { id: 9, name: 'WSS Docs' },
    { id: 10, name: 'New application' },
    { id: 11, name: 'New application' },
    { id: 12, name: 'New application' },
    { id: 13, name: 'New application' },
    { id: 14, name: 'New application' }
  ];
}
