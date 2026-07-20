import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCard } from './character-card';

describe('CharacterCard', () => {
  let component: CharacterCard;
  let fixture: ComponentFixture<CharacterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
