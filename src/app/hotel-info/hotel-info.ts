import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HotelRate } from '../hotel-rate/hotel-rate';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hotel-info',
  imports: [CommonModule,MatExpansionModule,FormsModule,MatRadioModule,HotelRate],
  templateUrl: './hotel-info.html',
  styleUrl: './hotel-info.css'
})
export class HotelInfo implements OnInit{
  @Input() hotelsJsonString?: string;
  @Output() hotelChange = new EventEmitter<Event>();
  data?: any[]; // Array to hold the parsed JSON data
  keys?: string[]; // Array to hold the keys (table headers)
  hotelNameValue = '';
  hotelDescriptionValue ='';

  ngOnInit(): void {
    if (this.hotelsJsonString) {
      try {
        this.data = JSON.parse(this.hotelsJsonString); // Parse the JSON string
        if (this.data && this.data.length > 0) {
          this.keys = Object.keys(this.data[0]); // Get keys from the first object for table headers
        }
      } catch (e) {
        console.error("Error parsing JSON string:", e);
      }
    }
  }
  handleAddHotel() {
    console.log('Button clicked: Add Hotel');

    var newHotel ={"name":this.hotelNameValue, "description": this.hotelDescriptionValue}
    if (this.data) {
      this.data.push(newHotel);
    }
    this.hotelNameValue='';
    this.hotelDescriptionValue='';
    this.hotelChange.emit(undefined);
  }


// Add this method to your HotelInfo component class
commentAdded(event: any) {
  // Handle the event here, for example:
  console.log('Received message from child:', event);
  Swal.fire({
  position: 'top-end',
  text: 'Added Comment ',
  icon: 'info',
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false
});
}

}
