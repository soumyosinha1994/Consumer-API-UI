import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerSystemIntegrationsComponent } from './consumer-system-integrations.component';

describe('ConsumerSystemIntegrationsComponent', () => {
  let component: ConsumerSystemIntegrationsComponent;
  let fixture: ComponentFixture<ConsumerSystemIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerSystemIntegrationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumerSystemIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
