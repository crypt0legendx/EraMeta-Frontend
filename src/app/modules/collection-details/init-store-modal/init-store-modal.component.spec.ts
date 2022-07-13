import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitStoreModalComponent } from './init-store-modal.component';

describe('InitStoreModalComponent', () => {
  let component: InitStoreModalComponent;
  let fixture: ComponentFixture<InitStoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitStoreModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitStoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
