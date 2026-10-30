import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Output, inject } from '@angular/core';

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
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() widthChange = new EventEmitter<number>();
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
      this.collapsedChange.emit(false);
      if (this.lastExpandedWidth !== null) {
        this.widthChange.emit(this.lastExpandedWidth - 10);
      }
      this.hostWidth = this.lastExpandedWidth === null
        ? 'calc(100% + 10px)'
        : `${this.lastExpandedWidth}px`;
      return;
    }

    const expandedWidth = this.host.nativeElement.getBoundingClientRect().width;
    this.lastExpandedWidth = expandedWidth;
    this.widthChange.emit(expandedWidth - 10);
    this.collapsed = true;
    this.collapsedChange.emit(true);
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
    const nextWidth = Math.min(
      maxWidth,
      Math.max(0, this.resizeStartWidth + this.resizeStartX - event.clientX)
    );

    if (nextWidth < 180) {
      this.lastExpandedWidth = this.resizeStartWidth;
      this.widthChange.emit(this.resizeStartWidth - 10);
      this.collapsed = true;
      this.collapsedChange.emit(true);
      this.resizing = false;
      this.hostWidth = '0px';
      return;
    }

    this.hostWidth = `${nextWidth}px`;
    this.lastExpandedWidth = nextWidth;
    this.widthChange.emit(nextWidth - 10);
  }

  @HostListener('document:pointerup')
  @HostListener('document:pointercancel')
  stopResizing(): void {
    this.resizing = false;
  }
}
