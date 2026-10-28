import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main-component';

describe('MainComponent', () => {
  it('shows mock applications and keeps actions on the projects page', async () => {
    await TestBed.configureTestingModule({ imports: [MainComponent] }).compileComponents();
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.application-card').length).toBe(14);

    const pageButtons = compiled.querySelectorAll('.sidebar .entry');
    (pageButtons[1] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(compiled.querySelector('.application-grid')).toBeNull();
    expect(compiled.querySelectorAll('.panel-actions button').length).toBe(2);

    (pageButtons[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.application-card').length).toBe(14);

    const menuButton = compiled.querySelector('.menu-button') as HTMLButtonElement;
    menuButton.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.sidebar')?.classList.contains('is-collapsed')).toBe(true);
    expect(compiled.querySelector('.workspace')?.classList.contains('sidebar-collapsed')).toBe(true);
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
    expect(compiled.querySelector('app-central-panel')).toBeTruthy();

    menuButton.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.sidebar')?.classList.contains('is-collapsed')).toBe(false);
    expect(compiled.querySelector('.workspace')?.classList.contains('sidebar-collapsed')).toBe(false);
  });
});
