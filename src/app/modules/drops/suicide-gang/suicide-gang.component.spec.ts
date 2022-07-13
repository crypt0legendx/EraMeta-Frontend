import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicideGangComponent } from './suicide-gang.component';

describe('SuicideGangComponent', () => {
  let component: SuicideGangComponent;
  let fixture: ComponentFixture<SuicideGangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuicideGangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuicideGangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
