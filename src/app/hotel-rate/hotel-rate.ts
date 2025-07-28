import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-hotel-rate',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, FormsModule, MatRadioModule],
  templateUrl: './hotel-rate.html',
  styleUrl: './hotel-rate.css'
})
export class HotelRate implements OnInit {
  @Input() item?: any;
  rateValue = '';
  commentValue = '';

  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit(): void {
    // Initialize rates array if not present
    if (this.item && !Array.isArray(this.item['rates'])) {
      this.item['rates'] = [];
    }
    // Compute average rate if rates exist
    if (this.item && Array.isArray(this.item['rates']) && this.item['rates'].length > 0) {
      this.computeAverageRate(this.item);
    }
  }

  handleAddRate(hotelName: string) {
    console.log('Button clicked: Add Rate');
    const rateNum = parseInt(this.rateValue, 10);
    if (isNaN(rateNum) || rateNum < 1 || rateNum > 5) {
      this.messageEvent.emit('Please enter a valid rate between 1 and 5.');
      return;
    }
    const newRate = { rate: rateNum, comment: this.commentValue };

    if (this.item) {
      if (!Array.isArray(this.item['rates'])) {
        this.item['rates'] = [];
      }
      this.item['rates'].push(newRate);
      this.computeAverageRate(this.item);
      this.messageEvent.emit('Rate added successfully!');
    }

    this.rateValue = '';
    this.commentValue = '';
    
  }

  computeAverageRate(item: any) {
    const rates = item['rates'];
    if (!Array.isArray(rates) || rates.length === 0) {
      item['averageRate'] = 0;
      return;
    }
    const sumRate = rates.reduce((sum: number, singleRate: any) => sum + (singleRate['rate'] || 0), 0);
    item['averageRate'] = sumRate / rates.length;
    console.log('Average Rate=' + item['averageRate']);
  }
}
