import {Component, OnInit, signal, inject} from '@angular/core';
import {Location} from '../../types/locations.type';
import {LocationCard} from '../../components/location-card/location-card';
import {LocationsService} from '../../services/locations';
import {InfoResponse} from '../../../../shared/types/api-response.types';
import {Pagination} from '../../../characters/components/pagination/pagination';

@Component({
  selector: 'app-locations',
  imports: [LocationCard, Pagination],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations implements OnInit {
  private readonly locationsService = inject(LocationsService);

  readonly locations = this.locationsService.locationSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations(page?: number) {
    this.currentPage.set(page ? page : 1);
    this.locationsService.getLocationsFromService(this.currentPage()).subscribe((response) => {
      this.infos.set(response.info);
      this.totalPage.set(this.infos().pages);
    });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.locationsService.getLocationsFromService(page).subscribe();
  }
}