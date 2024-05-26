import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTabelaComponent } from './sale-tabela.component';

describe('SaleTabelaComponent', () => {
  let component: SaleTabelaComponent;
  let fixture: ComponentFixture<SaleTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleTabelaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
