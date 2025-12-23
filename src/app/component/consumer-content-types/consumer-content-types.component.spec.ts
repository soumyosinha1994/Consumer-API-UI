import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerContentTypesComponent } from './consumer-content-types.component';

describe('ConsumerContentTypesComponent', () => {
  let component: ConsumerContentTypesComponent;
  let fixture: ComponentFixture<ConsumerContentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerContentTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerContentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
