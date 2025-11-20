import { Routes } from '@angular/router';

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./booking-wizard/booking-wizard.component').then(m => m.BookingWizardComponent)
  }
];