import {Component, input} from '@angular/core';
import {Episode} from '../../types/episodes.type';

@Component({
  selector: 'app-episode-card',
  imports: [],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.css',
})
export class EpisodeCard {
  episode = input.required<Episode>();
}