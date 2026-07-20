import { Component, input } from '@angular/core';
import { Character } from '../../types/character.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-character-card',
  imports: [NgClass],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  character = input.required<Character>();
}
