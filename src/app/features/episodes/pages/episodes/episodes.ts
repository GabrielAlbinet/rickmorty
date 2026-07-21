import {Component, OnInit, signal, inject} from '@angular/core';
import {Episode} from '../../types/episodes.type';
import {EpisodeCard} from '../../components/episode-card/episode-card';
import {EpisodesService} from '../../services/episodes';
import {InfoResponse} from '../../../../shared/types/api-response.types';
import {Pagination} from '../../../characters/components/pagination/pagination';

@Component({
  selector: 'app-episodes',
  imports: [EpisodeCard, Pagination],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css',
})
export class Episodes implements OnInit {
  private readonly episodesService = inject(EpisodesService);

  readonly episodes = this.episodesService.episodeSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes(page?: number) {
    this.currentPage.set(page ? page : 1);
    this.episodesService.getEpisodesFromService(this.currentPage()).subscribe((response) => {
      this.infos.set(response.info);
      this.totalPage.set(this.infos().pages);
    });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.episodesService.getEpisodesFromService(page).subscribe();
  }
}