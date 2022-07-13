import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaulChenardComponent } from './paul-chenard.component';

describe('PaulChenardComponent', () => {
  let component: PaulChenardComponent;
  let fixture: ComponentFixture<PaulChenardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaulChenardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaulChenardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
