import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Date and Time Picker Initialized to Current DateTime';
  selectedDate: Date; // Initialized to current date
  hours: number; // Current hours in 12-hour format
  minutes: number; // Current minutes
  seconds: number; // Current seconds
  milliseconds: number; // Current milliseconds
  amPm: 'AM' | 'PM'; // Determine AM/PM based on the current time
  timestamp: number | null = null;
  errorMessage: string | null = null;

  constructor() {
    const now = new Date();

    this.selectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentHours = now.getHours();
    this.hours = currentHours > 12 ? currentHours - 12 : currentHours === 0 ? 12 : currentHours; // Convert to 12-hour format
    this.amPm = currentHours >= 12 ? 'PM' : 'AM';
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.milliseconds = now.getMilliseconds();
  }

  saveTimestamp(): void {
    // Validate inputs
    if (
      this.hours == null ||
      this.hours < 1 ||
      this.hours > 12 ||
      this.minutes == null ||
      this.minutes < 0 ||
      this.minutes > 59 ||
      this.seconds == null ||
      this.seconds < 0 ||
      this.seconds > 59 ||
      this.milliseconds == null ||
      this.milliseconds < 0 ||
      this.milliseconds > 999
    ) {
      this.errorMessage = 'Please enter valid time values.';
      return;
    }

    this.errorMessage = null; // Clear any existing error message

    let adjustedHours = this.hours;

    // Adjust hours based on AM/PM
    if (this.amPm === 'PM' && this.hours !== 12) {
      adjustedHours += 12;
    } else if (this.amPm === 'AM' && this.hours === 12) {
      adjustedHours = 0;
    }

    // Combine the selected date and time
    const combinedDateTime = new Date(this.selectedDate);
    combinedDateTime.setHours(adjustedHours);
    combinedDateTime.setMinutes(this.minutes);
    combinedDateTime.setSeconds(this.seconds);
    combinedDateTime.setMilliseconds(this.milliseconds);

    // Convert to UTC timestamp
    this.timestamp = combinedDateTime.getTime();
    console.log('Saved Timestamp (UTC):', this.timestamp);
  }
}
