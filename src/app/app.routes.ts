import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Redirección de la raíz vacía (midominio.com) al idioma por defecto
  {
    path: '',
    redirectTo: 'es',
    pathMatch: 'full'
  },
  // 2. Envoltura de rutas con el parámetro :lang
  {
    path: ':lang',
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
      // 3. AGREGAR LA RUTA LEGAL FALTANTE (Causa del error "*/legal")
      // Si aún no tienes el componente, crea uno temporal o elimina esta entrada de app.routes.server.ts
      {
        path: 'legal',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) // Placeholder temporal si no tienes LegalComponent
      }
    ]
  },
  // 4. Fallback para cualquier otra URL
  {
    path: '**',
    redirectTo: 'es'
  }
];