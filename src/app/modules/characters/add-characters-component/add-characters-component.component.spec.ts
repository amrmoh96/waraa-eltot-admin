import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharactersComponentComponent } from './add-characters-component.component';

describe('AddCharactersComponentComponent', () => {
  let component: AddCharactersComponentComponent;
  let fixture: ComponentFixture<AddCharactersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCharactersComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharactersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
