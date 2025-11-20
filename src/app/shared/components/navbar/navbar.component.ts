import { Component, ChangeDetectionStrategy, signal, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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

  scrolled = signal(false);
  menuOpen = signal(false);
  currentLang = signal('es');

  constructor() {
    this.currentLang.set(this.translate.currentLang || 'es');
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
    this.menuOpen.set(false);
  }

  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }
}
