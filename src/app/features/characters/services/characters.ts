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
        params: this.buildParams(page, filters), /* Précise les filtres de recherches et la page à envoyer pour le changement de page. */
      })
      .pipe(tap((response: ApiResponse<Character[]>) => this.characters.set(response.results)));
  }

  getCharacterFromComponent(page: number = 1, filters: CharacterFilters = {}): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
      params: this.buildParams(page, filters),
    });
  }

  /* Evite de faire une requete HTTP par résident (sachant qu'il y a des planètes à 100 résidents...) */
  getCharactersByIds(ids: string): Observable<Character | Character[]> {
  return this.http.get<Character | Character[]>(`${this.url}${ids}`);
  }

  /* Permet d'envoyer la page et les filtes en tant qu'objet aux deux fonctions get au-dessus */
  private buildParams(page: number, filters: CharacterFilters) {
    const params: Record<string, string | number> = {page};
    if (filters.name) params['name'] = filters.name;
    if (filters.status) params['status'] = filters.status;
    if (filters.species) params['species'] = filters.species;
    if (filters.gender) params['gender'] = filters.gender;
    return params;
  }
}