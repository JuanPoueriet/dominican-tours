import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Excursion } from '../models/excursion.model';

@Injectable({ providedIn: 'root' })
export class ExcursionsService {
  // Mock Data - En producción conectarías a tu API
  private excursions: Excursion[] = [
    {
      id: '1',
      slug: 'isla-saona-vip',
      title: 'Isla Saona VIP Experience',
      price: 85,
      currency: 'USD',
      duration: 'Full Day',
      rating: 4.9,
      reviewsCount: 320,
      imageUrl: 'assets/images/saona.jpg',
      gallery: ['assets/images/saona1.jpg', 'assets/images/saona2.jpg'],
      description: 'Navega en catamarán y lancha rápida hacia el paraíso.',
      highlights: ['Almuerzo Buffet', 'Barra Libre', 'Piscina Natural'],
      category: 'Relax'
    },
    {
      id: '2',
      slug: 'buggies-macao',
      title: 'Buggies Macao Off-Road',
      price: 55,
      currency: 'USD',
      duration: '4 Hours',
      rating: 4.7,
      reviewsCount: 150,
      imageUrl: 'assets/images/buggy.jpg',
      gallery: [],
      description: 'Adrenalina pura recorriendo caminos de tierra y playa Macao.',
      highlights: ['Transporte incluido', 'Guía experto', 'Cueva Taina'],
      category: 'Adventure'
    }
  ];

  getExcursions(): Observable<Excursion[]> {
    return of(this.excursions);
  }

  getExcursionBySlug(slug: string): Observable<Excursion | undefined> {
    return of(this.excursions.find(e => e.slug === slug));
  }
}