import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCard } from './episode-card';

describe('EpisodeCard', () => {
  let component: EpisodeCard;
  let fixture: ComponentFixture<EpisodeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
