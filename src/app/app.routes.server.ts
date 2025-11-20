import { RenderMode, ServerRoute } from '@angular/ssr';

// 1. Definimos los idiomas soportados
const supportedLangs = ['es', 'en'];

// 2. MOCK DATA (Extraído de tus servicios para la compilación SSG)
// Datos extraídos de ExcursionsService
const EXCURSIONS = [
  { slug: 'saona-island-paradise' },
  { slug: 'buggy-adventure' },
  { slug: 'santo-domingo-city-tour' }
];

// Datos extraídos de BlogService
const BLOG_POSTS = [
  { slug: 'best-time-to-visit-punta-cana' }
];

export const serverRoutes: ServerRoute[] = [
  // --- RUTAS ESTÁTICAS CORREGIDAS ---
  // Home (Raíz con idioma)
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },
  // Excursiones (Lista)
  {
    path: ':lang/excursions',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },
  // Booking
  {
    path: ':lang/booking',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },
  // About
  {
    path: ':lang/about',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },
  // Contact
  {
    path: ':lang/contact',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },
  // Blog (Lista)
  {
    path: ':lang/blog',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },
  // Legal
  {
    path: ':lang/legal',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => supportedLangs.map(lang => ({ lang })),
  },

  // --- RUTAS DINÁMICAS CORREGIDAS ---
  
  // Detalle de Excursiones (:lang/excursions/:slug)
  {
    path: ':lang/excursions/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const params: { lang: string; slug: string }[] = [];
      for (const lang of supportedLangs) {
        for (const item of EXCURSIONS) {
          params.push({ lang, slug: item.slug });
        }
      }
      return params;
    },
  },

  // Detalle de Blog (:lang/blog/:slug)
  // Nota: Asegúrate de que tu router tenga configurada esta ruta hija
  {
    path: ':lang/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const params: { lang: string; slug: string }[] = [];
      for (const lang of supportedLangs) {
        for (const post of BLOG_POSTS) {
          params.push({ lang, slug: post.slug });
        }
      }
      return params;
    },
  },

  // --- FALLBACK CORREGIDO ---
  // Cualquier ruta no capturada arriba será manejada por el servidor (SSR)
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];