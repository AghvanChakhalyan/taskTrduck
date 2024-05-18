import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsanaComponent } from './asana.component';

describe('AsanaComponent', () => {
  let component: AsanaComponent;
  let fixture: ComponentFixture<AsanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
