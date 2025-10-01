import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesContainerComponent } from './pictures-container.component';

describe('PicturesContainerComponent', () => {
  let component: PicturesContainerComponent;
  let fixture: ComponentFixture<PicturesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicturesContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicturesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
