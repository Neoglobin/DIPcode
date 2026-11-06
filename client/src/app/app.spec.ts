import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the main page at the root', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('main.frame')).toBeTruthy();
  });

  it('should render the login page independently', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/login');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-main-component')).toBeNull();
    expect(compiled.querySelector('input[name="login"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="password"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')?.textContent).toContain('Войти');
  });
});
