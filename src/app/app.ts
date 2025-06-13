import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelInfo } from './hotel-info/hotel-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HotelInfo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'hotel-rating';
}
