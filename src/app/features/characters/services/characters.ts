import {Injectable, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Character} from '../types/character.type';
import {ApiResponse} from '../../../shared/types/api-response.types';

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  private characters = signal<Character[]>([]);
  readonly characterSignal = this.characters.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/character/';

  getCharactersFromService(page: number = 1, filters: CharacterFilters = {}): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
        params: this.buildParams(page, filters),
      })
      .pipe(tap((response: ApiResponse<Character[]>) => this.characters.set(response.results)));
  }

  getCharacterFromComponent(page: number = 1, filters: CharacterFilters = {}): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
      params: this.buildParams(page, filters),
    });
  }

  private buildParams(page: number, filters: CharacterFilters) {
    const params: Record<string, string | number> = {page};
    if (filters.name) params['name'] = filters.name;
    if (filters.status) params['status'] = filters.status;
    if (filters.species) params['species'] = filters.species;
    if (filters.gender) params['gender'] = filters.gender;
    return params;
  }
}