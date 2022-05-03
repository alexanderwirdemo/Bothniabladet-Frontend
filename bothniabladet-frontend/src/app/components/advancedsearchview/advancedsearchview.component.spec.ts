import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedsearchviewComponent } from './advancedsearchview.component';

describe('AdvancedsearchviewComponent', () => {
  let component: AdvancedsearchviewComponent;
  let fixture: ComponentFixture<AdvancedsearchviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedsearchviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedsearchviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
