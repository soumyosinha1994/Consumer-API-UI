import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerStandardSearchComponent } from './consumer-standard-search.component';

describe('ConsumerStandardSearchComponent', () => {
  let component: ConsumerStandardSearchComponent;
  let fixture: ComponentFixture<ConsumerStandardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerStandardSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerStandardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
