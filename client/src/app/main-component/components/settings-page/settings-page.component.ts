import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  template: `
    <h1 class="page-title">Настройки</h1>
    <div class="settings-grid">
      <article class="settings-card">
        <div class="settings-icon">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path d="m20 4 13 7.5v17L20 36 7 28.5v-17L20 4Z" />
            <path d="m7.5 11.5 12.5 7 12.5-7M20 19v16" />
            <path d="m13.5 8 13 7.5" />
          </svg>
        </div>
        <span class="settings-name">Настройки профиля</span>
      </article>
      <article class="settings-card">
        <div class="settings-icon">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path d="m20 4 13 7.5v17L20 36 7 28.5v-17L20 4Z" />
            <path d="m7.5 11.5 12.5 7 12.5-7M20 19v16" />
            <path d="m13.5 8 13 7.5" />
          </svg>
        </div>
        <span class="settings-name">Управление пользователями</span>
      </article>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-width: 0;
    }

    .page-title {
      margin: 6px 0 20px;
      color: #111;
      font: 700 14px Arial, sans-serif;
      text-align: center;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(2, 94px);
      column-gap: 20px;
      row-gap: 40px;
    }

    .settings-card {
      min-width: 0;
      text-align: center;
    }

    .settings-icon {
      display: grid;
      width: 94px;
      max-width: 100%;
      aspect-ratio: 1;
      margin: 0 auto 8px;
      place-items: center;
      border-radius: 20px;
      background: #e9edef;
    }

    .settings-icon:hover svg {
      transform: scale(1.1);
    }

    .settings-icon svg {
      width: 34px;
      transition: transform 160ms ease;
      height: 34px;
      fill: none;
      stroke: #17191a;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2.8;
    }

    .settings-name {
      display: block;
      color: #111;
      font: 700 12px Arial, sans-serif;
      line-height: 14px;
      overflow-wrap: anywhere;
    }
  `]
})
export class SettingsPageComponent {}
