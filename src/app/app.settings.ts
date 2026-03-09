import { InjectionToken } from '@angular/core';

type Url = `http://${string}` | `https://${string}`;

export interface AppSettings {
  title: string;
  version: string;
  apiUrl: Url;
}

export const appSettings: AppSettings = {
  title: 'My e-shop',
  version: '1.0',
  apiUrl: 'https://fakestoreapi.com',
};

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
