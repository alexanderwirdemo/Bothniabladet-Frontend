import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagedetailComponent } from './imagedetail.component';

describe('ImagedetailComponent', () => {
  let component: ImagedetailComponent;
  let fixture: ComponentFixture<ImagedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
