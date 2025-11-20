import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ExcursionsService } from '../../../core/services/excursions.service';
import { Excursion } from '../../../core/models/excursion.model';
import { ExcursionCardComponent } from '../../../shared/components/excursion-card/excursion-card.component';

@Component({
  selector: 'app-excursion-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ExcursionCardComponent],
  templateUrl: './excursion-list.component.html',
  styleUrl: './excursion-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcursionListComponent implements OnInit {
  private excursionService = inject(ExcursionsService);

  // State
  excursions = signal<Excursion[]>([]);
  selectedCategory = signal<string>('all');

  // Computed
  filteredExcursions = computed(() => {
    const category = this.selectedCategory();
    const list = this.excursions();
    if (category === 'all') return list;
    return list.filter(e => e.category === category);
  });

  ngOnInit() {
    this.excursionService.getExcursions().subscribe(data => {
      this.excursions.set(data);
    });
  }

  filterCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory.set(target.value);
  }
}
