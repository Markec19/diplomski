import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeListaComponent } from './rezervacije-lista.component';

describe('RezervacijeListaComponent', () => {
  let component: RezervacijeListaComponent;
  let fixture: ComponentFixture<RezervacijeListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervacijeListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RezervacijeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
