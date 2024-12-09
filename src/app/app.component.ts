import { Component } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { DateTimeComponent } from './components/date-time/date-time.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [DateTimeComponent, MaterialModule],
})
export class AppComponent {
  title = 'Material Shared Component Example';
  timestamp: number | null = null;

  onTimestampChange(newTimestamp: number): void {
    this.timestamp = newTimestamp;
    console.log('Timestamp received from DateTimeComponent:', this.timestamp);
  }
}
