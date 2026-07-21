import {Component, OnInit, signal, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CharactersService} from '../../features/characters/services/characters';
import {LocationsService} from '../../features/locations/services/locations';
import {EpisodesService} from '../../features/episodes/services/episodes';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly charactersService = inject(CharactersService);
  private readonly locationsService = inject(LocationsService);
  private readonly episodesService = inject(EpisodesService);

  charactersCount = signal(0);
  locationsCount = signal(0);
  episodesCount = signal(0);

  ngOnInit() {
    this.charactersService.getCharacterFromComponent().subscribe((response) => {
      this.charactersCount.set(response.info.count);
    });

    this.locationsService.getLocationFromComponent().subscribe((response) => {
      this.locationsCount.set(response.info.count);
    });

    this.episodesService.getEpisodeFromComponent().subscribe((response) => {
      this.episodesCount.set(response.info.count);
    });
  }
}