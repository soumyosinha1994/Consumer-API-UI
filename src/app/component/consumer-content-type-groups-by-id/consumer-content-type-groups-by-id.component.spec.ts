import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerContentTypeGroupsByIdComponent } from './consumer-content-type-groups-by-id.component';

describe('ConsumerContentTypeGroupsByIdComponent', () => {
  let component: ConsumerContentTypeGroupsByIdComponent;
  let fixture: ComponentFixture<ConsumerContentTypeGroupsByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerContentTypeGroupsByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerContentTypeGroupsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
