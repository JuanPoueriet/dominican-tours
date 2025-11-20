import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookingService, BookingData } from '../../core/services/booking.service';
import { ExcursionsService } from '../../core/services/excursions.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private excursionService = inject(ExcursionsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentStep = signal(1);
  bookingForm: FormGroup;
  excursions$ = this.excursionService.getExcursions();

  constructor() {
    this.bookingForm = this.fb.group({
      excursionId: ['', Validators.required],
      date: ['', Validators.required],
      adults: [2, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.min(0)]],
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Pre-select excursion if ID is in query params
    this.route.queryParams.subscribe(params => {
      if (params['excursionId']) {
        this.bookingForm.patchValue({ excursionId: params['excursionId'] });
      }
    });
  }

  nextStep() {
    if (this.isStepValid()) {
      this.currentStep.update(s => s + 1);
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  prevStep() {
    this.currentStep.update(s => Math.max(1, s - 1));
  }

  isStepValid(): boolean {
    const step = this.currentStep();
    if (step === 1) {
      return !!(
        this.bookingForm.get('excursionId')?.valid &&
        this.bookingForm.get('date')?.valid &&
        this.bookingForm.get('adults')?.valid
      );
    }
    if (step === 2) {
      return !!(
        this.bookingForm.get('customerName')?.valid &&
        this.bookingForm.get('customerEmail')?.valid &&
        this.bookingForm.get('customerPhone')?.valid
      );
    }
    return true;
  }

  getExcursionName(id: string): string {
    // Ideally fetch from list or store. For this demo we assume we can't easily sync finding it
    // inside the template without async pipe or signals map, but let's just return ID for now
    // or implement a signal based lookup if needed.
    // A better way is to have a signal for the selected excursion.
    return id; // Placeholder. In real app, bind selected excursion object.
  }

  calculateTotal(): number {
    // Mock calculation
    const adults = this.bookingForm.get('adults')?.value || 0;
    const children = this.bookingForm.get('children')?.value || 0;
    // Assuming fixed price for demo since we don't have the excursion object synchronously easily available here without more logic
    return (adults * 80) + (children * 40);
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      const bookingData: BookingData = {
        ...this.bookingForm.value,
        totalPrice: this.calculateTotal()
      };

      this.bookingService.createBooking(bookingData).subscribe(success => {
        if (success) {
          alert('Reserva confirmada! (Demo)');
          this.router.navigate(['/']);
        }
      });
    }
  }
}
