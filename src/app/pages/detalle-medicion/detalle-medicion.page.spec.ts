import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMedicionPage } from './detalle-medicion.page';

describe('DetalleMedicionPage', () => {
  let component: DetalleMedicionPage;
  let fixture: ComponentFixture<DetalleMedicionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMedicionPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMedicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
