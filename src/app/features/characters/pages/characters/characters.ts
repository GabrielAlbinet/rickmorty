import {Component, OnInit, signal, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Character} from '../../types/character.type';
import {CharacterCard} from '../../components/character-card/character-card';
import {CharactersService} from '../../services/characters';
import {ApiResponse, InfoResponse} from '../../../../shared/types/api-response.types';
import {Pagination} from '../../components/pagination/pagination';

@Component({
  selector: 'app-characters',
  imports: [CharacterCard, Pagination, FormsModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private readonly characterService = inject(CharactersService);

  readonly characters = this.characterService.characterSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  searchTerm = signal('');
  statusFilter = signal('');
  speciesFilter = signal('');
  genderFilter = signal('');

  searchError = signal(false);

  ngOnInit() {
    this.loadCharacters();
  }

  /* Rassemble les 4 signaux de filtre dans un seul objet, prêt à être envoyé au service avec les mêmes noms de paramètres que CharactersFilters. */

  private currentFilters() {
    return {
      name: this.searchTerm(),
      status: this.statusFilter(),
      species: this.speciesFilter(),
      gender: this.genderFilter(),
    };
  }

  loadCharacters(page?: number) {
    this.currentPage.set(page ? page : 1);
    this.characterService
      .getCharacterFromComponent(this.currentPage(), this.currentFilters())
      .subscribe((response: ApiResponse<Character[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  /* Appelée au clic du bouton recherche
     On repart toujours de la page 1 (rester sur la page restante amène des erreurs si la nouvelle recherche a pas assez de pages)
     Gère aussi les erreurs */

  applyFilters() {
  this.searchError.set(false);
  this.currentPage.set(1);
  this.characterService.getCharactersFromService(1, this.currentFilters()).subscribe({
    next: (response) => {
      this.infos.set(response.info);
      this.totalPage.set(response.info.pages);
    },
    error: () => {
      this.searchError.set(true);
      this.characterService.resetCharacters();
      this.totalPage.set(0);
    },
  });
}

  /*  Vide les 4 filtres puis relance une recherche...sans filtres du coup. Oui. */

  resetFilters() {
    this.searchTerm.set('');
    this.statusFilter.set('');
    this.speciesFilter.set('');
    this.genderFilter.set('');
    this.applyFilters();
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.characterService.getCharactersFromService(page, this.currentFilters()).subscribe();
  }
}