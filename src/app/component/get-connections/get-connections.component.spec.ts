import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConnectionsComponent } from './get-connections.component';

describe('GetConnectionsComponent', () => {
  let component: GetConnectionsComponent;
  let fixture: ComponentFixture<GetConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetConnectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
