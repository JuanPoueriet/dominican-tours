export interface Excursion {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: 'USD' | 'DOP';
  duration: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  gallery: string[];
  description: string;
  highlights: string[];
  category: 'Adventure' | 'Relax' | 'Family' | 'Nightlife';
}