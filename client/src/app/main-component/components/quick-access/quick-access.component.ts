import { Component, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrl: './quick-access.component.css'
})
export class QuickAccessComponent {
  private readonly element = inject(ElementRef<HTMLElement>);
  @Output() settingsSelected = new EventEmitter<void>();
  profileMenuOpen = false;

  openSettings(): void {
    this.profileMenuOpen = false;
    this.settingsSelected.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) {
      this.profileMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.profileMenuOpen = false;
  }
}
