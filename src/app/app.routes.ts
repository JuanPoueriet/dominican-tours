import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'es',
    pathMatch: 'full'
  },
  {
    path: ':lang',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'excursions',
        loadChildren: () => import('./features/excursions/excursions.routes').then(m => m.EXCURSION_ROUTES)
      },
      {
        path: 'booking',
        loadChildren: () => import('./features/booking/booking.routes').then(m => m.BOOKING_ROUTES)
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes').then(m => m.ABOUT_ROUTES)
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.routes').then(m => m.CONTACT_ROUTES)
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes').then(m => m.BLOG_ROUTES)
      },
      {
        path: 'legal',
        loadComponent: () => import('./features/legal/legal.component').then(m => m.LegalComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'es'
  }
];
