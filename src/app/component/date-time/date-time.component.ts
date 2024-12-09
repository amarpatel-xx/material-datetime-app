import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

@Component({
  standalone: true,
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
  imports: [MaterialModule, FormsModule],
})
export class DateTimeComponent {
  selectedDate: Date = new Date(); // Initialize to current date
  hours: number = this.selectedDate.getHours() % 12 || 12; // Convert to 12-hour format
  minutes: number = this.selectedDate.getMinutes(); // Current minutes
  amPm: 'AM' | 'PM' = this.selectedDate.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
  seconds: number = this.selectedDate.getSeconds(); // Hidden field with default value
  milliseconds: number = this.selectedDate.getMilliseconds(); // Hidden field with default value

  @Output() timestampChange = new EventEmitter<number>(); // Emit the UTC timestamp

  saveTimestamp(): void {
    // Adjust hours based on AM/PM
    let adjustedHours = this.hours;
    if (this.amPm === 'PM' && this.hours !== 12) {
      adjustedHours += 12;
    } else if (this.amPm === 'AM' && this.hours === 12) {
      adjustedHours = 0;
    }

    // Combine the date and time
    const combinedDateTime = new Date(this.selectedDate);
    combinedDateTime.setHours(adjustedHours);
    combinedDateTime.setMinutes(this.minutes);
    combinedDateTime.setSeconds(this.seconds);
    combinedDateTime.setMilliseconds(this.milliseconds);

    // Emit the UTC timestamp
    const timestamp = combinedDateTime.getTime();
    this.timestampChange.emit(timestamp);
  }

   // Emit timestamp whenever fields are updated
   updateTimestamp(): void {
    // Reset seconds and milliseconds when the fields are changed
    this.seconds = 0;
    this.milliseconds = 0;

    let adjustedHours = this.hours;
    if (this.amPm === 'PM' && this.hours !== 12) {
      adjustedHours += 12;
    } else if (this.amPm === 'AM' && this.hours === 12) {
      adjustedHours = 0;
    }

    // Combine the date and time
    const combinedDateTime = new Date(this.selectedDate);
    combinedDateTime.setHours(adjustedHours);
    combinedDateTime.setMinutes(this.minutes);
    combinedDateTime.setSeconds(this.seconds);
    combinedDateTime.setMilliseconds(this.milliseconds);

    // Emit the UTC timestamp
    const timestamp = combinedDateTime.getTime();
    this.timestampChange.emit(timestamp);
  }

  onDateChange(): void {
    this.updateTimestamp(); // Reset seconds and milliseconds and emit the timestamp
  }

  onTimeChange(): void {
    this.updateTimestamp(); // Reset seconds and milliseconds and emit the timestamp
  }
}
