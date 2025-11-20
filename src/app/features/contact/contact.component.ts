import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact', // Selector corregido (era app-contact.component)
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'] // Corregido plural 'styleUrls'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = false;
  successMessage = '';

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      // Simulación de envío
      setTimeout(() => {
        this.isSubmitting = false;
        this.successMessage = '¡Gracias! Hemos recibido tu mensaje.';
        this.contactForm.reset();
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}