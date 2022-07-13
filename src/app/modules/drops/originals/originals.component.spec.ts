import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalsComponent } from './originals.component';

describe('OriginalsComponent', () => {
  let component: OriginalsComponent;
  let fixture: ComponentFixture<OriginalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
