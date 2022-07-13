import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAOComponent } from './dao.component';

describe('DAOComponent', () => {
  let component: DAOComponent;
  let fixture: ComponentFixture<DAOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DAOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DAOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
