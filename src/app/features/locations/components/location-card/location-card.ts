import {Component, input} from '@angular/core';
import {Location} from '../../types/locations.type';

@Component({
  selector: 'app-location-card',
  imports: [],
  templateUrl: './location-card.html',
  styleUrl: './location-card.css',
})
export class LocationCard {
  location = input.required<Location>();
}
