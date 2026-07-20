import { Component, OnInit, signal, inject } from '@angular/core';
import { Character } from '../../types/character.type';
import { CharacterCard } from '../../components/character-card/character-card';
import { CharactersService } from '../../services/characters';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-characters',
  imports: [CharacterCard, Pagination],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private readonly characterService = inject(CharactersService);
  readonly characters = this.characterService.characterSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.characterService.getCharactersFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadCharacters();
  }

  loadCharacters(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.characterService
      .getCharacterFromComponent()
      .subscribe((response: ApiResponse<Character[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.characterService.getCharactersFromService(page).subscribe();
  }
}
