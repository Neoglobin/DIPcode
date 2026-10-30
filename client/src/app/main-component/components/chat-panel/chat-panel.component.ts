import { Component, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  private lastExpandedWidth: number | null = null;
  private resizing = false;
  collapsed = false;

  @HostBinding('style.width') hostWidth = 'calc(100% + 10px)';
  @HostBinding('class.is-collapsed') get isCollapsed(): boolean {
    return this.collapsed;
  }
  @HostBinding('class.is-resizing') get isResizing(): boolean {
    return this.resizing;
  }

  toggleCollapsed(): void {
    if (this.collapsed) {
      this.collapsed = false;
      this.hostWidth = this.lastExpandedWidth === null
        ? 'calc(100% + 10px)'
        : `${this.lastExpandedWidth}px`;
      return;
    }

    this.lastExpandedWidth = this.host.nativeElement.getBoundingClientRect().width;
    this.collapsed = true;
    this.hostWidth = '0px';
  }

  startResizing(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.host.nativeElement.getBoundingClientRect().width;
    this.resizing = true;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  @HostListener('document:pointermove', ['$event'])
  resize(event: PointerEvent): void {
    if (!this.resizing) {
      return;
    }

    const hostRect = this.host.nativeElement.getBoundingClientRect();
    const centralPanel = this.host.nativeElement.parentElement?.querySelector('app-central-panel');
    const centralRight = centralPanel?.getBoundingClientRect().right ?? hostRect.left;
    const maxWidth = Math.max(0, hostRect.right - centralRight - 20);
    const minWidth = Math.min(260, maxWidth);
    const nextWidth = Math.min(
      maxWidth,
      Math.max(minWidth, this.resizeStartWidth + this.resizeStartX - event.clientX)
    );

    this.hostWidth = `${nextWidth}px`;
    this.lastExpandedWidth = nextWidth;
  }

  @HostListener('document:pointerup')
  @HostListener('document:pointercancel')
  stopResizing(): void {
    this.resizing = false;
  }
}
