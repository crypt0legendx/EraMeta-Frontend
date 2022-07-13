import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassUploaderComponent } from './mass-uploader.component';

describe('MassUploaderComponent', () => {
  let component: MassUploaderComponent;
  let fixture: ComponentFixture<MassUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
