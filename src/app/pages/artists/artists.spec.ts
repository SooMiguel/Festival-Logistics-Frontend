import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsComponent  } from './artists';

describe('Artists', () => {
  let component: ArtistsComponent ;
  let fixture: ComponentFixture<ArtistsComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistsComponent );
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
