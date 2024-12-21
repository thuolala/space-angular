import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenModalComponent } from './listen-modal.component';

describe('ListenModalComponent', () => {
  let component: ListenModalComponent;
  let fixture: ComponentFixture<ListenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListenModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
