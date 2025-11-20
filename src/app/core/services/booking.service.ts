import { Injectable, computed, signal } from '@angular/core';
import { Excursion } from '../models/excursion.model';

export interface BookingState {
  step: number;
  excursion: Excursion | null;
  date: Date | null;
  pax: number;
  extras: any[]; // Puedes tipar esto mejor
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  // Usamos Signals para gestión de estado reactiva y moderna
  private state = signal<BookingState>({
    step: 1,
    excursion: null,
    date: null,
    pax: 2,
    extras: []
  });

  // Selectores
  readonly bookingSummary = computed(() => this.state());
  readonly totalPrice = computed(() => {
    const s = this.state();
    if (!s.excursion) return 0;
    return s.excursion.price * s.pax;
  });

  startBooking(excursion: Excursion) {
    this.state.update(s => ({ ...s, excursion, step: 1 }));
  }

  updateBooking(data: Partial<BookingState>) {
    this.state.update(s => ({ ...s, ...data }));
  }

  completeBooking() {
    // Aquí llamarías a tu API Backend
    console.log('Enviando reserva:', this.state());
    // Resetear o redirigir
  }
}