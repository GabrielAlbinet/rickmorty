import {Component, input, signal, inject} from '@angular/core';
import {Location} from '../../types/locations.type';
import {CharactersService} from '../../../characters/services/characters';
import {Character} from '../../../characters/types/character.type';

@Component({
  selector: 'app-location-card',
  imports: [],
  templateUrl: './location-card.html',
  styleUrl: './location-card.css',
})

/* Partie dédiée à la liste d'habitants */

export class LocationCard {
  private readonly charactersService = inject(CharactersService);

  location = input.required<Location>();
  isExpanded = signal(false);
  isLoadingResidents = signal(false); /* Plus haut c'est là (voir plus bas) */
  residentsNames = signal<string[]>([]);

  toggleResidents() {
    this.isExpanded.set(!this.isExpanded());

    /* On ne charge les noms qu'une seule fois, la première fois qu'on ouvre, et on les récupère au clic, pour ne pas charger tous les habitants
       Triple condition : carte ouverte ET noms pas encore chargés ET il y a bien des habitants à afficher */
    if (this.isExpanded() && this.residentsNames().length === 0 && this.location().residents.length > 0) {
      this.loadResidents();
    }
  }

  private loadResidents() {
    const ids = this.location()
      .residents.map((url) => url.split('/').pop())   
      .join(',');  /* recolle tous les ids avec des virgules : "38,45,71" */

    this.isLoadingResidents.set(true);   /* affiche "Chargement..." pendant la requête (voir plus haut, là on est à plus bas) */
    /* Appelle la fonction qui permet de tout mettre en 1 URL */
    this.charactersService.getCharactersByIds(ids).subscribe((data) => {
      const list = Array.isArray(data) ? data : [data]; /* Si un seul habitant, l'API renvoie un objet et non un tableau (ce qui servirait à rien) */
      this.residentsNames.set(list.map((character: Character) => character.name));
      this.isLoadingResidents.set(false);   /* Vu qu'il y a la réponse, on vire "Chargement..." */
    });
  }
}