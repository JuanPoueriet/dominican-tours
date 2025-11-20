import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Excursion } from '../../../core/models/excursion.model';

@Component({
  selector: 'app-excursion-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="excursion-card">
      <div class="image-wrapper">
        <img [src]="excursion.imageUrl" [alt]="excursion.title" loading="lazy">
        <span class="category-badge">{{ excursion.category }}</span>
      </div>
      <div class="content">
        <div class="rating">⭐ {{ excursion.rating }} ({{ excursion.reviewsCount }})</div>
        <h3>{{ excursion.title }}</h3>
        <p class="duration">🕒 {{ excursion.duration }}</p>
        <div class="footer">
          <div class="price">
            <span class="from">{{ 'COMMON.FROM' | translate }}</span>
            <span class="amount">\${{ excursion.price }}</span>
          </div>
          <a [routerLink]="['/excursiones', excursion.slug]" class="btn-tropical">
            {{ 'COMMON.VIEW_DETAILS' | translate }}
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .excursion-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease;
      &:hover { transform: translateY(-5px); }
    }
    .image-wrapper {
      position: relative;
      height: 200px;
      img { width: 100%; height: 100%; object-fit: cover; }
    }
    .content { padding: 1.5rem; }
    .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
    .price .amount { font-size: 1.5rem; font-weight: bold; color: #008080; display: block;}
  `]
})
export class ExcursionCardComponent {
  @Input({ required: true }) excursion!: Excursion;
}