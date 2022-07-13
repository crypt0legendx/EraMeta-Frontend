import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDeleteComponent } from './type-delete.component';

describe('TypeDeleteComponent', () => {
  let component: TypeDeleteComponent;
  let fixture: ComponentFixture<TypeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
