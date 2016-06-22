import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent, index: true },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
