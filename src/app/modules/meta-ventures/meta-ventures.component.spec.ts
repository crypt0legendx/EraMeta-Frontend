import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaVenturesComponent } from './meta-ventures.component';

describe('MetaVenturesComponent', () => {
  let component: MetaVenturesComponent;
  let fixture: ComponentFixture<MetaVenturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaVenturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaVenturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
