import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsanaListComponent } from './asana-list.component';

describe('AsanaListComponent', () => {
  let component: AsanaListComponent;
  let fixture: ComponentFixture<AsanaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsanaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsanaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
