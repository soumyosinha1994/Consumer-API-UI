import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerContentTypeGroupsComponent } from './consumer-content-type-groups.component';

describe('ConsumerContentTypeGroupsComponent', () => {
  let component: ConsumerContentTypeGroupsComponent;
  let fixture: ComponentFixture<ConsumerContentTypeGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerContentTypeGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerContentTypeGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
