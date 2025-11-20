import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-padding">
      <h1>Sobre Nosotros</h1>
      <p>Somos expertos en crear experiencias inolvidables en Punta Cana.</p>
      
      <div class="grid">
        <div class="card">
          <h3>Nuestra Misión</h3>
          <p>Ofrecer las mejores excursiones con seguridad y diversión garantizada.</p>
        </div>
        <div class="card">
          <h3>El Equipo</h3>
          <p>Guías locales certificados apasionados por nuestra cultura.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-padding { padding-top: 4rem; padding-bottom: 4rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
    .card { padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
  `]
})
export class AboutComponent {}