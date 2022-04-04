import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersComponentComponent } from './characters-component.component';

describe('CharactersComponentComponent', () => {
  let component: CharactersComponentComponent;
  let fixture: ComponentFixture<CharactersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
