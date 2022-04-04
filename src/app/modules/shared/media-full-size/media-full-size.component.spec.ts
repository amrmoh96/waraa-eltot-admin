import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFullSizeComponent } from './media-full-size.component';

describe('MediaFullSizeComponent', () => {
  let component: MediaFullSizeComponent;
  let fixture: ComponentFixture<MediaFullSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFullSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFullSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
