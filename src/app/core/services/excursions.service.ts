import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Excursion } from '../models/excursion.model';

@Injectable({
  providedIn: 'root'
})
export class ExcursionsService {
  private excursions: Excursion[] = [
    {
      id: '1',
      slug: 'saona-island-paradise',
      title: 'Isla Saona Paradise',
      shortDescription: 'Navega en catamarán y disfruta de las playas vírgenes de Saona.',
      fullDescription: 'Una experiencia inolvidable navegando por el Mar Caribe hacia la paradisíaca Isla Saona. Disfruta de barra libre, música, almuerzo buffet en la playa y tiempo libre para relajarte en sus aguas cristalinas.',
      price: 85,
      duration: '8 Horas',
      rating: 4.8,
      reviewsCount: 124,
      imageUrl: 'assets/images/saona.jpg',
      galleryImages: ['assets/images/saona-1.jpg', 'assets/images/saona-2.jpg'],
      highlights: ['Paseo en Catamarán', 'Piscina Natural', 'Almuerzo Buffet', 'Barra Libre'],
      includes: ['Transporte', 'Almuerzo', 'Bebidas', 'Guía'],
      notIncludes: ['Fotos', 'Souvenirs'],
      category: 'relaxation',
      isFeatured: true
    },
    {
      id: '2',
      slug: 'buggy-adventure',
      title: 'Buggy Adventure Macao',
      shortDescription: 'Adrenalina pura conduciendo buggies por senderos tropicales.',
      fullDescription: 'Conduce tu propio buggy a través de senderos de tierra, visita una cueva indígena, conoce cómo se produce el café y cacao local, y termina con un chapuzón en la playa Macao.',
      price: 60,
      duration: '4 Horas',
      rating: 4.6,
      reviewsCount: 89,
      imageUrl: 'assets/images/buggy.webp',
      galleryImages: [],
      highlights: ['Conducción Off-road', 'Playa Macao', 'Cueva Taina', 'Degustación'],
      includes: ['Transporte', 'Casco', 'Guía'],
      notIncludes: ['Bandanas', 'Gafas'],
      category: 'adventure',
      isFeatured: true
    },
    {
      id: '3',
      slug: 'santo-domingo-city-tour',
      title: 'Santo Domingo City Tour',
      shortDescription: 'Descubre la historia de la primera ciudad de América.',
      fullDescription: 'Visita la Zona Colonial, el Alcázar de Colón, la Catedral Primada de América y los Tres Ojos. Un viaje cultural imprescindible.',
      price: 95,
      duration: '10 Horas',
      rating: 4.7,
      reviewsCount: 210,
      imageUrl: 'assets/images/santo-domingo.jpg',
      galleryImages: [],
      highlights: ['Zona Colonial', 'Catedral', 'Los Tres Ojos', 'Almuerzo Típico'],
      includes: ['Transporte', 'Entradas', 'Almuerzo', 'Guía Histórico'],
      notIncludes: ['Propinas'],
      category: 'culture',
      isFeatured: false
    }
  ];

  getExcursions(): Observable<Excursion[]> {
    return of(this.excursions);
  }

  getFeaturedExcursions(): Observable<Excursion[]> {
    return of(this.excursions.filter(e => e.isFeatured));
  }

  getExcursionBySlug(slug: string): Observable<Excursion | undefined> {
    return of(this.excursions.find(e => e.slug === slug));
  }
}
