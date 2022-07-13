import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployStoreModalComponent } from './deploy-store-modal.component';

describe('DeployStoreModalComponent', () => {
  let component: DeployStoreModalComponent;
  let fixture: ComponentFixture<DeployStoreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeployStoreModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployStoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
