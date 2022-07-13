import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletStatusModalComponent } from './wallet-status-modal.component';

describe('WalletStatusModalComponent', () => {
  let component: WalletStatusModalComponent;
  let fixture: ComponentFixture<WalletStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
