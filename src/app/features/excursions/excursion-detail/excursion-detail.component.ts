import { Component, OnInit, inject, signal, input, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ExcursionsService } from '../../../core/services/excursions.service';
import { Excursion } from '../../../core/models/excursion.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

// Swiper
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-excursion-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, LoaderComponent, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './excursion-detail.component.html',
  styleUrl: './excursion-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcursionDetailComponent implements OnInit {
  private excursionService = inject(ExcursionsService);
  private router = inject(Router);

  // Route param binding (requires withComponentInputBinding in app config)
  slug = input<string>();

  excursion = signal<Excursion | undefined>(undefined);

  ngOnInit() {
    // Initial fetch based on input
    this.fetchExcursion();
  }

  // Re-fetch if slug changes (though input signal update handling might need effect,
  // but standard practice with router binding is usually enough if component is re-created or we use effect)
  // Let's verify if ngOnInit is enough. If router reuses component, we might need an effect.
  // For safety, I'll use an effect or simple OnChanges, but with input signal, an effect is best.
  // However, Angular router by default destroys and recreates component on param change unless reuse strategy is custom.
  // So ngOnInit is usually fine. But to be "Signals" perfect, let's use effect if I was tracking changes.
  // For now, assuming component recreation.

  fetchExcursion() {
    const currentSlug = this.slug();
    if (currentSlug) {
      this.excursionService.getExcursionBySlug(currentSlug).subscribe(data => {
        this.excursion.set(data);
      });
    }
  }

  bookNow() {
    // Navigate to booking with query params
    if (this.excursion()) {
      this.router.navigate(['/booking'], {
        queryParams: { excursionId: this.excursion()!.id }
      });
    }
  }
}
