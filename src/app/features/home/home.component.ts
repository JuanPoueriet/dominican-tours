import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcursionsService } from '../../core/services/excursions.service';
import { ExcursionCardComponent } from '../../shared/components/excursion-card/excursion-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Para usar Swiper web components o directivas
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ExcursionCardComponent, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section class="hero">
      <swiper-container loop="true" autoplay-delay="4000" pagination="true">
        <swiper-slide>
          <div class="hero-slide" style="background-image: url('assets/images/hero-saona.jpg')">
            <div class="hero-content">
              <h1>{{ 'HOME.HERO_TITLE' | translate }}</h1>
              <p>{{ 'HOME.HERO_SUBTITLE' | translate }}</p>
              <button class="btn-tropical">{{ 'HOME.CTA_BOOK' | translate }}</button>
            </div>
          </div>
        </swiper-slide>
        </swiper-container>
    </section>

    <section class="container featured">
      <h2>{{ 'HOME.FEATURED_TITLE' | translate }}</h2>
      <div class="grid">
        @for (excursion of excursions$ | async; track excursion.id) {
          <app-excursion-card [excursion]="excursion"></app-excursion-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero-slide {
      height: 80vh;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      
      &::before { // Overlay oscuro
        content: ''; position: absolute; top:0; left:0; right:0; bottom:0;
        background: rgba(0,0,0,0.4);
      }
    }
    .hero-content { position: relative; z-index: 2; color: white; }
    h1 { font-size: 3.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
    .grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 2rem; 
      padding: 4rem 0; 
    }
  `]
})
export class HomeComponent implements OnInit {
  private excursionService = inject(ExcursionsService);
  excursions$ = this.excursionService.getExcursions();

  ngOnInit() {
    // Lógica de inicialización si fuera necesaria
  }
}