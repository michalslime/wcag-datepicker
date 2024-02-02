import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WcagDatePickerComponent } from './wcag-date-picker/wcag-date-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WcagDatePickerComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-date-picker';

  selectedDate: Date = new Date();
  dateControl = new FormControl(new Date()); // Initialize the form control with a date
}
