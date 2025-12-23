import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerExecuteDataObjectQueriesComponent } from './consumer-execute-data-object-queries.component';

describe('ConsumerExecuteDataObjectQueriesComponent', () => {
  let component: ConsumerExecuteDataObjectQueriesComponent;
  let fixture: ComponentFixture<ConsumerExecuteDataObjectQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerExecuteDataObjectQueriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerExecuteDataObjectQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
