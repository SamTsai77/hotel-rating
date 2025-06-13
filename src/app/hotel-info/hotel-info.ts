import { Component , Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-hotel-info',
  imports: [CommonModule,MatExpansionModule,FormsModule,MatRadioModule],
  templateUrl: './hotel-info.html',
  styleUrl: './hotel-info.css'
})
export class HotelInfo implements OnInit{
  @Input() hotelsJsonString?: string;
  data?: any[]; // Array to hold the parsed JSON data
  keys?: string[]; // Array to hold the keys (table headers)
  hotelNameValue = '';
  hotelDescriptionValue ='';
  rateValue='';
  commentValue='';

  ngOnInit(): void {
    if (this.hotelsJsonString) {
      try {
        this.data = JSON.parse(this.hotelsJsonString); // Parse the JSON string
        if (this.data && this.data.length > 0) {
          this.keys = Object.keys(this.data[0]); // Get keys from the first object for table headers
        }

        var sumRate=0;
        if (this.data) {
          this.data.forEach(item => 
            {
              this.computeAverageRate(item)
            }
          );
        }
      } catch (e) {
        console.error("Error parsing JSON string:", e);
      }
    }
  }

computeAverageRate(item: any) {
            var sumRate=0
            var rates= item['rates'];

            for(var singleRate of rates) {
              var rateValue = singleRate['rate']
              sumRate = rateValue+sumRate;
            }
            item['averageRate']=sumRate/rates.length
            console.log("Average Rate="+item['averageRate'])
  }

  handleAddHotel() {
    console.log('Button clicked: Add Hotel');

    var newHotel ={"name":this.hotelNameValue, "description": this.hotelDescriptionValue}
    if (this.data) {
      this.data.push(newHotel);
    }
    this.hotelNameValue='';
    this.hotelDescriptionValue='';
  }

  handleAddRate(hotelName: String) {
    console.log('Button clicked: Add Rate');
    var newRate ={"rate":parseInt(this.rateValue), "comment": this.commentValue}
    //this.data[hotelName]['rates'].push(newHotel);
    if (this.data) {
      const itemB = this.data.find(item => item.name === hotelName); 
      if (itemB) {
        if (itemB['rates']==null) {
          itemB['rates']=[];
        }
        itemB['rates'].push(newRate)
        this.computeAverageRate(itemB);
      }
    }
    this.rateValue='';
    this.commentValue='';
  }

}
