import { Component, ChangeDetectionStrategy, inject, input, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  // The router will bind the ':lang' param to this input
  lang = input<string>();

  private translate = inject(TranslateService);

  constructor() {
    effect(() => {
      const currentLang = this.lang();
      if (currentLang && (currentLang === 'es' || currentLang === 'en')) {
        this.translate.use(currentLang);
      }
    });
  }
}
