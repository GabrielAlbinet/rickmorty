import {Injectable, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Episode} from '../types/episodes.type';
import {ApiResponse} from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly http = inject(HttpClient);
  private readonly episodes = signal<Episode[]>([]);
  readonly episodeSignal = this.episodes.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/episode/';

  getEpisodesFromService(page: number = 1): Observable<ApiResponse<Episode[]>> {
    return this.http
      .get<ApiResponse<Episode[]>>(this.url, {params: {page: page}})
      .pipe(tap((response: ApiResponse<Episode[]>) => this.episodes.set(response.results)));
  }

  getEpisodeFromComponent(page: number = 1): Observable<ApiResponse<Episode[]>> {
    return this.http.get<ApiResponse<Episode[]>>(this.url, {
      params: {page: page},
    });
  }
}