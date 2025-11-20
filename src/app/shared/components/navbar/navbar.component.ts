import { Component, ChangeDetectionStrategy, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class NavbarComponent {
  private translate = inject(TranslateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  scrolled = signal(false);
  menuOpen = signal(false);
  currentLang = signal('es');

  constructor() {
    // Sync signal with translate service
    effect(() => {
       // this.currentLang.set(this.translate.currentLang || 'es');
       // Actually, better to subscribe to lang changes or route changes
    });

    // Update currentLang based on router url or translate service
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
       // Extract lang from URL
       const url = this.router.url;
       const lang = url.split('/')[1]; // /es/... -> es
       if (lang === 'es' || lang === 'en') {
         this.currentLang.set(lang);
       }
    });
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  switchLang(newLang: string) {
    if (this.currentLang() === newLang) return;

    // Construct new URL
    const url = this.router.url;
    const segments = url.split('/');
    segments[1] = newLang; // Replace 'es' or 'en' with newLang
    const newUrl = segments.join('/');

    this.router.navigateByUrl(newUrl);
    this.currentLang.set(newLang);
    this.menuOpen.set(false);
  }

  onWindowScroll() {
    this.scrolled.set(window.scrollY > 20);
  }
}
