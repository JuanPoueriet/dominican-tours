export interface Excursion {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  galleryImages: string[];
  highlights: string[];
  includes: string[];
  notIncludes: string[];
  category: 'adventure' | 'family' | 'relaxation' | 'culture';
  isFeatured: boolean;
}
