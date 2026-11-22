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

    (compiled.querySelector('[aria-label="Профиль"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    (compiled.querySelector('#profile-menu button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(compiled.querySelector('.page-title')?.textContent?.trim()).toBe('Настройки');
    expect(compiled.querySelectorAll('.settings-card').length).toBe(2);

    (compiled.querySelector('button.settings-card') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(compiled.querySelector('app-users-page')).toBeTruthy();
    expect(compiled.querySelectorAll('.user-card').length).toBe(8);
    expect(compiled.querySelectorAll('.panel-actions button').length).toBe(2);

    (compiled.querySelector('.panel-actions .action-button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')?.getAttribute('type')).toBe('email');
    expect(compiled.querySelector('input[name="password"]')?.getAttribute('type')).toBe('password');
    expect(Array.from(compiled.querySelectorAll('select[name="role"] option')).map(option => option.textContent?.trim()))
      .toEqual(['Администратор', 'Пользователь']);

    (compiled.querySelector('input[name="name"]') as HTMLInputElement).value = 'Новый пользователь';
    (compiled.querySelector('input[name="email"]') as HTMLInputElement).value = 'user@example.com';
    (compiled.querySelector('.user-form form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.user-card').length).toBe(9);
    expect(compiled.querySelector('.user-card:last-child .user-name')?.textContent?.trim())
      .toBe('Новый пользователь');
  });
});
