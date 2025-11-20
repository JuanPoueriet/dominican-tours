import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'excursiones',
        loadComponent: () => import('./features/excursions/excursions-list/excursions-list.component').then(m => m.ExcursionsListComponent)
      },
      {
        path: 'excursiones/:slug',
        loadComponent: () => import('./features/excursions/pages/excursion-detail/excursion-detail.component').then(m => m.ExcursionDetailComponent)
      },
      {
        path: 'reservar',
        loadChildren: () => import('./features/booking/booking.routes').then(m => m.BOOKING_ROUTES)
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes').then(m => m.BLOG_ROUTES)
      },
      {
        path: 'contacto',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
      },
      // Páginas estáticas
      {
        path: 'nosotros',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];