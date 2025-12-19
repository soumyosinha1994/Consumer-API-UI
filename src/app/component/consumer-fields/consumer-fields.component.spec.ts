import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFieldsComponent } from './consumer-fields.component';

describe('ConsumerFieldsComponent', () => {
  let component: ConsumerFieldsComponent;
  let fixture: ComponentFixture<ConsumerFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
