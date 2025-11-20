import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BookingData {
  excursionId: string;
  date: Date;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  createBooking(booking: BookingData): Observable<boolean> {
    console.log('Processing booking:', booking);
    // Simulate API call
    return of(true);
  }
}
