import { Injectable, inject } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateTags(config: { title: string; description: string; image?: string; slug?: string }) {
    this.title.setTitle(`${config.title} | PuntaCanaTrips`);
    
    // CORRECCIÓN: Tipado explícito para evitar errores de índice
    const tags: MetaDefinition[] = [
      { name: 'description', content: config.description },
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:image', content: config.image || 'assets/images/default-share.jpg' },
      { property: 'og:url', content: `https://puntacanatrips.com/${config.slug || ''}` },
      { name: 'twitter:card', content: 'summary_large_image' }
    ];

    tags.forEach(tag => this.meta.updateTag(tag));
  }
}