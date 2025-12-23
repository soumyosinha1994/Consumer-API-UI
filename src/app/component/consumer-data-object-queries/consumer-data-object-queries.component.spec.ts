import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDataObjectQueriesComponent } from './consumer-data-object-queries.component';

describe('ConsumerDataObjectQueriesComponent', () => {
  let component: ConsumerDataObjectQueriesComponent;
  let fixture: ComponentFixture<ConsumerDataObjectQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerDataObjectQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerDataObjectQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
