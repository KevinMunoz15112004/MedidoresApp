import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaMedicionPage } from './nueva-medicion.page';

describe('NuevaMedicionPage', () => {
  let component: NuevaMedicionPage;
  let fixture: ComponentFixture<NuevaMedicionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaMedicionPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaMedicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
