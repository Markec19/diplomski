import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijaFormComponent } from './rezervacija-form.component';

describe('RezervacijaComponent', () => {
  let component: RezervacijaFormComponent;
  let fixture: ComponentFixture<RezervacijaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervacijaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RezervacijaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
