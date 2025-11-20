import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Importación directa de los JSON de traducción
// (Asegúrate de tener "resolveJsonModule": true en tu tsconfig.json)
import * as es from '../assets/i18n/es.json';
import * as en from '../assets/i18n/en.json';

class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Retorna el objeto JSON importado directamente
    return of(lang === 'es' ? es : en);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    // CORRECCIÓN: Usamos ChangeDetection sin zonas para evitar el error NG0908
    provideZonelessChangeDetection(),
    
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(), // Agregado para mejor soporte de UI

    // Configuración de traducción usando el loader estático personalizado
    provideTranslateService({
      fallbackLang: 'es',
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    })
  ]
};