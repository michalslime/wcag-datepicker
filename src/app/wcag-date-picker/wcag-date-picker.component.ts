import { Component, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-wcag-date-picker',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './wcag-date-picker.component.html',
    styleUrl: './wcag-date-picker.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WcagDatePickerComponent),
            multi: true
        }
    ]
})
export class WcagDatePickerComponent implements ControlValueAccessor {
    @ViewChild('inputElement') inputElement!: ElementRef;

    selectedDate = new Date();
    currentMonth: string;
    currentYear: number;
    dates: any[] = [];
    weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];
    showCalendar = false;

    private innerValue!: Date;
    onChange: any = () => { };
    onTouched: any = () => { };

    get value(): Date {
        return this.innerValue;
    }

    set value(v: Date) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v);
        }
    }

    constructor() {
        this.currentMonth = this.selectedDate.toLocaleString('default', { month: 'long' });
        this.currentYear = this.selectedDate.getFullYear();
        this.generateCalendar();
    }

    writeValue(value: Date): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    setDisabledState?(isDisabled: boolean): void {        
    }

    generateCalendar() {
        const firstDay = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
        const lastDay = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
        this.dates = [];

        const offsetDays = this.calculateOffsetDays();

        for (let i = 0; i < offsetDays; i++) {
            this.dates.push(null);
        }

        for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
            this.dates.push(new Date(d));
        }
    }

    changeMonth(step: number) {
        this.selectedDate.setMonth(this.selectedDate.getMonth() + step);
        this.currentMonth = this.selectedDate.toLocaleString('default', { month: 'long' });
        this.currentYear = this.selectedDate.getFullYear();
        this.generateCalendar();
    }

    selectDate(date: Date) {
        this.value = date;
        this.selectedDate = new Date(date);
        this.showCalendar = false;
        setTimeout(() => this.inputElement.nativeElement.focus());
    }

    toggleCalendar() {
        this.showCalendar = !this.showCalendar;
    }

    isToday(date: Date): boolean {
        if (!date) return false;

        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }

    isSelected(date: Date): boolean {
        if (!date) return false;

        return date.getDate() === this.selectedDate.getDate() && date.getMonth() === this.selectedDate.getMonth() && date.getFullYear() === this.selectedDate.getFullYear();
    }

    getDate(date: Date): string {
        if (date) return date.getDate().toString();
        else return '';
    }

    onKeyDown(event: KeyboardEvent) {
        // Implement keyboard navigation logic (e.g., arrow keys to navigate, Enter to select)
    }

    calculateOffsetDays() {
        const date = new Date(this.selectedDate)
        date.setDate(1);

        return date.getDay() - 1;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    getLabel(date: Date): string {
        if (date) {
            return date.toISOString();
        } else {
            return '';
        }
    }

    getTabIndex(date: Date): number {
        return date ? 0 : -1;
    }
}

