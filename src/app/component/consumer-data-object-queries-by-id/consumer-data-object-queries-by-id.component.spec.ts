import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDataObjectQueriesByIdComponent } from './consumer-data-object-queries-by-id.component';

describe('ConsumerDataObjectQueriesByIdComponent', () => {
  let component: ConsumerDataObjectQueriesByIdComponent;
  let fixture: ComponentFixture<ConsumerDataObjectQueriesByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerDataObjectQueriesByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerDataObjectQueriesByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
